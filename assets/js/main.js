/* =========================================================
   OctoBrain — main.js
   ========================================================= */
(function () {
  'use strict';

  var EMAIL = 'kyh@octo-brain.com';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var supportsIO = 'IntersectionObserver' in window;

  /* ===== 1. HEADER SCROLL STATE ===== */
  (function header() {
    var el = document.getElementById('siteHeader');
    if (!el) return;

    function sync() {
      el.classList.toggle('scrolled', window.scrollY > 10);
    }
    window.addEventListener('scroll', sync, { passive: true });
    sync();
  })();

  /* ===== 2. MOBILE MENU ===== */
  (function mobileMenu() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('mobileMenu');
    var close = document.getElementById('menuClose');
    if (!toggle || !menu) return;

    function setOpen(open) {
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
      document.body.style.overflow = open ? 'hidden' : '';
      if (open && close) {
        close.focus({ preventScroll: true });
      } else if (!open) {
        toggle.focus({ preventScroll: true });
      }
    }

    toggle.addEventListener('click', function () {
      setOpen(!menu.classList.contains('open'));
    });

    if (close) {
      close.addEventListener('click', function () {
        setOpen(false);
      });
    }

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) setOpen(false);
    });
  })();

  /* ===== 3. SCROLL SPY ===== */
  (function scrollSpy() {
    var ids = ['services', 'games', 'projects', 'downloads', 'about', 'contact'];
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
    if (!links.length || !supportsIO) return;

    function setActive(id) {
      links.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    ids.forEach(function (id) {
      var section = document.getElementById(id);
      if (section) io.observe(section);
    });
  })();

  /* ===== 4. REVEAL ON SCROLL ===== */
  (function reveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!els.length) return;

    if (reduceMotion.matches || !supportsIO) {
      // CSS keeps .reveal visible when it is never transitioned; make it explicit.
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }

    els.forEach(function (el) {
      var siblings = Array.prototype.filter.call(el.parentElement.children, function (child) {
        return child.classList.contains('reveal');
      });
      var index = siblings.indexOf(el);
      if (index > 0) el.style.transitionDelay = (index * 70) + 'ms';
    });

    var io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    els.forEach(function (el) { io.observe(el); });
  })();

  /* ===== 5. HERO VIDEO ===== */
  (function heroVideo() {
    var video = document.getElementById('heroVideo');
    var hero = document.getElementById('top');
    if (!video) return;

    var wide = window.matchMedia('(min-width:769px)').matches;
    if (!wide || reduceMotion.matches) return; // poster / CSS background stays

    function play() {
      var p = video.play();
      if (p && typeof p.catch === 'function') p.catch(function () {});
    }

    var endedFlag = false;

    video.addEventListener('error', function () {
      if (video.parentNode) video.parentNode.removeChild(video);
    });

    // Splash intro: play once, fade in, then hold on the final (logo) frame.
    video.addEventListener('ended', function () { endedFlag = true; });
    video.addEventListener('playing', function () { video.classList.add('playing'); });

    video.src = video.dataset.src;
    play();

    if (supportsIO && hero) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (endedFlag) return;
          if (entry.intersectionRatio < 0.15) {
            video.pause();
          } else {
            play();
          }
        });
      }, { threshold: [0, 0.15, 0.3] });
      io.observe(hero);
    }
  })();

  /* ===== 6. COPY EMAIL ===== */
  (function copyEmail() {
    var btn = document.getElementById('copyEmail');
    if (!btn) return;

    var original = btn.textContent;
    var timer = null;

    function done() {
      btn.textContent = '복사됨 ✓';
      window.clearTimeout(timer);
      timer = window.setTimeout(function () { btn.textContent = original; }, 1800);
    }

    function fallback(text) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '-1000px';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      return ok;
    }

    btn.addEventListener('click', function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL).then(done, function () {
          if (fallback(EMAIL)) done();
        });
      } else if (fallback(EMAIL)) {
        done();
      }
    });
  })();

  /* ===== 7. INQUIRY FORM ===== */
  (function inquiryForm() {
    var form = document.getElementById('inquiryForm');
    if (!form) return;

    var EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    function clearErrors() {
      form.querySelectorAll('.field-error').forEach(function (field) {
        field.classList.remove('field-error');
      });
      form.querySelectorAll('.field-msg').forEach(function (msg) {
        msg.parentNode.removeChild(msg);
      });
    }

    function fail(input, message) {
      var field = input.closest('.field');
      if (!field) return;
      field.classList.add('field-error');
      var msg = document.createElement('p');
      msg.className = 'field-msg';
      msg.textContent = message;
      field.appendChild(msg);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      var nameEl = document.getElementById('fName');
      var companyEl = document.getElementById('fCompany');
      var emailEl = document.getElementById('fEmail');
      var descEl = document.getElementById('fDesc');

      var name = nameEl.value.trim();
      var company = companyEl.value.trim();
      var email = emailEl.value.trim();
      var desc = descEl.value.trim();

      var invalid = [];
      if (!name) { fail(nameEl, '이름을 입력해주세요.'); invalid.push(nameEl); }
      if (!EMAIL_RE.test(email)) { fail(emailEl, '올바른 이메일 주소를 입력해주세요.'); invalid.push(emailEl); }
      if (!desc) { fail(descEl, '프로젝트 설명을 입력해주세요.'); invalid.push(descEl); }

      if (invalid.length) {
        invalid[0].focus();
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var note = form.querySelector('.form-note');
      var honey = document.getElementById('fHoney');
      var subject = '[외주 문의] ' + name + (company ? ' — ' + company : '');
      var prevLabel = btn ? btn.innerHTML : '';

      if (btn) {
        btn.disabled = true;
        btn.textContent = '전송 중…';
      }

      fetch('https://formsubmit.co/ajax/' + EMAIL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          '이름': name,
          '회사명': company || '-',
          '이메일': email,
          '프로젝트 설명': desc,
          _subject: subject,
          _replyto: email,
          _template: 'table',
          _honey: honey ? honey.value : ''
        })
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (data) {
            return { ok: res.ok, data: data };
          });
        })
        .then(function (r) {
          var ok = r.ok && r.data && (r.data.success === 'true' || r.data.success === true);
          if (!ok) throw new Error((r.data && r.data.message) || 'send failed');
          form.hidden = true;
          var done = document.getElementById('formSuccess');
          if (done) done.hidden = false;
        })
        .catch(function () {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = prevLabel;
          }
          if (note) {
            note.classList.add('form-note-error');
            note.textContent = '전송에 실패했습니다. 잠시 후 다시 시도하시거나 kyh@octo-brain.com 으로 직접 보내주세요.';
          }
        });
    });
  })();

  /* ===== 8. FOOTER YEAR ===== */
  (function year() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  })();

})();
