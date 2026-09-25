/* =========================================================
   OctoBrain — main.js
   ========================================================= */
(function () {
  'use strict';

  var EMAIL = 'kyh@octo-brain.com';

  // i18n.js(OBI18N)가 있으면 현재 언어의 문자열, 없으면 한국어 기본값을 돌려준다.
  function T(key, fallback) {
    var i18n = window.OBI18N;
    var v = i18n && typeof i18n.t === 'function' ? i18n.t(key) : null;
    return v || fallback;
  }
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var supportsIO = 'IntersectionObserver' in window;

  // Preserve bookmarks from the former single-page site.
  function redirectLegacySection() {
    if (document.body.dataset.page !== 'home') return false;
    var destinations = {
      '#services': ['engineering.html', '#services'],
      '#projects': ['engineering.html', '#projects'],
      '#about': ['engineering.html', '#about'],
      '#contact': ['engineering.html', '#contact'],
      '#downloads': ['store.html', '#downloads'],
      '#games': ['games.html', '']
    };
    var destination = destinations[window.location.hash];
    if (!destination) return false;
    window.location.replace(destination[0] + window.location.search + destination[1]);
    return true;
  }
  if (redirectLegacySection()) return;
  window.addEventListener('hashchange', redirectLegacySection);

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
    var background = Array.prototype.slice.call(document.querySelectorAll('.site-header, main, .site-footer, .skip-link'));
    var desktop = window.matchMedia('(min-width:1001px)');
    var opened = false;
    var previousOverflow = '';

    function setOpen(open, restoreFocus) {
      if (opened === open) return;
      opened = open;
      if (open) previousOverflow = document.body.style.overflow;
      menu.hidden = !open;
      menu.inert = !open;
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? T('js.menuClose', '메뉴 닫기') : T('js.menuOpen', '메뉴 열기'));
      background.forEach(function (el) { el.inert = open; });
      document.body.style.overflow = open ? 'hidden' : previousOverflow;
      if (open && close) {
        close.focus({ preventScroll: true });
      } else if (restoreFocus !== false) {
        var target = desktop.matches ? document.querySelector('.brand') : toggle;
        if (target) target.focus({ preventScroll: true });
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
      var link = e.target.closest('a');
      if (link) {
        setOpen(false);
        var href = link.getAttribute('href');
        if (href && href.charAt(0) === '#') {
          var destination = document.getElementById(href.slice(1));
          if (destination) destination.focus({ preventScroll: true });
        }
      } else if (e.target === menu) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (!opened) return;
      if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
      if (e.key === 'Tab') {
        var focusable = menu.querySelectorAll('a[href], button:not([disabled])');
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    });
    desktop.addEventListener('change', function () {
      if (desktop.matches && opened) setOpen(false);
    });
  })();

  /* ===== 3. SCROLL SPY ===== */
  (function scrollSpy() {
    var pageSections = {
      engineering: ['services', 'projects', 'partnership', 'about', 'contact'],
      store: ['downloads', 'programs', 'licenses', 'support'],
      games: ['game-project', 'updates', 'contact']
    };
    var ids = pageSections[document.body.dataset.page] || [];
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link[href^="#"], .btn-nav[href^="#"]'));
    var sections = ids.map(function (id) { return document.getElementById(id); }).filter(Boolean);
    if (!links.length || !sections.length) return;

    function setActive(id) {
      links.forEach(function (a) {
        var active = a.getAttribute('href') === '#' + id;
        a.classList.toggle('active', active);
        if (active) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    }

    var scheduled = false;
    function sync() {
      scheduled = false;
      var active = '';
      sections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.4) active = section.id;
      });
      setActive(active);
    }
    function schedule() {
      if (!scheduled) { scheduled = true; window.requestAnimationFrame(sync); }
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule);
    sync();
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

    document.documentElement.classList.add('js');

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

    // 언어가 바뀌면 버튼 원문(복사/Copy/コピー)을 다시 읽는다
    document.addEventListener('ob:langchange', function () {
      window.clearTimeout(timer);
      original = btn.textContent;
    });

    function done() {
      btn.textContent = T('js.copied', '복사됨 ✓');
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
    var submitting = false;

    function clearInputError(input) {
      if (!input || !input.id) return;
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
      var field = input.closest('.field');
      if (field) field.classList.remove('field-error');
      var message = document.getElementById(input.id + '-error');
      if (message) message.remove();
    }

    function clearErrors() {
      form.querySelectorAll('[aria-invalid]').forEach(clearInputError);
    }
    form.addEventListener('input', function (e) { clearInputError(e.target); });

    function fail(input, message) {
      var field = input.closest('.field');
      if (!field) return;
      field.classList.add('field-error');
      var msg = document.createElement('p');
      msg.className = 'field-msg';
      msg.id = input.id + '-error';
      msg.textContent = message;
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', msg.id);
      field.appendChild(msg);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (submitting) return;
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
      if (!name) { fail(nameEl, T('js.errName', '이름을 입력해주세요.')); invalid.push(nameEl); }
      if (!EMAIL_RE.test(email)) { fail(emailEl, T('js.errEmail', '올바른 이메일 주소를 입력해주세요.')); invalid.push(emailEl); }
      if (!desc) { fail(descEl, T('js.errDesc', '문의 내용을 입력해주세요.')); invalid.push(descEl); }

      if (invalid.length) {
        invalid[0].focus();
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var note = form.querySelector('.form-note');
      var honey = document.getElementById('fHoney');
      var subject = '[' + (form.dataset.subject || '옥토브레인 문의') + '] ' + name + (company ? ' — ' + company : '');
      var prevLabel = btn ? btn.innerHTML : '';
      var controller = new AbortController();
      var timeout = window.setTimeout(function () { controller.abort(); }, 25000);
      submitting = true;
      form.setAttribute('aria-busy', 'true');
      if (note) {
        note.classList.remove('form-note-error');
        note.textContent = T('js.sending', '문의를 전송하고 있습니다…');
      }

      if (btn) {
        btn.disabled = true;
        btn.textContent = T('js.sendingBtn', '전송 중…');
      }

      fetch('https://formsubmit.co/ajax/' + EMAIL, {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          '이름': name,
          '회사명': company || '-',
          '이메일': email,
          '문의 내용': desc,
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
          if (done) {
            done.hidden = false;
            done.focus();
          }
        })
        .catch(function (error) {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = prevLabel;
          }
          if (note) {
            note.classList.add('form-note-error');
            note.textContent = error.name === 'AbortError'
              ? T('js.sendTimeout', '응답이 지연되고 있습니다. 입력 내용은 보존되어 있으니 다시 시도하시거나 kyh@octo-brain.com 으로 직접 보내주세요.')
              : T('js.sendFail', '전송에 실패했습니다. 입력 내용은 보존되어 있으니 다시 시도하시거나 kyh@octo-brain.com 으로 직접 보내주세요.');
          }
        })
        .finally(function () {
          window.clearTimeout(timeout);
          submitting = false;
          form.removeAttribute('aria-busy');
        });
    });
  })();

  /* ===== 8. FOOTER YEAR ===== */
  (function year() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  })();

})();
