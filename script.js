/* ==========================================================================
   HARSH VENNA — PORTFOLIO SCRIPT
   Vanilla JS — no dependencies
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------- Preloader ---------------- */
  window.addEventListener('load', function () {
    var pre = document.getElementById('preloader');
    setTimeout(function () {
      pre.classList.add('hidden');
      document.body.style.overflow = '';
    }, 450);
  });

  /* ---------------- Custom cursor (desktop only) ---------------- */
  var isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (!isTouch) {
    document.documentElement.classList.add('has-custom-cursor');
    var dot = document.getElementById('cursorDot');
    var ring = document.getElementById('cursorRing');
    var mx = 0, my = 0, rx = 0, ry = 0;

    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    });

    (function animateRing() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animateRing);
    })();

    document.addEventListener('mousedown', function () { dot.classList.add('pressed'); ring.classList.add('pressed'); });
    document.addEventListener('mouseup', function () { dot.classList.remove('pressed'); ring.classList.remove('pressed'); });

    document.querySelectorAll('a, button, .project-card, .skill-card, .cert-card, .case-study').forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('active'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('active'); });
    });

    document.querySelectorAll('.cs-gallery-frame').forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('view'); dot.classList.add('viewing'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('view'); dot.classList.remove('viewing'); });
    });
  }

  /* ---------------- Navbar scroll state + active link ---------------- */
  var navbar = document.getElementById('navbar');
  var sections = document.querySelectorAll('main section[id], header[id]');
  var navLinks = document.querySelectorAll('.nav-links a');

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    var scrollPos = window.scrollY + 140;
    var current = 'home';
    sections.forEach(function (sec) {
      if (scrollPos >= sec.offsetTop) current = sec.id;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });

    var backBtn = document.getElementById('backToTop');
    backBtn.classList.toggle('show', window.scrollY > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile nav toggle ---------------- */
  var navToggle = document.getElementById('navToggle');
  var navLinksWrap = document.getElementById('navLinks');
  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('open');
    navLinksWrap.classList.toggle('open');
  });
  navLinksWrap.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      navToggle.classList.remove('open');
      navLinksWrap.classList.remove('open');
    });
  });

  /* ---------------- Back to top ---------------- */
  document.getElementById('backToTop').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------- Typing animation ---------------- */
  var typingEl = document.getElementById('typingText');
  var phrases = [
    'Data Analyst',
    'Python & SQL Developer',
    'Power BI Dashboard Builder',
    'Machine Learning Enthusiast',
    'Business Insights Storyteller'
  ];
  var pIndex = 0, cIndex = 0, deleting = false;

  function typeLoop() {
    var current = phrases[pIndex];
    if (!deleting) {
      cIndex++;
      typingEl.textContent = current.slice(0, cIndex);
      if (cIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1600);
        return;
      }
    } else {
      cIndex--;
      typingEl.textContent = current.slice(0, cIndex);
      if (cIndex === 0) {
        deleting = false;
        pIndex = (pIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  typeLoop();

  /* ---------------- Scroll reveal (Intersection Observer) ---------------- */
  var revealItems = document.querySelectorAll('.reveal, .skill-row, .stagger-item');
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealItems.forEach(function (el) { revealObserver.observe(el); });

  /* ---------------- KPI counters ---------------- */
  var kpiEls = document.querySelectorAll('.kpi-num[data-count]');
  var kpiObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseFloat(el.getAttribute('data-count'));
      var valSpan = el.querySelector('.val');
      var start = 0;
      var duration = 1400;
      var startTime = null;

      function step(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);
        valSpan.textContent = current;
        if (progress < 1) requestAnimationFrame(step);
        else valSpan.textContent = target;
      }
      requestAnimationFrame(step);
      kpiObserver.unobserve(el);
    });
  }, { threshold: 0.4 });
  kpiEls.forEach(function (el) { kpiObserver.observe(el); });

  /* ---------------- Project filtering ---------------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      projectCards.forEach(function (card) {
        var cats = card.getAttribute('data-cat');
        var show = filter === 'all' || cats.indexOf(filter) !== -1;
        card.classList.toggle('hidden-item', !show);
      });
    });
  });

  /* ---------------- Contact form (frontend-only validation) ---------------- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var subject = document.getElementById('subject').value.trim();
    var message = document.getElementById('message').value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !subject || !message) {
      status.textContent = 'Please fill in all fields before sending.';
      status.className = 'form-status error';
      return;
    }
    if (!emailPattern.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      status.className = 'form-status error';
      return;
    }

    // This is a static, frontend-only site (GitHub Pages) — there is no backend to receive
    // the form. We open the visitor's email client pre-filled with their message instead.
    var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
    var mailto = 'mailto:harshvennaix@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + body;
    window.location.href = mailto;

    status.textContent = 'Opening your email client to send the message…';
    status.className = 'form-status success';
    form.reset();
  });

  /* ---------------- Contribution graph (illustrative decorative grid) ---------------- */
  var contribGrid = document.getElementById('contribGrid');
  if (contribGrid) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 52 * 7; i++) {
      var cell = document.createElement('div');
      cell.className = 'contrib-cell';
      var intensity = Math.random();
      var color = 'rgba(255,255,255,0.05)';
      if (intensity > 0.85) color = 'rgba(6,182,212,0.85)';
      else if (intensity > 0.65) color = 'rgba(6,182,212,0.55)';
      else if (intensity > 0.45) color = 'rgba(6,182,212,0.3)';
      cell.style.background = color;
      frag.appendChild(cell);
    }
    contribGrid.appendChild(frag);
  }

  /* ---------------- Reduced motion / mobile detection ---------------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isSmallScreen = window.matchMedia('(max-width: 640px)').matches;
  var allowRichMotion = !prefersReducedMotion && !isSmallScreen;

  /* ---------------- Lenis smooth scroll ---------------- */
  var lenis = null;
  if (allowRichMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    if (window.gsap && window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }
  }

  /* ---------------- Subtle GSAP scroll parallax ---------------- */
  if (allowRichMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.hero-blob').forEach(function (blob) {
      gsap.to(blob, {
        y: 60, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 }
      });
    });
  }

  /* ---------------- Ambient canvas background ---------------- */
  (function ambientBackground() {
    var canvas = document.getElementById('ambientCanvas');
    if (!canvas || isSmallScreen || prefersReducedMotion) return;
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var w, h;
    var mouseX = 0.5, mouseY = 0.4;
    var targetMouseX = 0.5, targetMouseY = 0.4;
    var running = true;

    var orbs = [
      { x: 0.18, y: 0.22, r: 0.30, hue: 'rgba(6,182,212,0.16)', dx: 0.00012, dy: 0.00009, t: 0 },
      { x: 0.82, y: 0.18, r: 0.26, hue: 'rgba(129,140,248,0.15)', dx: -0.00010, dy: 0.00011, t: 100 },
      { x: 0.5, y: 0.85, r: 0.32, hue: 'rgba(240,178,78,0.10)', dx: 0.00008, dy: -0.00010, t: 200 },
      { x: 0.85, y: 0.75, r: 0.22, hue: 'rgba(244,114,182,0.09)', dx: -0.00009, dy: -0.00008, t: 300 }
    ];

    var particles = [];
    function initParticles() {
      var count = Math.min(70, Math.floor((w * h) / 22000));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random(), y: Math.random(),
          r: Math.random() * 1.4 + 0.4,
          speed: Math.random() * 0.00006 + 0.00002,
          drift: Math.random() * Math.PI * 2,
          alpha: Math.random() * 0.35 + 0.15
        });
      }
    }

    function resize() {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();

    window.addEventListener('mousemove', function (e) {
      targetMouseX = e.clientX / w;
      targetMouseY = e.clientY / h;
    }, { passive: true });

    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running) requestAnimationFrame(draw);
    });

    function draw() {
      if (!running) return;
      mouseX += (targetMouseX - mouseX) * 0.02;
      mouseY += (targetMouseY - mouseY) * 0.02;
      ctx.clearRect(0, 0, w, h);

      orbs.forEach(function (o) {
        o.t += 1;
        var px = (o.x + Math.sin(o.t * o.dx) * 0.06 + (mouseX - 0.5) * 0.025) * w;
        var py = (o.y + Math.cos(o.t * o.dy) * 0.06 + (mouseY - 0.5) * 0.025) * h;
        var radius = o.r * Math.max(w, h);
        var grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
        grad.addColorStop(0, o.hue);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = 'rgba(255,255,255,1)';
      particles.forEach(function (p) {
        p.y -= p.speed;
        p.x += Math.sin(p.drift + p.y * 8) * 0.00006;
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  })();

  /* ---------------- Case-study galleries: dots, autoplay, tilt, lightbox ---------------- */
  (function caseStudyGalleries() {
    var captions = {
      nassau: ['Executive Overview', 'EDA & Product Insights', 'Factory Analytics', 'Monte Carlo Simulation'],
      workforce: ['Executive Overview', 'Burnout Risk Center', 'Machine Learning Hub', 'Explainable AI (SHAP)']
    };

    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxClose = document.getElementById('lightboxClose');
    function openLightbox(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    }
    function closeLightbox() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
    }
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) {
      lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });

    document.querySelectorAll('.cs-gallery-frame').forEach(function (frame) {
      var name = frame.getAttribute('data-gallery');
      var slides = frame.querySelectorAll('.gallery-slide');
      var captionEl = frame.querySelector('[data-caption-for="' + name + '"]');
      var dotsWrap = document.querySelector('[data-dots-for="' + name + '"]');
      var dots = dotsWrap ? dotsWrap.querySelectorAll('button') : [];
      var active = 0, timer = null;

      function show(idx) {
        slides.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
        dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
        if (captionEl && captions[name]) captionEl.textContent = captions[name][idx];
        active = idx;
      }
      function next() { show((active + 1) % slides.length); }
      function startAuto() {
        if (isSmallScreen || prefersReducedMotion) return;
        stopAuto();
        timer = setInterval(next, 4800);
      }
      function stopAuto() { if (timer) clearInterval(timer); }

      dots.forEach(function (d, i) {
        d.addEventListener('click', function () { show(i); startAuto(); });
      });
      frame.addEventListener('mouseenter', stopAuto);
      frame.addEventListener('mouseleave', startAuto);
      startAuto();

      /* Tasteful tilt on hover (desktop only) */
      if (allowRichMotion) {
        frame.addEventListener('mousemove', function (e) {
          var rect = frame.getBoundingClientRect();
          var px = (e.clientX - rect.left) / rect.width - 0.5;
          var py = (e.clientY - rect.top) / rect.height - 0.5;
          frame.style.transform = 'rotateY(' + (px * 5) + 'deg) rotateX(' + (py * -5) + 'deg)';
        });
        frame.addEventListener('mouseleave', function () {
          frame.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
      }

      /* Lightbox on click */
      frame.addEventListener('click', function () {
        var visible = frame.querySelector('.gallery-slide.active img');
        if (!visible) return;
        openLightbox(visible.src, visible.alt);
      });
    });
  })();

  /* ---------------- Theme toggle (dark/light, persisted) ---------------- */
  (function themeToggle() {
    var root = document.documentElement;
    var btn = document.getElementById('themeToggle');
    var stored = null;
    try { stored = localStorage.getItem('hv-theme'); } catch (e) {}
    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    var initial = stored || (prefersLight ? 'light' : 'dark');
    if (initial === 'light') root.setAttribute('data-theme', 'light');

    function setTheme(mode) {
      if (mode === 'light') root.setAttribute('data-theme', 'light');
      else root.removeAttribute('data-theme');
      try { localStorage.setItem('hv-theme', mode); } catch (e) {}
    }
    function toggle() {
      var isLight = root.getAttribute('data-theme') === 'light';
      setTheme(isLight ? 'dark' : 'light');
    }
    if (btn) btn.addEventListener('click', toggle);
    window.__hvToggleTheme = toggle;
  })();

  /* ---------------- Command palette ---------------- */
  (function commandPalette() {
    var backdrop = document.getElementById('cmdkBackdrop');
    var input = document.getElementById('cmdkInput');
    var list = document.getElementById('cmdkList');
    var trigger = document.getElementById('paletteTrigger');
    if (!backdrop || !input || !list) return;

    var items = [
      { label: 'Home', group: 'Section', icon: 'home', action: function () { go('#home'); } },
      { label: 'About', group: 'Section', icon: 'section', action: function () { go('#about'); } },
      { label: 'Skills', group: 'Section', icon: 'section', action: function () { go('#skills'); } },
      { label: 'Experience', group: 'Section', icon: 'section', action: function () { go('#experience'); } },
      { label: 'Projects & Case Studies', group: 'Section', icon: 'section', action: function () { go('#projects'); } },
      { label: 'Certificates', group: 'Section', icon: 'section', action: function () { go('#certifications'); } },
      { label: 'GitHub Activity', group: 'Section', icon: 'section', action: function () { go('#github'); } },
      { label: 'Contact', group: 'Section', icon: 'section', action: function () { go('#contact'); } },
      { label: 'Download Resume', group: 'Action', icon: 'download', action: function () { var a = document.createElement('a'); a.href = 'assets/resume/Harsh_Venna_Resume.pdf'; a.download = ''; a.click(); } },
      { label: 'Toggle light / dark theme', group: 'Action', icon: 'theme', action: function () { window.__hvToggleTheme && window.__hvToggleTheme(); } },
      { label: 'Copy email address', group: 'Action', icon: 'mail', action: function () {
          var email = 'harshvennaix@gmail.com';
          if (navigator.clipboard) navigator.clipboard.writeText(email).catch(function () {});
          showToast('Email copied — ' + email);
        } },
      { label: 'Open GitHub profile', group: 'Link', icon: 'github', action: function () { window.open('https://github.com/harshvenna', '_blank', 'noopener'); } },
      { label: 'Open LinkedIn profile', group: 'Link', icon: 'link', action: function () { window.open('https://www.linkedin.com/in/harsh-venna-a7a7a53a9', '_blank', 'noopener'); } },
      { label: 'SupplyChainAI — Nassau Candy case study', group: 'Project', icon: 'section', action: function () { go('.cs-nassau'); } },
      { label: 'Workforce Intelligence Platform case study', group: 'Project', icon: 'section', action: function () { go('.cs-workforce'); } }
    ];

    var icons = {
      home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
      section: '<circle cx="12" cy="12" r="8"/>',
      download: '<path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M5 21h14"/>',
      theme: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66 4.93 19.07M19.07 4.93 17.66 6.34"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
      github: '<path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.58.24 2.75.12 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.08.78 2.17v3.22c0 .3.21.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z"/>',
      link: '<path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07l1.49-1.49"/>'
    };

    var filtered = items.slice();
    var activeIdx = 0;

    function go(target) {
      var el = document.querySelector(target);
      if (el) {
        if (lenis) lenis.scrollTo(el, { offset: -70 });
        else el.scrollIntoView({ behavior: 'smooth' });
      }
      close();
    }

    function render() {
      list.innerHTML = '';
      if (!filtered.length) {
        list.innerHTML = '<div class="cmdk-empty">No matches. Try "projects", "resume", or "theme".</div>';
        return;
      }
      filtered.forEach(function (item, i) {
        var row = document.createElement('div');
        row.className = 'cmdk-item' + (i === activeIdx ? ' active' : '');
        row.innerHTML = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + (icons[item.icon] || icons.section) + '</svg><span>' + item.label + '</span><span class="grp">' + item.group + '</span>';
        row.addEventListener('mouseenter', function () { activeIdx = i; render(); });
        row.addEventListener('click', function () { item.action(); });
        list.appendChild(row);
      });
    }

    function filter(q) {
      q = q.trim().toLowerCase();
      filtered = !q ? items.slice() : items.filter(function (it) {
        return it.label.toLowerCase().indexOf(q) !== -1 || it.group.toLowerCase().indexOf(q) !== -1;
      });
      activeIdx = 0;
      render();
    }

    function open() {
      backdrop.classList.add('open');
      backdrop.setAttribute('aria-hidden', 'false');
      input.value = '';
      filter('');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { input.focus(); });
      });
      if (lenis) lenis.stop();
    }
    function close() {
      backdrop.classList.remove('open');
      backdrop.setAttribute('aria-hidden', 'true');
      if (lenis) lenis.start();
    }

    input.addEventListener('input', function () { filter(input.value); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); activeIdx = Math.min(activeIdx + 1, filtered.length - 1); render(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); activeIdx = Math.max(activeIdx - 1, 0); render(); }
      else if (e.key === 'Enter') { e.preventDefault(); if (filtered[activeIdx]) filtered[activeIdx].action(); }
      else if (e.key === 'Escape') { close(); }
    });
    if (trigger) trigger.addEventListener('click', open);
    backdrop.addEventListener('click', function (e) { if (e.target === backdrop) close(); });

    window.__hvOpenPalette = open;
    window.__hvCloseAllPanels = close;
  })();

  /* ---------------- Keyboard shortcuts (global) ---------------- */
  (function keyboardShortcuts() {
    var shortcutsBackdrop = document.getElementById('shortcutsBackdrop');
    var shortcutsClose = document.getElementById('shortcutsClose');
    function openShortcuts() {
      if (!shortcutsBackdrop) return;
      shortcutsBackdrop.classList.add('open');
      shortcutsBackdrop.setAttribute('aria-hidden', 'false');
    }
    function closeShortcuts() {
      if (!shortcutsBackdrop) return;
      shortcutsBackdrop.classList.remove('open');
      shortcutsBackdrop.setAttribute('aria-hidden', 'true');
    }
    if (shortcutsClose) shortcutsClose.addEventListener('click', closeShortcuts);
    if (shortcutsBackdrop) shortcutsBackdrop.addEventListener('click', function (e) { if (e.target === shortcutsBackdrop) closeShortcuts(); });

    document.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      var typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.__hvOpenPalette && window.__hvOpenPalette();
        return;
      }
      if (typing) return;

      if (e.key === '/') { e.preventDefault(); window.__hvOpenPalette && window.__hvOpenPalette(); }
      else if (e.key === '?') { openShortcuts(); }
      else if (e.key.toLowerCase() === 't') { window.__hvToggleTheme && window.__hvToggleTheme(); }
      else if (e.key === 'Escape') { closeShortcuts(); window.__hvCloseAllPanels && window.__hvCloseAllPanels(); }
    });
  })();

  /* ---------------- Toast (small transient notification) ---------------- */
  function showToast(msg) {
    var t = document.createElement('div');
    t.className = 'hv-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('show'); });
    setTimeout(function () {
      t.classList.remove('show');
      setTimeout(function () { t.remove(); }, 300);
    }, 2200);
  }

  /* ---------------- Live GitHub data (public API, progressive enhancement) ---------------- */
  (function liveGithub() {
    var USERNAME = 'harshvenna';
    var noteEl = document.getElementById('ghLiveNote');
    var repoCards = document.querySelectorAll('.repo-card[data-repo]');
    var contribImg = document.getElementById('contribImg');
    var contribGrid = document.getElementById('contribGrid');
    var contribLabel = document.getElementById('contribLabel');

    if (contribImg) {
      contribImg.src = 'https://ghchart.rshah.org/06B6D4/' + USERNAME;
      contribImg.addEventListener('load', function () {
        if (contribImg.naturalWidth > 50) {
          contribImg.style.display = 'block';
          if (contribGrid) contribGrid.style.display = 'none';
          if (contribLabel) contribLabel.textContent = 'Live contribution activity — @' + USERNAME;
        }
      });
      contribImg.addEventListener('error', function () {
        contribImg.style.display = 'none';
      });
    }

    fetch('https://api.github.com/users/' + USERNAME + '/repos?per_page=100&sort=updated')
      .then(function (r) { if (!r.ok) throw new Error('rate-limited-or-offline'); return r.json(); })
      .then(function (repos) {
        if (!Array.isArray(repos)) throw new Error('unexpected response');

        var totalStars = repos.reduce(function (sum, r) { return sum + (r.stargazers_count || 0); }, 0);
        var repoCountEl = document.getElementById('ghStatRepos');
        var starCountEl = document.getElementById('ghStatStars');
        if (repoCountEl) repoCountEl.textContent = repos.length;
        if (starCountEl) starCountEl.textContent = totalStars;

        repoCards.forEach(function (card) {
          var name = card.getAttribute('data-repo');
          var match = repos.find(function (r) { return r.name === name; });
          if (!match) return;
          var langEl = card.querySelector('.repo-lang');
          var starsEl = card.querySelector('.repo-stars');
          var updatedEl = card.querySelector('.repo-updated');
          if (langEl && match.language) langEl.textContent = match.language;
          if (starsEl) starsEl.textContent = '⭐ ' + (match.stargazers_count || 0);
          if (updatedEl && match.pushed_at) {
            var d = new Date(match.pushed_at);
            updatedEl.textContent = 'Updated ' + d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
          }
        });

        if (noteEl) noteEl.textContent = 'Live data from the GitHub API · ' + repos.length + ' public repositories';
      })
      .catch(function () {
        if (noteEl) noteEl.textContent = 'Showing cached stats — GitHub API unavailable right now';
      });
  })();

  /* ---------------- Magnetic buttons ---------------- */
  if (allowRichMotion) {
    document.querySelectorAll('.magnetic').forEach(function (btn) {
      var strength = 14;
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        btn.style.transform = 'translate(' + (px * strength) + 'px,' + (py * strength * 0.7) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = 'translate(0,0)';
      });
    });
  }

})();
