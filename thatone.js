/* ============================================================
   JMB://2077 — SYSTEM SCRIPTS v4.1
   Boot intro / SPA transitions / matrix rain / reveals
   ============================================================ */

/* ---- 0. PAGE NAVIGATION (same tab + cyberpunk transition) ---- */
(function () {
  const overlay = document.getElementById('transition');
  const label = document.getElementById('tLabel');
  const pages = document.querySelectorAll('.page');
  const nav = document.getElementById('mainNav');
  const boot = document.getElementById('bootIntro');
  let current = 'hero';
  let busy = false;

  const labels = {
    hero: 'LOADING HOME SECTOR...',
    about: 'DECRYPTING BIOGRAPHY FILE...',
    skills: 'LOADING SKILL MODULES...',
    projects: 'ACCESSING PROJECT ARCHIVE...',
    connect: 'OPENING UPLINK CHANNEL...'
  };

  function activate(name) {
    pages.forEach((p) => p.classList.toggle('active', p.id === 'page-' + name));
    current = name;
    // re-trigger reveal animations for the new page
    document.querySelectorAll('#page-' + name + ' .reveal').forEach((el) => {
      el.classList.remove('visible');
      void el.offsetWidth; // reflow to restart animation
    });
    requestAnimationFrame(() => {
      observeReveals('#page-' + name);
      runTypers('#page-' + name);
    });
    window.scrollTo(0, 0);
  }

  window.navigateTo = function (name) {
    if (busy || name === current || !labels[name]) return;
    busy = true;
    label.textContent = labels[name];
    overlay.classList.remove('play');
    void overlay.offsetWidth;
    overlay.classList.add('play');
    // swap page mid-transition, while bars cover the screen
    setTimeout(() => activate(name), 280);
    setTimeout(() => {
      overlay.classList.remove('play');
      busy = false;
    }, 800);
  };

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-page]');
    if (!t) return;
    e.preventDefault();
    navigateTo(t.dataset.page);
  });

  /* ---- BOOT SEQUENCE ---- */
  const log = document.getElementById('bootLog');
  const enter = document.getElementById('bootEnter');
  const lines = [
    { t: 'JMB://2077 NETRUNNER BIOS v4.1', c: 'b-bold' },
    { t: '> CHECKING MEMORY ................ OK [16GB NEURAL]', c: '' },
    { t: '> LOADING COMBAT PROTOCOLS ....... OK', c: '' },
    { t: '> VERIFYING USER IDENTITY ........ <span class="b-red">MATCH FOUND</span>', c: '' },
    { t: '> LOCATION: CABUYAO, LAGUNA, PH', c: '' },
    { t: '> DETERMINATION LEVELS ........... <span class="b-red">MAXIMUM</span>', c: '' },
    { t: '> WARNING: FREEDOM PROTOCOL ...... <span class="b-warn">PENDING</span>', c: '' },
    { t: '> ACCESS GRANTED. WELCOME, JOHN MATTEO.', c: 'b-ok' }
  ];

  let li = 0;
  function bootLine() {
    if (li < lines.length) {
      const div = document.createElement('div');
      div.className = lines[li].c;
      div.innerHTML = lines[li].t;
      log.appendChild(div);
      li++;
      setTimeout(bootLine, 380);
    } else {
      enter.classList.add('show');
    }
  }
  setTimeout(bootLine, 500);

  function enterSite() {
    if (!boot || boot.classList.contains('hidden')) return;
    boot.classList.add('glitch-out');
    setTimeout(() => {
      boot.classList.add('hidden');
      nav.style.display = 'flex';
      activate('hero');
    }, 550);
  }
  boot.addEventListener('click', enterSite);
  document.addEventListener('keydown', function onKey(e) {
    if (e.key === 'Enter' && boot && !boot.classList.contains('hidden')) {
      enterSite();
    }
  });
})();

/* ---- 1. RED MATRIX RAIN BACKGROUND ---- */
(function () {
  const canvas = document.getElementById('matrix');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let cols, drops;
  const chars = 'アイウエオカキクケコサシスセソ01<>{}[]#$%&JMB2077';

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    cols = Math.floor(canvas.width / 18);
    drops = Array(cols).fill(0).map(() => Math.random() * -100);
  }
  window.addEventListener('resize', resize);
  resize();

  function draw() {
    ctx.fillStyle = 'rgba(6, 6, 10, 0.14)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '15px monospace';
    for (let i = 0; i < cols; i++) {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      const x = i * 18;
      const y = drops[i] * 18;
      ctx.fillStyle = Math.random() > 0.97 ? '#ff99b0' : '#ff003c';
      ctx.globalAlpha = Math.random() > 0.97 ? 1 : 0.55;
      ctx.fillText(ch, x, y);
      ctx.globalAlpha = 1;
      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ---- 2. SCROLL REVEAL (per page) ---- */
let revealObserver = null;
function observeReveals(scope) {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
  }
  document.querySelectorAll(scope + ' .reveal:not(.visible)').forEach((el) => revealObserver.observe(el));
}

/* ---- 3. TYPEWRITER FOR ABOUT TERMINAL ---- */
let typeObserver = null;
function runTypers(scope) {
  if (!typeObserver) {
    typeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        typeObserver.unobserve(entry.target);
        const el = entry.target;
        if (el.dataset.done) return;
        el.dataset.done = '1';
        const full = el.dataset.text;
        let i = 0;
        el.textContent = '';
        (function type() {
          if (i <= full.length) {
            el.textContent = full.slice(0, i);
            i++;
            setTimeout(type, full[i - 1] === '.' ? 120 : 18);
          }
        })();
      });
    }, { threshold: 0.3 });
  }
  document.querySelectorAll(scope + ' .type-text').forEach((l) => typeObserver.observe(l));
}

/* ---- 4. RANDOM GLITCH FLICKER ON SECTION TITLES ---- */
(function () {
  document.querySelectorAll('.section-title').forEach((t) => {
    setInterval(() => {
      if (Math.random() > 0.93) {
        t.style.transform = 'translateX(' + (Math.random() * 6 - 3) + 'px)';
        setTimeout(() => (t.style.transform = ''), 90);
      }
    }, 1400);
  });
})();
