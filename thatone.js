/* ============================================================
   JMB://2077 — SYSTEM SCRIPTS
   ============================================================ */

/* ---- 1. RED MATRIX RAIN BACKGROUND ---- */
(function () {
  const canvas = document.getElementById('matrix');
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
      // brighter head, dimmer trail
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

/* ---- 2. SCROLL REVEAL + SKILL BARS ---- */
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();

/* ---- 3. TYPEWRITER FOR ABOUT TERMINAL ---- */
(function () {
  const lines = document.querySelectorAll('.type-text');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      const el = entry.target;
      const full = el.dataset.text;
      let i = 0;
      el.textContent = '';
      function type() {
        if (i <= full.length) {
          el.textContent = full.slice(0, i);
          i++;
          setTimeout(type, full[i - 1] === '.' ? 120 : 18);
        }
      }
      type();
    });
  }, { threshold: 0.5 });
  lines.forEach((l) => io.observe(l));
})();

/* ---- 4. PROJECTS TERMINAL BOOT SEQUENCE ---- */
(function () {
  const box = document.querySelector('.projects-terminal');
  const bootLines = box.querySelectorAll('.boot-line');
  const extras = box.querySelectorAll('.na-line, .na-big, .na-sub');
  bootLines.forEach((l) => (l.style.opacity = '0'));
  extras.forEach((l) => (l.style.opacity = '0'));

  const io = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    let delay = 0;
    bootLines.forEach((l) => {
      setTimeout(() => { l.style.transition = 'opacity 0.3s'; l.style.opacity = '1'; }, delay);
      delay += 650;
    });
    setTimeout(() => {
      extras.forEach((l) => { l.style.transition = 'opacity 0.5s'; l.style.opacity = '1'; });
    }, delay + 200);
  }, { threshold: 0.4 });
  io.observe(box);
})();

/* ---- 5. N/A GLITCH TYPE-IN ---- */
(function () {
  const el = document.getElementById('naType');
  const io = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    const target = 'N / A';
    const scramble = '#/\|<>_01';
    let frame = 0;
    const iv = setInterval(() => {
      frame++;
      let out = '';
      for (let i = 0; i < target.length; i++) {
        out += frame > i * 6 + 8 ? target[i] : scramble[Math.floor(Math.random() * scramble.length)];
      }
      el.textContent = out;
      if (frame > target.length * 6 + 12) { el.textContent = target; clearInterval(iv); }
    }, 45);
  }, { threshold: 0.5 });
  io.observe(el);
})();

/* ---- 6. RANDOM GLITCH FLICKER ON SECTION TITLES ---- */
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