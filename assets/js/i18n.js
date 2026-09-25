/* =========================================================
   OctoBrain — i18n.js
   한국어(HTML 원문) / English / 日本語 전환.
   - HTML 의 data-i18n="key" 요소는 innerHTML 을, data-i18n-attr="attr:key" 는 속성값을 바꾼다.
   - 언어 결정: ?lang= → 사용자가 고른 언어(localStorage) → 브라우저 언어 → 영어.
   - 헤더에 언어 드롭다운, 모바일 메뉴에 언어 버튼을 넣는다.
   - 문구를 추가할 때: HTML 요소에 data-i18n="키" 를 붙이고(원문은 한국어 그대로),
     아래 DICT.en / DICT.ja 에 같은 키로 번역을 넣는다. 번역이 없는 키는 한국어 원문이 그대로 보인다.
   - <title>/description 은 META[언어][data-page] 에서 가져온다.
   ========================================================= */
(function () {
  'use strict';

  var STORAGE_KEY = 'octobrain-lang';
  var LANGS = { ko: '한국어', en: 'English', ja: '日本語' };
  var CODES = { ko: 'KO', en: 'EN', ja: 'JA' };
  var LABEL = { ko: '언어 선택', en: 'Language', ja: '言語' };

  var DICT = {
  "en": {
    "common.skip": "Skip to content",
    "common.legal": "OctoBrain · CEO Yunhwan Kim · Business Registration No. 438-10-03079",
    "common.businessSwitch": "Divisions <span aria-hidden=\"true\">↗</span>",
    "common.mobileSwitch": "← Other divisions",
    "common.footerSwitch": "← OctoBrain divisions",
    "common.backTop": "Back to top ↑",
    "common.back": "← Divisions",
    "common.menuOpen": "Open menu",
    "common.menuClose": "Close menu",
    "common.footerNav": "Footer menu",
    "home.brand": "OctoBrain home",
    "home.areasLabel": "Choose a division",
    "home.title": "From technology to products,<br>OctoBrain",
    "home.intro": "Contract development · Software · Indie games<br>Explore the services and products of each division.",
    "home.c1.title": "Contract Development",
    "home.c1.desc": "Embedded, BMS and industrial software. <br>We build the technology you need, together.",
    "home.c1.meta": "Services · Track record · Consultation",
    "home.c1.action": "Explore engineering<span aria-hidden=\"true\">↗</span>",
    "home.c2.title": "Software",
    "home.c2.desc": "Download our in-house software <br>and check license details.",
    "home.c2.meta": "3 free programs · Licensed products coming soon",
    "home.c2.action": "Browse software<span aria-hidden=\"true\">↗</span>",
    "home.c3.title": "Indie Games",
    "home.c3.desc": "Games made in-house at OctoBrain. <br>New play experiences and development news.",
    "home.c3.meta": "Games in development · Release news",
    "home.c3.action": "See the games<span aria-hidden=\"true\">↗</span>",
    "home.footer": "We build technology and turn it into products and experiences.",
    "store.brand": "OctoBrain Software home",
    "store.label": "Software",
    "store.navLabel": "Software menu",
    "store.mobileLabel": "Software mobile menu",
    "store.mobileNavLabel": "Software mobile navigation",
    "store.supportLabel": "Software inquiries",
    "store.nav.downloads": "Free Downloads",
    "store.nav.programs": "License Store",
    "store.nav.licenses": "Licensing",
    "store.nav.support": "Contact",
    "store.eyebrow": "OCTOBRAIN SOFTWARE · SALES &amp; DISTRIBUTION",
    "store.title": "The software you need,<br><span>in one place.</span>",
    "store.intro": "Download free Windows software <br>and stay up to date on new programs and licensed products.",
    "store.ctaDownload": "Download free software <span class=\"arr\" aria-hidden=\"true\">↓</span>",
    "store.ctaLicense": "About licensed products",
    "store.status": "3 free utilities available · Licensed products coming soon",
    "store.dl.title": "Free Software Downloads",
    "store.dl.lead": "Windows utilities we developed ourselves and distribute for free. Download and use them freely.",
    "store.player.tagline": "Free media player",
    "store.player.desc": "Plays most media formats including MP4, MKV, MP3 and FLAC. A light, fast desktop player with subtitle sync, A-B repeat, playback speed and aspect ratio controls, and resume playback.",
    "store.player.chip1": "Media playback",
    "store.player.chip2": "Subtitles · A-B repeat",
    "store.player.chip3": "libVLC engine",
    "store.capture.tagline": "Screen capture &amp; recording",
    "store.capture.desc": "Six capture modes including region, window and scrolling capture, image editing with mosaic and arrows, and MP4 · GIF · WebP screen recording, all in one. Capture instantly from anywhere with global hotkeys.",
    "store.capture.chip1": "6 capture modes",
    "store.capture.chip2": "Record MP4 · GIF",
    "store.capture.chip3": "Image editing",
    "store.converter.tagline": "All-purpose file converter",
    "store.converter.desc": "Converts images, animations, icons, documents, music and video, organized by tab. Set a target file size and quality is adjusted automatically, and batch-convert many files at once.",
    "store.converter.chip1": "Image · video conversion",
    "store.converter.chip2": "Auto target size",
    "store.converter.chip3": "Batch conversion",
    "store.download": "Download (.exe) <span class=\"arr\" aria-hidden=\"true\">↓</span>",
    "store.notes": "Release notes ↗",
    "store.help.summary": "Installation &amp; requirements",
    "store.help.body": "The three utilities above are free and distributed under the MIT license. The installers are self-contained, so no .NET runtime installation is required. Because the installers are unsigned, Windows SmartScreen may show a warning — choose [More info] → [Run anyway] to install.",
    "store.programs.status": "Coming soon",
    "store.programs.emptyTitle": "New licensed products are in preparation.",
    "store.programs.emptyBody": "Product details and licensing information will be published once a release is confirmed. <br>There are currently no paid licensed products on sale.",
    "store.lic.freeTitle": "Free license",
    "store.lic.freeBody": "The three free utilities above are distributed under the MIT license. Free licenses for future programs will come with per-product terms of use.",
    "store.lic.freeNote": "Free utilities available to download",
    "store.lic.paidTitle": "Paid license",
    "store.lic.paidBody": "Pricing, included features and license terms for purchasable licenses will be announced per program.",
    "store.lic.paidNote": "Pricing and purchase details coming soon",
    "store.lic.disclaimer": "License availability and detailed terms are finalized at each product's release. The free utilities can be downloaded above; license issuance and payment features are in preparation.",
    "store.support.title": "Have a question about our software?",
    "store.support.body": "Send product and licensing inquiries by email.",
    "store.footer.division": "OctoBrain <span>Software</span>",
    "store.footer.about": "Free downloads of OctoBrain software, plus license sales and usage information.",
    "store.footer.menu": "Software menu",
    "eng.brand": "OctoBrain Engineering home",
    "eng.label": "Engineering",
    "eng.about.title": "About the Engineer",
    "eng.navLabel": "Engineering menu",
    "eng.mobileLabel": "Engineering mobile menu",
    "eng.mobileNavLabel": "Engineering mobile navigation",
    "eng.nav.services": "Services",
    "eng.nav.projects": "Track Record",
    "eng.nav.partnership": "Partnership",
    "eng.nav.about": "About",
    "eng.nav.contact": "Contact",
    "eng.title": "The technology you need,<br><span>as a working system.</span>",
    "eng.intro": "Contract development for embedded, BMS and industrial software. <br>From on-site requirements to verification and delivery, we work with you directly.",
    "eng.ctaContact": "Contact us <span aria-hidden=\"true\">→</span>",
    "eng.ctaProjects": "See track record <span aria-hidden=\"true\">↓</span>",
    "eng.point1": "6 years of battery R&amp;D",
    "eng.point2": "Firmware · Diagnostic tools · Industrial comms",
    "eng.point3": "Direct support from the lead engineer",
    "eng.svc.eyebrow": "// SERVICES — B2B CONTRACT WORK",
    "eng.svc.title": "Engineering Services",
    "eng.svc.lead": "An engineer with 6 years of battery R&amp;D experience personally handles everything from requirements analysis to development, verification and delivery.",
    "eng.svc1.title": "BMS &amp; MCU Embedded Firmware",
    "eng.svc1.desc": "We design and implement battery management system (BMS) and MCU firmware, covering the whole battery domain: cell monitoring, protection logic, SOC/SOH estimation and communication stacks.",
    "eng.svc2.title": "C# Diagnostic &amp; Monitoring Tools",
    "eng.svc2.desc": "We build Windows-based diagnostic, data logging and real-time monitoring tools ready for use in the field, as one integrated package from device integration to UI.",
    "eng.svc2.chip3": "Serial · CAN integration",
    "eng.svc2.chip4": "Data logging",
    "eng.svc3.title": "Industrial Communication &amp; HMI",
    "eng.svc3.desc": "We develop integrations for industrial protocols such as CAN and Modbus, HMIs for equipment control, and industrial PC software.",
    "eng.svc3.chip5": "Industrial PC",
    "eng.field.copy": "We have developed battery firmware for a wide range of applications, from golf cart batteries to stationary and mobile ESS, AGVs, transporters, and special-purpose and refrigerated trucks. That accumulated domain experience lets us adapt quickly to new environments and requirements.",
    "eng.field.chip1": "Golf cart batteries",
    "eng.field.chip2": "Stationary · Mobile ESS",
    "eng.field.chip3": "Marine ESS",
    "eng.field.chip5": "Transporters",
    "eng.field.chip6": "Special-purpose · Refrigerated trucks",
    "eng.proc1.label": "Inquiry &amp; requirements",
    "eng.proc1.desc": "Project overview and requirements intake",
    "eng.proc2.label": "Quote &amp; schedule",
    "eng.proc2.desc": "Scope confirmation, quote and schedule proposal",
    "eng.proc3.label": "Development &amp; verification",
    "eng.proc3.desc": "Implementation, testing, interim reports",
    "eng.proc4.label": "Delivery &amp; maintenance",
    "eng.proc4.desc": "Deliverable handover and after-delivery support",
    "eng.svc.cta": "Discuss a project <span class=\"arr\" aria-hidden=\"true\">→</span>",
    "eng.proj.eyebrow": "// TRACK RECORD — B2B PROJECTS",
    "eng.proj.lead": "Key B2B projects deployed in industrial settings, described to the extent that can be disclosed.",
    "eng.case1.client": "Major Korean shipbuilding &amp; construction equipment company",
    "eng.case1.title": "Marine ESS System Development",
    "eng.case1.desc": "Carried out the full firmware development for a marine energy storage system (ESS).",
    "eng.case1.task1": "Overall ESS firmware design and development",
    "eng.case1.task2": "Functional safety logic implementation",
    "eng.case1.task3": "Design for classification society certification requirements",
    "eng.case1.task4": "HMI panel software development · UI design",
    "eng.case1.chip2": "Marine systems",
    "eng.case1.chip3": "Functional safety",
    "eng.case1.privacy": "Project images and detailed materials are not disclosed under a non-disclosure agreement.",
    "eng.case2.figLabel": "View the BMS diagnostic and monitoring screen at full size (new window)",
    "eng.case2.alt": "Voltage, temperature and cell status screen of the BMS diagnostic and monitoring program",
    "eng.case2.caption": "Click the image to enlarge.",
    "eng.case2.client": "Battery BMS solutions company",
    "eng.case2.title": "BMS Firmware &amp; Diagnostic Tool Development",
    "eng.case2.desc": "Led BMS firmware and diagnostic/monitoring tool development as firmware team leader.",
    "eng.case2.task1": "BMS firmware design and development, firmware team leadership",
    "eng.case2.task2": "Functional safety implementation, KC 62619 testing performed in-house",
    "eng.case2.task3": "Monitoring software compatible with CAN, Modbus and USB Serial",
    "eng.case2.task4": "Product-specific UI, parameter input, configurable UI layout",
    "eng.case2.chip2": "Embedded firmware",
    "eng.case2.chip4": "C# diagnostic tool",
    "eng.caseSlot": "+ More projects being compiled",
    "eng.part.title": "Long-term Collaboration through Partnership Agreements",
    "eng.part.lead": "Through partnership agreements, we provide long-term project collaboration and ongoing technical support.",
    "eng.part.dt1": "Long-term project collaboration",
    "eng.part.dd1": "We collaborate continuously in line with the project's development direction and schedule.",
    "eng.part.dt2": "Ongoing technical support",
    "eng.part.dd2": "We keep handling the technical reviews and development work needed throughout the collaboration.",
    "eng.part.note": "The scope of collaboration and the form of support are agreed individually for each project.",
    "eng.part.cta": "Partnership inquiry <span aria-hidden=\"true\">→</span>",
    "eng.part.statusLabel": "Current partnership agreements",
    "eng.part.statusEyebrow": "Partnership agreements",
    "eng.part.count": "2<span> companies</span>",
    "eng.part.statusCopy": "We currently hold partnership agreements with 2 companies.",
    "eng.about.p1": "OctoBrain is a one-person engineering studio run by an engineer with 6 years of battery R&amp;D experience. Drawing on experience as a battery researcher developing BMS and battery systems for golf carts, ESS, AGVs and special-purpose vehicles, we deliver development spanning hardware and software, from embedded firmware to diagnostic tools and industrial communication.",
    "eng.about.p2": "The lead engineer communicates with you directly at every step, from requirements review through design, implementation, verification and delivery. We understand both hardware and software, and build what the field actually needs.",
    "eng.fact1": "years of battery R&amp;D",
    "eng.fact2": "Direct consultation with the lead engineer",
    "eng.fact3": "Handled end to end, from design to delivery",
    "eng.signature": "Founder · Engineer <span>Yunhwan Kim</span>",
    "eng.contact.title": "Contract &amp; Partnership Inquiries",
    "eng.contact.lead": "Tell us about your contract project or long-term partnership. We reply within 1–2 business days.",
    "eng.copy": "Copy",
    "eng.response": "Reply within 1–2 business days",
    "eng.infoNote": "Even if your requirements aren't specific yet, just tell us your current situation and what you need.",
    "eng.form.name": "Name <span class=\"req\" aria-hidden=\"true\">*</span>",
    "eng.form.company": "Company",
    "eng.form.email": "Email <span class=\"req\" aria-hidden=\"true\">*</span>",
    "eng.form.desc": "Message <span class=\"req\" aria-hidden=\"true\">*</span>",
    "eng.form.placeholder": "Describe the project overview or partnership goals, the features you need, and your desired schedule.",
    "eng.form.submit": "Send inquiry <span class=\"arr\" aria-hidden=\"true\">→</span>",
    "eng.form.note": "Your inquiry goes straight to kyh@octo-brain.com when you press Send.",
    "eng.form.successTitle": "Your inquiry has been sent ✓",
    "eng.form.successCopy": "We'll reply within 1–2 business days. <br>For urgent matters, contact kyh@octo-brain.com directly.",
    "eng.footer.division": "OctoBrain <span>Engineering</span>",
    "eng.footer.about": "Contract development for embedded, BMS and industrial software. From requirements review through design, development, verification and delivery.",
    "eng.footer.menu": "Engineering menu",
    "games.brand": "OctoBrain Games home",
    "games.label": "Indie Games",
    "games.navLabel": "Games menu",
    "games.mobileLabel": "Games mobile menu",
    "games.mobileNavLabel": "Games mobile navigation",
    "games.nav.project": "In Development",
    "games.nav.updates": "Dev News",
    "games.nav.contact": "Contact",
    "games.title": "A small studio,<br><span>a new kind of play.</span>",
    "games.intro": "Indie games planned and built by OctoBrain.<br>Follow along as a new story takes shape.",
    "games.cta": "See the game in development <span aria-hidden=\"true\">↓</span>",
    "games.mediaText": "Screenshots · Trailer<br>Coming soon",
    "games.status": "In development · Title to be announced",
    "games.projectTitle": "New Project <span class=\"game-title-sub\">— title to be announced</span>",
    "games.desc": "Our first original title, currently in development with Unity. The game introduction, screenshots and trailer will be published here as soon as they are ready.",
    "games.chip3": "Coming to Steam",
    "games.releaseNote": "The Steam store page is being prepared.",
    "games.emailBtn": "Email us about the game",
    "games.youtubeBtn": "Dev news on YouTube ↗",
    "games.updates.title": "Next updates will appear here",
    "games.updates.body": "Once the title, gameplay footage and release schedule are set, they'll be announced on this page.",
    "games.updates.link": "OctoBrain YouTube channel <span aria-hidden=\"true\">↗</span>",
    "games.contact.title": "Game Inquiries",
    "games.contact.body": "Send us your questions about the game, partnerships or development news.",
    "games.contact.cta": "Email us about the game <span aria-hidden=\"true\">↗</span>",
    "games.footer.division": "OctoBrain <span>Indie Games</span>",
    "games.footer.about": "Indie games planned and developed in-house at OctoBrain, plus the latest development news.",
    "games.footer.menu": "Games menu",
    "nf.title": "Page not found",
    "nf.body": "NOT FOUND — The address has changed or the page doesn't exist.",
    "nf.home": "Back to home",
    "nf.quickLabel": "Division pages",
    "nf.eng": "Contract Development",
    "nf.store": "Software",
    "nf.games": "Indie Games",
    "js.menuOpen": "Open menu",
    "js.menuClose": "Close menu",
    "js.copied": "Copied ✓",
    "js.errName": "Please enter your name.",
    "js.errEmail": "Please enter a valid email address.",
    "js.errDesc": "Please enter your message.",
    "js.sending": "Sending your inquiry…",
    "js.sendingBtn": "Sending…",
    "js.sendTimeout": "The response is taking longer than expected. Your input has been kept — please try again or email kyh@octo-brain.com directly.",
    "js.sendFail": "Sending failed. Your input has been kept — please try again or email kyh@octo-brain.com directly.",
    "store.dlMeta": "Windows 10/11 · 64-bit · {size}"
  },
  "ja": {
    "common.skip": "本文へスキップ",
    "common.legal": "屋号 オクトブレイン · 代表 キム・ユンファン · 事業者登録番号 438-10-03079",
    "common.businessSwitch": "事業選択 <span aria-hidden=\"true\">↗</span>",
    "common.mobileSwitch": "← ほかの事業を見る",
    "common.footerSwitch": "← オクトブレインの事業選択",
    "common.backTop": "トップへ ↑",
    "common.back": "← 事業選択",
    "common.menuOpen": "メニューを開く",
    "common.menuClose": "メニューを閉じる",
    "common.footerNav": "フッターメニュー",
    "home.brand": "オクトブレイン ホーム",
    "home.areasLabel": "事業領域を選ぶ",
    "home.title": "技術から製品まで、<br>オクトブレイン",
    "home.intro": "受託開発 · ソフトウェア販売・配布 · インディーゲーム<br>各事業のサービスと製品をご紹介します。",
    "home.c1.title": "受託開発",
    "home.c1.desc": "組み込み・BMS・産業用ソフトウェア。<br>必要な技術を一緒に開発します。",
    "home.c1.meta": "サービス紹介 · 開発実績 · ご相談",
    "home.c1.action": "受託開発を見る<span aria-hidden=\"true\">↗</span>",
    "home.c2.title": "ソフトウェア販売・配布",
    "home.c2.desc": "自社開発のプログラムをダウンロードし、<br>ライセンス情報をご確認ください。",
    "home.c2.meta": "無料プログラム3種 · ライセンス販売準備中",
    "home.c2.action": "プログラムを見る<span aria-hidden=\"true\">↗</span>",
    "home.c3.title": "インディーゲーム",
    "home.c3.desc": "オクトブレインの自社制作ゲーム。<br>新しいプレイと開発ニュースをお届けします。",
    "home.c3.meta": "開発中のゲーム · リリース情報",
    "home.c3.action": "ゲームを見る<span aria-hidden=\"true\">↗</span>",
    "home.footer": "技術をつくり、製品と体験へつなげます。",
    "store.brand": "オクトブレイン ソフトウェア ホーム",
    "store.label": "ソフトウェア",
    "store.navLabel": "ソフトウェアメニュー",
    "store.mobileLabel": "ソフトウェア モバイルメニュー",
    "store.mobileNavLabel": "ソフトウェア モバイルナビゲーション",
    "store.supportLabel": "ソフトウェアのお問い合わせ",
    "store.nav.downloads": "無料ダウンロード",
    "store.nav.programs": "ライセンス販売",
    "store.nav.licenses": "ライセンス案内",
    "store.nav.support": "お問い合わせ",
    "store.eyebrow": "OCTOBRAIN SOFTWARE · 販売・配布",
    "store.title": "必要なプログラムを、<br><span>ひとつの場所で。</span>",
    "store.intro": "無料のWindowsプログラムをダウンロードし、<br>新しいプログラムとライセンス販売の情報をご確認ください。",
    "store.ctaDownload": "無料プログラムをダウンロード <span class=\"arr\" aria-hidden=\"true\">↓</span>",
    "store.ctaLicense": "ライセンス販売のご案内",
    "store.status": "無料ユーティリティ3種を配布中 · ライセンス販売準備中",
    "store.dl.title": "無料プログラムのダウンロード",
    "store.dl.lead": "自社で開発し、無料で配布しているWindowsユーティリティです。お気軽にダウンロードしてお使いください。",
    "store.player.tagline": "無料メディアプレイヤー",
    "store.player.desc": "MP4・MKV・MP3・FLACなど、ほとんどのメディア形式を再生します。字幕の同期調整、A-B区間リピート、再生速度・画面比率の調整、続きから再生まで備えた、軽くて速いデスクトッププレイヤーです。",
    "store.player.chip1": "メディア再生",
    "store.player.chip2": "字幕 · 区間リピート",
    "store.player.chip3": "libVLCエンジン",
    "store.capture.tagline": "画面キャプチャ・録画ツール",
    "store.capture.desc": "ドラッグ範囲・ウィンドウ・スクロールキャプチャなど6つのキャプチャモードと、モザイク・矢印の画像編集、MP4・GIF・WebPの画面録画をひとつにまとめました。グローバルホットキーでどこからでもすぐにキャプチャできます。",
    "store.capture.chip1": "6つのキャプチャモード",
    "store.capture.chip2": "録画 MP4 · GIF",
    "store.capture.chip3": "画像編集",
    "store.converter.tagline": "汎用ファイル変換ツール",
    "store.converter.desc": "画像・アニメーション・アイコン・文書・音楽・動画をタブごとに変換します。目標サイズを指定すると品質を自動で調整し、複数ファイルを一括変換できます。",
    "store.converter.chip1": "画像 · 動画変換",
    "store.converter.chip2": "目標サイズ自動",
    "store.converter.chip3": "一括変換",
    "store.download": "ダウンロード (.exe) <span class=\"arr\" aria-hidden=\"true\">↓</span>",
    "store.notes": "リリースノート ↗",
    "store.help.summary": "インストール案内 · 動作環境",
    "store.help.body": "上記の3つのユーティリティは無料で、MITライセンスで配布しています。.NETランタイムのインストールが不要な自己完結型（self-contained）のインストーラーです。署名されていないため、Windows SmartScreenの警告が表示されることがあります — [詳細情報] → [実行] を選ぶとインストールできます。",
    "store.programs.status": "販売準備中",
    "store.programs.emptyTitle": "新しいライセンス製品を準備しています。",
    "store.programs.emptyBody": "リリースが確定次第、製品紹介とライセンス情報を公開します。<br>現在販売中の有料ライセンス製品はありません。",
    "store.lic.freeTitle": "無料ライセンス",
    "store.lic.freeBody": "上記の無料ユーティリティ3種はMITライセンスで配布しています。今後追加するプログラムの無料ライセンスについては、製品ごとに利用条件をご案内する予定です。",
    "store.lic.freeNote": "無料ユーティリティをダウンロード可能",
    "store.lic.paidTitle": "有料ライセンス",
    "store.lic.paidBody": "購入可能なライセンスの価格、含まれる機能、利用期間をプログラムごとにご案内する予定です。",
    "store.lic.paidNote": "価格 · 購入方法は公開予定",
    "store.lic.disclaimer": "ライセンスの提供有無と詳細条件は、製品リリース時に確定します。無料ユーティリティは上からダウンロードでき、ライセンス発行・決済機能は準備中です。",
    "store.support.title": "プログラムについてご質問はありますか？",
    "store.support.body": "製品やライセンスに関するお問い合わせはメールでお送りください。",
    "store.footer.division": "OctoBrain <span>ソフトウェア</span>",
    "store.footer.about": "オクトブレインのソフトウェアの無料ダウンロードと、ライセンス販売・利用のご案内。",
    "store.footer.menu": "ソフトウェアメニュー",
    "eng.brand": "オクトブレイン 受託開発 ホーム",
    "eng.label": "受託開発",
    "eng.about.title": "エンジニア紹介",
    "eng.navLabel": "受託開発メニュー",
    "eng.mobileLabel": "受託開発 モバイルメニュー",
    "eng.mobileNavLabel": "受託開発 モバイルナビゲーション",
    "eng.nav.services": "サービス",
    "eng.nav.projects": "開発実績",
    "eng.nav.partnership": "提携協力",
    "eng.nav.about": "エンジニア紹介",
    "eng.nav.contact": "お問い合わせ",
    "eng.title": "必要な技術を、<br><span>動くシステムに。</span>",
    "eng.intro": "組み込み・BMS・産業用ソフトウェアの受託開発。<br>現場の要件から検証・納品まで、直接一緒に進めます。",
    "eng.ctaContact": "受託開発のお問い合わせ <span aria-hidden=\"true\">→</span>",
    "eng.ctaProjects": "開発実績を見る <span aria-hidden=\"true\">↓</span>",
    "eng.point1": "バッテリーR&amp;D 6年の経験",
    "eng.point2": "ファームウェア · 診断ツール · 産業用通信",
    "eng.point3": "代表エンジニアが直接対応",
    "eng.svc.eyebrow": "// SERVICES — B2B受託",
    "eng.svc.title": "エンジニアリングサービス",
    "eng.svc.lead": "バッテリー研究開発6年の経験を持つエンジニアが、要件分析から開発・検証・納品まで直接担当します。",
    "eng.svc1.title": "BMS &amp; MCU 組み込みファームウェア",
    "eng.svc1.desc": "バッテリーマネジメントシステム（BMS）とMCUファームウェアを設計・実装します。セル監視、保護ロジック、SOC・SOH推定、通信スタックなど、バッテリー領域全般を扱います。",
    "eng.svc2.title": "C# 診断・モニタリングツール",
    "eng.svc2.desc": "現場ですぐ使えるWindowsベースの診断・データロギング・リアルタイム監視ツールを開発します。機器連携からUIまで一体で製作します。",
    "eng.svc2.chip3": "Serial · CAN連携",
    "eng.svc2.chip4": "データロギング",
    "eng.svc3.title": "産業用通信 &amp; HMI",
    "eng.svc3.desc": "CAN・Modbusなどの産業用通信プロトコルの連携、機器制御用HMI、産業用PCソフトウェアを開発します。",
    "eng.svc3.chip5": "産業用PC",
    "eng.field.copy": "ゴルフカート用バッテリーから定置型・移動型ESS、AGV、トランスポーター、特装車・冷凍車まで、さまざまなアプリケーションのバッテリーファームウェアを開発してきました。蓄積したドメイン経験をもとに、新しい環境や要件にも素早く適応して開発します。",
    "eng.field.chip1": "ゴルフカート用バッテリー",
    "eng.field.chip2": "定置型 · 移動型ESS",
    "eng.field.chip3": "船舶用ESS",
    "eng.field.chip5": "トランスポーター",
    "eng.field.chip6": "特装車 · 冷凍車",
    "eng.proc1.label": "お問い合わせ・要件整理",
    "eng.proc1.desc": "プロジェクト概要と要件の受付",
    "eng.proc2.label": "見積・日程の協議",
    "eng.proc2.desc": "範囲の確定と見積・日程の提案",
    "eng.proc3.label": "開発・検証",
    "eng.proc3.desc": "実装、テスト、中間レポート",
    "eng.proc4.label": "納品・保守",
    "eng.proc4.desc": "成果物の引き渡しと事後サポート",
    "eng.svc.cta": "プロジェクトのご相談 <span class=\"arr\" aria-hidden=\"true\">→</span>",
    "eng.proj.eyebrow": "// TRACK RECORD — B2B実績",
    "eng.proj.lead": "産業現場に適用された主要なB2Bプロジェクトです。公開可能な範囲で主な実施内容をご紹介します。",
    "eng.case1.client": "韓国大手の造船・建設機械企業",
    "eng.case1.title": "船舶用ESSシステム開発",
    "eng.case1.desc": "船舶用エネルギー貯蔵システム（ESS）のファームウェア開発全般を担当しました。",
    "eng.case1.task1": "ESSファームウェアの設計・開発全般",
    "eng.case1.task2": "機能安全（Functional Safety）ロジックの実装",
    "eng.case1.task3": "船級認証要件に対応した設計",
    "eng.case1.task4": "HMIパネルソフトウェア開発 · UIデザイン",
    "eng.case1.chip2": "船舶システム",
    "eng.case1.chip3": "機能安全",
    "eng.case1.privacy": "秘密保持契約により、プロジェクトの画像や詳細資料は公開していません。",
    "eng.case2.figLabel": "BMS診断・監視画面を拡大表示（新しいウィンドウ）",
    "eng.case2.alt": "BMS診断・監視プログラムの電圧・温度・セル状態画面",
    "eng.case2.caption": "画像をクリックすると拡大表示できます。",
    "eng.case2.client": "バッテリーBMSソリューション専門企業",
    "eng.case2.title": "BMSファームウェア &amp; 診断ツール開発",
    "eng.case2.desc": "ファームウェアチームリーダーとして、BMSファームウェアと診断・監視ツールの開発を主導しました。",
    "eng.case2.task1": "BMSファームウェアの設計・開発およびファームウェアチームのリード",
    "eng.case2.task2": "機能安全の実装、KC 62619試験を直接実施",
    "eng.case2.task3": "CAN · Modbus · USB Serial対応の監視プログラム開発",
    "eng.case2.task4": "製品専用UI · パラメータ入力 · 可変UI構成",
    "eng.case2.chip2": "組み込みファームウェア",
    "eng.case2.chip4": "C#診断ツール",
    "eng.caseSlot": "+ 追加プロジェクトを整理中",
    "eng.part.title": "提携契約による長期協力",
    "eng.part.lead": "企業との提携契約を通じて、長期的なプロジェクト協力と継続的な技術対応を提供します。",
    "eng.part.dt1": "長期プロジェクト協力",
    "eng.part.dd1": "プロジェクトの開発方針と日程に合わせて継続的に協力します。",
    "eng.part.dt2": "継続的な技術対応",
    "eng.part.dd2": "協力の過程で必要な技術検討と開発対応を継続して行います。",
    "eng.part.note": "協力範囲と対応方法はプロジェクトの状況に合わせて個別に協議します。",
    "eng.part.cta": "提携協力のお問い合わせ <span aria-hidden=\"true\">→</span>",
    "eng.part.statusLabel": "現在の提携契約状況",
    "eng.part.statusEyebrow": "提携契約の状況",
    "eng.part.count": "2<span>社</span>",
    "eng.part.statusCopy": "現在2社と提携契約を締結しています。",
    "eng.about.p1": "OctoBrain（オクトブレイン）は、バッテリーR&amp;D 6年の経験を持つエンジニアが運営する一人のエンジニアリングスタジオです。バッテリー研究員としてゴルフカート・ESS・AGV・特装車など、さまざまなアプリケーションのBMSとバッテリーシステムを開発してきた経験をもとに、組み込みファームウェアから診断ツール、産業用通信まで、ハードウェアとソフトウェアを横断する開発を行います。",
    "eng.about.p2": "要件の検討から設計、実装、検証、納品まで、代表エンジニアが直接コミュニケーションします。ハードウェアとソフトウェアの両方を理解し、現場に必要な成果物を開発します。",
    "eng.fact1": "年のバッテリーR&amp;D経験",
    "eng.fact2": "代表エンジニアと直接相談",
    "eng.fact3": "設計から納品まで直接担当",
    "eng.signature": "代表 · エンジニア <span>キム・ユンファン</span>",
    "eng.contact.title": "受託開発・提携のお問い合わせ",
    "eng.contact.lead": "受託プロジェクトや長期的な提携協力についてお知らせください。営業日1–2日以内にご返信します。",
    "eng.copy": "コピー",
    "eng.response": "営業日1–2日以内に返信",
    "eng.infoNote": "要件がまだ具体的でなくても、現在の状況と必要な機能からお知らせください。",
    "eng.form.name": "お名前 <span class=\"req\" aria-hidden=\"true\">*</span>",
    "eng.form.company": "会社名",
    "eng.form.email": "メールアドレス <span class=\"req\" aria-hidden=\"true\">*</span>",
    "eng.form.desc": "お問い合わせ内容 <span class=\"req\" aria-hidden=\"true\">*</span>",
    "eng.form.placeholder": "プロジェクトの概要や提携協力の方向性、必要な機能、希望日程などをご記入ください。",
    "eng.form.submit": "送信する <span class=\"arr\" aria-hidden=\"true\">→</span>",
    "eng.form.note": "送信を押すと、お問い合わせが kyh@octo-brain.com に直接届きます。",
    "eng.form.successTitle": "お問い合わせを送信しました ✓",
    "eng.form.successCopy": "営業日1–2日以内にご返信します。<br>お急ぎの場合は kyh@octo-brain.com まで直接ご連絡ください。",
    "eng.footer.division": "OctoBrain <span>受託開発</span>",
    "eng.footer.about": "組み込み・BMS・産業用ソフトウェアの受託開発。要件の検討から設計、開発、検証、納品まで一貫して対応します。",
    "eng.footer.menu": "受託開発メニュー",
    "games.brand": "オクトブレイン インディーゲーム ホーム",
    "games.label": "インディーゲーム",
    "games.navLabel": "インディーゲームメニュー",
    "games.mobileLabel": "インディーゲーム モバイルメニュー",
    "games.mobileNavLabel": "インディーゲーム モバイルナビゲーション",
    "games.nav.project": "開発中のゲーム",
    "games.nav.updates": "開発ニュース",
    "games.nav.contact": "お問い合わせ",
    "games.title": "小さなスタジオの、<br><span>新しいプレイ。</span>",
    "games.intro": "オクトブレインが自ら企画し、つくるインディーゲーム。<br>新しい物語が始まる過程を、ぜひ見守ってください。",
    "games.cta": "開発中のゲームを見る <span aria-hidden=\"true\">↓</span>",
    "games.mediaText": "スクリーンショット · トレーラー<br>公開準備中",
    "games.status": "開発中 · タイトル公開予定",
    "games.projectTitle": "新作プロジェクト <span class=\"game-title-sub\">— タイトル公開予定</span>",
    "games.desc": "Unityで開発中の初の自社タイトルです。ゲーム紹介、スクリーンショット、トレーラーが準備でき次第、ここで公開します。",
    "games.chip3": "Steamでリリース予定",
    "games.releaseNote": "Steamストアページは公開準備中です。",
    "games.emailBtn": "メールでゲームについて問い合わせ",
    "games.youtubeBtn": "YouTubeで開発ニュースを見る ↗",
    "games.updates.title": "次のお知らせはこちらで",
    "games.updates.body": "ゲーム名、プレイ画面、リリース日程が決まり次第、このページでお知らせします。",
    "games.updates.link": "オクトブレイン YouTubeチャンネル <span aria-hidden=\"true\">↗</span>",
    "games.contact.title": "ゲームに関するお問い合わせ",
    "games.contact.body": "ゲーム紹介、提携、開発ニュースについてのご質問をお送りください。",
    "games.contact.cta": "メールでゲームについて問い合わせ <span aria-hidden=\"true\">↗</span>",
    "games.footer.division": "OctoBrain <span>インディーゲーム</span>",
    "games.footer.about": "オクトブレインが自ら企画・開発するインディーゲームと、最新の開発ニュースをご紹介します。",
    "games.footer.menu": "インディーゲームメニュー",
    "nf.title": "ページが見つかりません",
    "nf.body": "NOT FOUND — アドレスが変更されたか、存在しないページです。",
    "nf.home": "ホームへ戻る",
    "nf.quickLabel": "事業別ページ",
    "nf.eng": "受託開発",
    "nf.store": "ソフトウェア販売・配布",
    "nf.games": "インディーゲーム",
    "js.menuOpen": "メニューを開く",
    "js.menuClose": "メニューを閉じる",
    "js.copied": "コピーしました ✓",
    "js.errName": "お名前を入力してください。",
    "js.errEmail": "正しいメールアドレスを入力してください。",
    "js.errDesc": "お問い合わせ内容を入力してください。",
    "js.sending": "お問い合わせを送信しています…",
    "js.sendingBtn": "送信中…",
    "js.sendTimeout": "応答が遅れています。入力内容は保持されていますので、もう一度お試しいただくか、kyh@octo-brain.com まで直接お送りください。",
    "js.sendFail": "送信に失敗しました。入力内容は保持されていますので、もう一度お試しいただくか、kyh@octo-brain.com まで直接お送りください。",
    "store.dlMeta": "Windows 10/11 · 64bit · {size}"
  }
};

  var META = {
  "en": {
    "home": {
      "title": "Contract Development · Software · Indie Games | OctoBrain",
      "description": "OctoBrain's three divisions: contract engineering services, software sales and free downloads, and self-developed indie games, each on its own page."
    },
    "engineering": {
      "title": "Contract Development | OctoBrain",
      "description": "Contract development for embedded, BMS and industrial software. From requirements review through design, development, verification and delivery."
    },
    "store": {
      "title": "Software | OctoBrain",
      "description": "Free downloads of OctoBrain software, plus license sales and usage information."
    },
    "games": {
      "title": "Indie Games | OctoBrain",
      "description": "Indie games planned and developed in-house at OctoBrain, plus the latest development news."
    },
    "404": {
      "title": "Page not found | OctoBrain",
      "description": ""
    }
  },
  "ja": {
    "home": {
      "title": "受託開発 · ソフトウェア · インディーゲーム | OctoBrain（オクトブレイン）",
      "description": "オクトブレインの3つの事業。受託開発サービス、ソフトウェアの販売・無料配布、自社制作のインディーゲームを、それぞれの専用ページでご覧ください。"
    },
    "engineering": {
      "title": "受託開発 | OctoBrain（オクトブレイン）",
      "description": "組み込み・BMS・産業用ソフトウェアの受託開発。要件の検討から設計、開発、検証、納品まで一貫して対応します。"
    },
    "store": {
      "title": "ソフトウェア販売・配布 | OctoBrain（オクトブレイン）",
      "description": "オクトブレインのソフトウェアの無料ダウンロードと、ライセンス販売・利用のご案内。"
    },
    "games": {
      "title": "インディーゲーム | OctoBrain（オクトブレイン）",
      "description": "オクトブレインが自ら企画・開発するインディーゲームと、最新の開発ニュースをご紹介します。"
    },
    "404": {
      "title": "ページが見つかりません | OctoBrain（オクトブレイン）",
      "description": ""
    }
  }
};

  var current = 'ko';
  var textNodes = [];   // { el, key, html }  — 원문(한국어) innerHTML 보관
  var attrNodes = [];   // { el, attr, key, value }
  var metaNodes = [];   // { el, key, text } — .dl-meta (용량 숫자는 원문에서 가져온다)
  var origMeta = { title: '', description: '' };

  function has(lang) { return Object.prototype.hasOwnProperty.call(LANGS, lang); }

  function normalize(tag) {
    var code = String(tag || '').toLowerCase().split(/[-_]/)[0];
    return has(code) ? code : null;
  }

  function detect() {
    var fromQuery = null;
    try { fromQuery = normalize(new URLSearchParams(window.location.search).get('lang')); } catch (e) { fromQuery = null; }
    if (fromQuery) return fromQuery;

    var stored = null;
    try { stored = normalize(window.localStorage.getItem(STORAGE_KEY)); } catch (e) { stored = null; }
    if (stored) return stored;

    var list = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language || navigator.userLanguage || ''];
    for (var i = 0; i < list.length; i++) {
      var code = normalize(list[i]);
      if (code) return code;
    }
    return 'en';
  }

  function lookup(lang, key) {
    var d = DICT[lang];
    return d && Object.prototype.hasOwnProperty.call(d, key) ? d[key] : null;
  }

  function capture() {
    var i;
    var els = document.querySelectorAll('[data-i18n]');
    for (i = 0; i < els.length; i++) {
      textNodes.push({ el: els[i], key: els[i].getAttribute('data-i18n'), html: els[i].innerHTML });
    }
    els = document.querySelectorAll('[data-i18n-attr]');
    for (i = 0; i < els.length; i++) {
      var pairs = els[i].getAttribute('data-i18n-attr').split(';');
      for (var j = 0; j < pairs.length; j++) {
        var parts = pairs[j].split(':');
        if (parts.length !== 2) continue;
        attrNodes.push({ el: els[i], attr: parts[0].trim(), key: parts[1].trim(), value: els[i].getAttribute(parts[0].trim()) });
      }
    }
    els = document.querySelectorAll('.dl-meta');
    for (i = 0; i < els.length; i++) {
      metaNodes.push({ el: els[i], text: els[i].textContent });
    }
    var desc = document.querySelector('meta[name="description"]');
    origMeta.title = document.title;
    origMeta.description = desc ? desc.getAttribute('content') : '';
  }

  function setMeta(title, description) {
    document.title = title;
    var selectors = [['meta[name="description"]', description], ['meta[property="og:title"]', title], ['meta[property="og:description"]', description]];
    for (var i = 0; i < selectors.length; i++) {
      var el = document.querySelector(selectors[i][0]);
      if (el && selectors[i][1] != null) el.setAttribute('content', selectors[i][1]);
    }
  }

  function apply(lang) {
    current = lang;
    document.documentElement.setAttribute('lang', lang);
    var i, v;

    for (i = 0; i < textNodes.length; i++) {
      v = lang === 'ko' ? null : lookup(lang, textNodes[i].key);
      textNodes[i].el.innerHTML = v != null ? v : textNodes[i].html;
    }
    for (i = 0; i < attrNodes.length; i++) {
      v = lang === 'ko' ? null : lookup(lang, attrNodes[i].key);
      attrNodes[i].el.setAttribute(attrNodes[i].attr, v != null ? v : attrNodes[i].value);
    }
    var template = lang === 'ko' ? null : lookup(lang, 'store.dlMeta');
    for (i = 0; i < metaNodes.length; i++) {
      if (!template) {
        metaNodes[i].el.textContent = metaNodes[i].text;
      } else {
        var m = /(\d+(?:\.\d+)?\s?[KMG]B)/i.exec(metaNodes[i].text);
        metaNodes[i].el.textContent = template.replace('{size}', m ? m[1] : '');
      }
    }

    var page = document.body.getAttribute('data-page') || '';
    var meta = lang !== 'ko' && META[lang] ? META[lang][page] : null;
    if (meta) setMeta(meta.title, meta.description || origMeta.description);
    else setMeta(origMeta.title, origMeta.description);

    updateSwitchers();
    try {
      document.dispatchEvent(new CustomEvent('ob:langchange', { detail: { lang: lang } }));
    } catch (e) { /* CustomEvent 미지원 브라우저는 무시 */ }
  }

  function choose(lang) {
    if (!has(lang)) return;
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* 저장 불가 시 이번 방문만 적용 */ }
    if (lang !== current) apply(lang);
  }

  /* ===== 언어 전환 UI ===== */
  var GLOBE = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.7 3 2.7 15 0 18M12 3c-2.7 3-2.7 15 0 18"/></svg>';
  var CARET = '<svg class="lang-caret" viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  function optionButtons() {
    var out = '';
    for (var code in LANGS) {
      if (!has(code)) continue;
      out += '<button type="button" class="lang-option" data-lang="' + code + '" lang="' + code + '" aria-pressed="false">' + LANGS[code] + '</button>';
    }
    return out;
  }

  function buildHeaderSwitch() {
    var host = document.querySelector('.site-header .header-inner');
    if (!host) return;
    var wrap = document.createElement('div');
    wrap.className = 'lang-switch';
    wrap.innerHTML = '<button type="button" class="lang-btn" aria-haspopup="true" aria-expanded="false">' + GLOBE +
      '<span class="lang-current">KO</span>' + CARET + '</button><div class="lang-menu" hidden>' + optionButtons() + '</div>';
    var toggle = host.querySelector('.nav-toggle');
    if (toggle) host.insertBefore(wrap, toggle); else host.appendChild(wrap);

    var btn = wrap.querySelector('.lang-btn');
    var menu = wrap.querySelector('.lang-menu');
    function setOpen(open) {
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    btn.addEventListener('click', function () { setOpen(menu.hidden); });
    menu.addEventListener('click', function (e) {
      var option = e.target.closest('.lang-option');
      if (!option) return;
      setOpen(false);
      choose(option.getAttribute('data-lang'));
      btn.focus();
    });
    document.addEventListener('click', function (e) {
      if (!menu.hidden && !wrap.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) { setOpen(false); btn.focus(); }
    });
  }

  function buildMobileSwitch() {
    var nav = document.querySelector('.mobile-nav');
    if (!nav) return;
    var group = document.createElement('div');
    group.className = 'mobile-lang';
    group.setAttribute('role', 'group');
    group.innerHTML = optionButtons();
    nav.appendChild(group);
    group.addEventListener('click', function (e) {
      var option = e.target.closest('.lang-option');
      if (option) choose(option.getAttribute('data-lang'));
    });
  }

  function updateSwitchers() {
    var i;
    var options = document.querySelectorAll('.lang-option');
    for (i = 0; i < options.length; i++) {
      options[i].setAttribute('aria-pressed', options[i].getAttribute('data-lang') === current ? 'true' : 'false');
    }
    var codes = document.querySelectorAll('.lang-current');
    for (i = 0; i < codes.length; i++) codes[i].textContent = CODES[current];
    var buttons = document.querySelectorAll('.lang-btn');
    for (i = 0; i < buttons.length; i++) buttons[i].setAttribute('aria-label', LABEL[current] + ': ' + LANGS[current]);
    var groups = document.querySelectorAll('.mobile-lang');
    for (i = 0; i < groups.length; i++) groups[i].setAttribute('aria-label', LABEL[current]);
  }

  capture();
  buildHeaderSwitch();
  buildMobileSwitch();
  apply(detect());

  window.OBI18N = {
    get lang() { return current; },
    languages: LANGS,
    t: function (key) { return lookup(current, key); },
    set: choose
  };
})();
