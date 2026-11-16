/* ============================================================
   JMB://2077 — CYBERPUNK RED THEME
   Base: deep black  |  Accent: RED (#ff003c)
   ============================================================ */
:root {
  --red: #ff003c;
  --red-soft: #ff2a5c;
  --red-dark: #8f0022;
  --bg: #06060a;
  --bg-panel: #0d0d14;
  --bg-panel2: #12121c;
  --text: #e8e8f0;
  --text-dim: #8a8a99;
  --grid-line: rgba(255, 0, 60, 0.07);
  --mono: 'Courier New', 'Consolas', monospace;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Segoe UI', 'Arial', sans-serif;
  overflow-x: hidden;
}

/* ---- BACKGROUND GRID + GLOW ---- */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 42px 42px;
  pointer-events: none;
  z-index: 0;
}
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background: radial-gradient(ellipse at 50% 0%, rgba(255,0,60,0.10), transparent 60%);
  pointer-events: none;
  z-index: 0;
}

/* ---- CRT OVERLAYS ---- */
.scanlines {
  position: fixed; inset: 0; z-index: 9998; pointer-events: none;
  background: repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 3px);
  mix-blend-mode: multiply;
  animation: scanFlicker 4s infinite;
}
.vignette {
  position: fixed; inset: 0; z-index: 9997; pointer-events: none;
  box-shadow: inset 0 0 180px rgba(0,0,0,0.85);
}
@keyframes scanFlicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.85; }
  92% { opacity: 0.95; }
}

/* ============ NAV ============ */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 40px;
  background: rgba(6,6,10,0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255,0,60,0.35);
}
.nav-logo {
  font-family: var(--mono);
  font-size: 1.15rem; font-weight: bold;
  color: var(--text);
  text-shadow: 0 0 12px var(--red);
}
.nav-logo span { color: var(--red); }
.nav-links { display: flex; gap: 28px; list-style: none; }
.nav-links a {
  font-family: var(--mono); font-size: 0.85rem;
  color: var(--text-dim); text-decoration: none;
  letter-spacing: 1px; position: relative;
  transition: color 0.25s;
  cursor: pointer; user-select: none;
}
.nav-links a::after {
  content: ''; position: absolute; left: 0; bottom: -5px;
  width: 0; height: 2px; background: var(--red);
  box-shadow: 0 0 8px var(--red);
  transition: width 0.3s;
}
.nav-links a:hover { color: var(--red-soft); text-shadow: 0 0 10px var(--red); }
.nav-links a:hover::after { width: 100%; }

/* ============ HERO ============ */
.hero {
  min-height: 100vh;
  position: relative;
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  padding: 120px 40px 60px;
  z-index: 1;
}
#matrix { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.35; z-index: -1; }

.hero-frame {
  display: flex; align-items: center; gap: 60px;
  max-width: 1100px; width: 100%;
  padding: 45px 55px;
  background: rgba(13,13,20,0.75);
  border: 1px solid rgba(255,0,60,0.4);
  box-shadow: 0 0 40px rgba(255,0,60,0.15), inset 0 0 60px rgba(255,0,60,0.04);
  clip-path: polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px));
  position: relative;
}
.hero-frame::before {
  content: 'ID-0921-778-825';
  position: absolute; top: 10px; right: 40px;
  font-family: var(--mono); font-size: 0.65rem;
  color: var(--red); letter-spacing: 2px; opacity: 0.7;
}

/* profile image with glitch + scan */
.hero-img-wrap {
  position: relative; flex-shrink: 0;
  width: 300px; height: 400px;
  border: 1px solid var(--red);
  box-shadow: 0 0 30px rgba(255,0,60,0.35);
  overflow: hidden;
}
.hero-img { width: 100%; height: 100%; object-fit: cover; filter: saturate(0.85) contrast(1.08); }
.hero-img-wrap::before, .hero-img-wrap::after {
  content: attr(data-text);
  position: absolute; left: 0; width: 100%;
  font-family: var(--mono); font-size: 0.7rem; text-align: center;
  color: var(--red); letter-spacing: 3px;
  text-shadow: 0 0 8px var(--red);
  background: rgba(6,6,10,0.85);
  padding: 5px 0;
}
.hero-img-wrap::before { top: 0; }
.hero-img-wrap::after { bottom: 0; }
.img-scan {
  position: absolute; left: 0; width: 100%; height: 3px;
  background: var(--red); box-shadow: 0 0 14px var(--red);
  animation: imgScan 3.2s linear infinite;
}
@keyframes imgScan {
  0% { top: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

.hero-tag {
  font-family: var(--mono); font-size: 0.8rem;
  color: var(--red); letter-spacing: 2px;
  margin-bottom: 18px;
  animation: tagPulse 2s infinite;
}
@keyframes tagPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.55; } }

.hero-info h1 {
  font-size: clamp(1.9rem, 4.5vw, 3.4rem);
  font-weight: 900; letter-spacing: 2px; line-height: 1.1;
  margin-bottom: 16px;
}
.hero-sub {
  font-family: var(--mono); font-size: 1rem;
  color: var(--text-dim); letter-spacing: 1px;
  margin-bottom: 20px;
}
.hero-sub .sep { color: var(--red); padding: 0 8px; }
.hero-quote-mini {
  font-style: italic; color: var(--text-dim);
  font-size: 0.92rem; margin-bottom: 30px;
  border-left: 3px solid var(--red); padding-left: 14px;
}

.btn-neon {
  display: inline-block;
  font-family: var(--mono); font-weight: bold;
  color: var(--red); text-decoration: none;
  padding: 14px 34px;
  border: 2px solid var(--red);
  letter-spacing: 2px;
  position: relative; overflow: hidden;
  transition: color 0.3s, box-shadow 0.3s;
}
.btn-neon::before {
  content: ''; position: absolute; inset: 0;
  background: var(--red);
  transform: translateX(-101%);
  transition: transform 0.35s ease;
  z-index: -1;
}
.btn-neon:hover { color: #fff; box-shadow: 0 0 30px rgba(255,0,60,0.7); }
.btn-neon:hover::before { transform: translateX(0); }

.hero-bottom-bar {
  position: absolute; bottom: 0; left: 0; right: 0;
  display: flex; justify-content: space-around;
  padding: 12px 20px;
  font-family: var(--mono); font-size: 0.72rem;
  color: var(--red); letter-spacing: 1px;
  background: rgba(13,13,20,0.9);
  border-top: 1px solid rgba(255,0,60,0.35);
  animation: barGlow 3s infinite;
}
@keyframes barGlow { 0%,100% { box-shadow: 0 -2px 12px rgba(255,0,60,0.2);} 50% { box-shadow: 0 -2px 25px rgba(255,0,60,0.5);} }

/* ============ GLITCH TEXT ============ */
.glitch { position: relative; color: var(--text); }
.glitch::before, .glitch::after {
  content: attr(data-text);
  position: absolute; left: 0; top: 0;
  width: 100%; overflow: hidden;
}
.glitch::before {
  color: var(--red);
  clip-path: inset(20% 0 40% 0);
  animation: glitchA 2.8s infinite linear alternate-reverse;
}
.glitch::after {
  color: #00e5ff;
  opacity: 0.55;
  clip-path: inset(55% 0 10% 0);
  animation: glitchB 3.1s infinite linear alternate-reverse;
}
@keyframes glitchA {
  0% { clip-path: inset(10% 0 65% 0); transform: translate(-3px, -2px); }
  20% { clip-path: inset(50% 0 25% 0); transform: translate(3px, 1px); }
  40% { clip-path: inset(25% 0 55% 0); transform: translate(-2px, 2px); }
  60% { clip-path: inset(70% 0 5% 0); transform: translate(4px, -1px); }
  80% { clip-path: inset(5% 0 80% 0); transform: translate(-4px, 1px); }
  100% { clip-path: inset(35% 0 40% 0); transform: translate(2px, -2px); }
}
@keyframes glitchB {
  0% { clip-path: inset(60% 0 10% 0); transform: translate(3px, 1px); }
  25% { clip-path: inset(15% 0 60% 0); transform: translate(-3px, -1px); }
  50% { clip-path: inset(45% 0 30% 0); transform: translate(2px, 2px); }
  75% { clip-path: inset(80% 0 2% 0); transform: translate(-2px, 1px); }
  100% { clip-path: inset(30% 0 50% 0); transform: translate(3px, -2px); }
}

/* ============ SECTIONS ============ */
.section {
  position: relative; z-index: 1;
  max-width: 1150px; margin: 0 auto;
  padding: 110px 40px 60px;
}
.section-title {
  font-size: clamp(1.7rem, 3.6vw, 2.6rem);
  font-weight: 900; letter-spacing: 3px;
  margin-bottom: 8px;
}
.section-title::before {
  content: '// ';
  color: var(--red);
  text-shadow: 0 0 10px var(--red);
}
.section-sub {
  font-family: var(--mono); color: var(--text-dim);
  font-size: 0.85rem; letter-spacing: 2px;
  margin-bottom: 45px;
}

/* ---- reveal on scroll ---- */
.reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.8s ease, transform 0.8s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

/* ============ ABOUT ============ */
.about-grid {
  display: grid; grid-template-columns: 1.6fr 1fr;
  gap: 40px; align-items: stretch;
}

.terminal-box {
  background: var(--bg-panel);
  border: 1px solid rgba(255,0,60,0.35);
  box-shadow: 0 0 30px rgba(255,0,60,0.1);
}
.terminal-head {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 18px;
  background: var(--bg-panel2);
  border-bottom: 1px solid rgba(255,0,60,0.25);
  font-family: var(--mono); font-size: 0.8rem;
  color: var(--text-dim); letter-spacing: 1px;
}
.dot { width: 11px; height: 11px; border-radius: 50%; display: inline-block; }
.dot.r { background: var(--red); box-shadow: 0 0 8px var(--red); }
.dot.y { background: #ffb800; box-shadow: 0 0 8px #ffb800; }
.dot.g { background: #00e676; box-shadow: 0 0 8px #00e676; }
.terminal-body { padding: 24px 26px; font-family: var(--mono); font-size: 0.92rem; line-height: 1.75; }
.cmd { color: var(--red-soft); }
.type-text { color: var(--text-dim); margin: 6px 0 18px 14px; }
.cursor-blink { animation: blink 1s steps(1) infinite; color: var(--red); }
@keyframes blink { 50% { opacity: 0; } }

.flag-panel {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 16px; padding: 30px 20px;
  background: var(--bg-panel);
  border: 1px solid rgba(255,0,60,0.35);
  box-shadow: 0 0 30px rgba(255,0,60,0.1);
}
.flag-img {
  width: 100%; max-width: 300px;
  border: 1px solid rgba(255,255,255,0.15);
  box-shadow: 0 0 25px rgba(255,0,60,0.25);
  transition: transform 0.4s, box-shadow 0.4s;
}
.flag-img:hover { transform: scale(1.04); box-shadow: 0 0 40px rgba(255,0,60,0.5); }
.flag-cap { font-family: var(--mono); font-size: 0.78rem; color: var(--red); letter-spacing: 1px; text-align: center; }
.coordinates { font-family: var(--mono); font-size: 0.72rem; color: var(--text-dim); text-align: center; }

/* ============ SKILLS ============ */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 26px;
}
.skill-card {
  position: relative;
  height: 230px;
  perspective: 1000px;
}
.skill-face {
  position: absolute; inset: 0;
  padding: 26px 22px;
  display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 12px;
  backface-visibility: hidden;
  transition: transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1), box-shadow 0.4s;
  background: var(--bg-panel);
  border: 1px solid rgba(255,0,60,0.3);
  text-align: center;
}
.skill-card:hover .skill-face { box-shadow: 0 0 35px rgba(255,0,60,0.35); border-color: var(--red); }
.skill-front { transform: rotateY(0); }
.skill-back { transform: rotateY(180deg); background: var(--red-dark); border-color: var(--red); }
.skill-card:hover .skill-front { transform: rotateY(-180deg); }
.skill-card:hover .skill-back { transform: rotateY(0); }

.skill-icon {
  font-family: var(--mono); font-weight: bold;
  font-size: 1.9rem; color: var(--red);
  text-shadow: 0 0 14px var(--red);
}
.skill-face h3 { font-size: 0.95rem; letter-spacing: 2px; }
.skill-face p { font-size: 0.85rem; color: var(--text-dim); line-height: 1.6; }
.skill-back h3 { color: #fff; text-shadow: 0 0 10px rgba(0,0,0,0.6); }
.skill-back p { color: #ffd6e0; }

.skill-bar {
  width: 80%; height: 6px;
  background: rgba(255,255,255,0.08);
  overflow: hidden;
}
.skill-bar span {
  display: block; height: 100%; width: 0;
  background: var(--red);
  box-shadow: 0 0 10px var(--red);
  transition: width 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.skill-card.visible .skill-bar span { width: var(--lvl); }

/* ============ PROJECTS ============ */
/* ============ CONNECT ============ */
.connect-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 26px;
}
.connect-card {
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  padding: 36px 24px;
  background: var(--bg-panel);
  border: 1px solid rgba(255,0,60,0.3);
  text-decoration: none; color: var(--text); text-align: center;
  transition: transform 0.35s, box-shadow 0.35s, border-color 0.35s;
  clip-path: polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px));
}
.connect-card:hover {
  transform: translateY(-8px);
  border-color: var(--red);
  box-shadow: 0 12px 40px rgba(255,0,60,0.35);
}
.connect-icon {
  font-size: 2.2rem; color: var(--red);
  text-shadow: 0 0 16px var(--red);
}
.connect-card h3 { letter-spacing: 3px; font-size: 1rem; }
.connect-card p { font-family: var(--mono); font-size: 0.85rem; color: var(--text-dim); word-break: break-all; }
.connect-hint {
  font-family: var(--mono); font-size: 0.72rem;
  color: var(--red); letter-spacing: 2px;
  margin-top: 8px; opacity: 0;
  transition: opacity 0.3s;
}
.connect-card:hover .connect-hint { opacity: 1; }

/* ============ FOOTER ============ */
.footer {
  position: relative; z-index: 1;
  padding: 90px 40px 40px;
  text-align: center;
  border-top: 1px solid rgba(255,0,60,0.3);
  background: linear-gradient(180deg, transparent, rgba(255,0,60,0.06));
}
.quote-frame { max-width: 720px; margin: 0 auto 50px; position: relative; }
.quote-mark {
  font-size: 4rem; color: var(--red);
  text-shadow: 0 0 20px var(--red);
  line-height: 1; margin-bottom: 10px;
}
.final-quote {
  font-size: clamp(1.1rem, 2.6vw, 1.6rem);
  font-style: italic; line-height: 1.6;
  color: var(--text);
  text-shadow: 0 0 18px rgba(255,0,60,0.4);
}
.quote-sig {
  font-family: var(--mono); margin-top: 22px;
  color: var(--red); letter-spacing: 4px; font-size: 0.85rem;
}
.footer-sys {
  font-family: var(--mono); font-size: 0.7rem;
  color: var(--text-dim); letter-spacing: 2px;
  border-top: 1px dashed rgba(255,0,60,0.25);
  padding-top: 22px;
}

/* ============ RESPONSIVE ============ */
@media (max-width: 900px) {
  .hero-frame { flex-direction: column; text-align: center; gap: 36px; padding: 40px 28px; }
  .hero-img-wrap { width: 240px; height: 320px; }
  .about-grid { grid-template-columns: 1fr; }
  .nav { padding: 12px 20px; }
  .nav-links { gap: 16px; }
  .nav-links a { font-size: 0.72rem; }
  .hero-bottom-bar { flex-direction: column; gap: 6px; text-align: center; position: static; margin-top: 40px; }
  .section { padding: 80px 22px 40px; }
}

/* ============ BOOT INTRO ============ */
.intro {
  position: fixed; inset: 0; z-index: 10000;
  background: #040408;
  display: flex; justify-content: center; align-items: center;
  transition: opacity 0.7s ease;
}
.intro.hidden { opacity: 0; pointer-events: none; }
.intro-box {
  width: min(680px, 90vw);
  border: 1px solid rgba(255,0,60,0.5);
  background: rgba(13,13,20,0.95);
  box-shadow: 0 0 60px rgba(255,0,60,0.25), inset 0 0 80px rgba(255,0,60,0.05);
  padding: 30px 34px 40px;
}
.bootlog {
  font-family: var(--mono); font-size: 0.9rem; line-height: 1.9;
  color: var(--text-dim); white-space: pre-wrap; min-height: 300px;
}
.bootlog .bl-ok { color: #00e676; }
.bootlog .bl-warn { color: #ffb800; }
.bootlog .bl-red { color: var(--red-soft); text-shadow: 0 0 8px rgba(255,0,60,0.5); }
.bootlog .bl-white { color: var(--text); }
.enter-btn {
  display: none; margin: 25px auto 0;
  cursor: pointer; background: transparent;
  font-size: 1rem; animation: enterPulse 1.6s infinite;
}
.enter-btn.show { display: block; }
@keyframes enterPulse {
  0%, 100% { box-shadow: 0 0 12px rgba(255,0,60,0.4); }
  50% { box-shadow: 0 0 35px rgba(255,0,60,0.9); }
}
.intro.glitch-out { animation: introGlitchOut 0.5s steps(6) forwards; }
@keyframes introGlitchOut {
  0% { transform: none; filter: none; }
  25% { transform: translateX(-12px) skewX(4deg); filter: hue-rotate(40deg); }
  50% { transform: translateX(10px); clip-path: inset(10% 0 30% 0); }
  75% { transform: translateX(-6px) skewX(-3deg); clip-path: inset(40% 0 5% 0); }
  100% { transform: none; clip-path: none; opacity: 0; }
}

/* ============ PAGE WIPE TRANSITION ============ */
.wipe {
  position: fixed; inset: 0; z-index: 9999; pointer-events: none;
  visibility: hidden;
}
.wipe.active { visibility: visible; }
.wipe-bar {
  position: absolute; left: 0; width: 100%; height: 34%;
  background: linear-gradient(90deg, var(--red-dark), var(--red), var(--red-dark));
  transform: scaleX(0); transform-origin: left;
  box-shadow: 0 0 40px rgba(255,0,60,0.6);
}
.wipe-bar:nth-child(1) { top: 0; }
.wipe-bar:nth-child(2) { top: 33%; }
.wipe-bar:nth-child(3) { top: 66%; }
.wipe.active .wipe-bar { animation: wipeSweep 0.75s cubic-bezier(0.7, 0, 0.3, 1) forwards; }
.wipe.active .wipe-bar:nth-child(2) { animation-delay: 0.06s; }
.wipe.active .wipe-bar:nth-child(3) { animation-delay: 0.12s; }
@keyframes wipeSweep {
  0% { transform: scaleX(0); transform-origin: left; }
  45% { transform: scaleX(1); transform-origin: left; }
  55% { transform: scaleX(1); transform-origin: right; }
  100% { transform: scaleX(0); transform-origin: right; }
}
.wipe-label {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--mono); font-weight: bold;
  font-size: clamp(1rem, 3vw, 1.6rem);
  color: #fff; letter-spacing: 6px;
  text-shadow: 0 0 18px var(--red);
  opacity: 0;
}
.wipe.active .wipe-label { animation: wipeLabel 0.75s forwards; }
@keyframes wipeLabel {
  0%, 20% { opacity: 0; }
  40%, 70% { opacity: 1; }
  100% { opacity: 0; }
}

/* ============ PROJECTS ============ */
.projects-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 34px;
}
.project-card {
  background: var(--bg-panel);
  border: 1px solid rgba(255,0,60,0.35);
  transition: transform 0.4s, box-shadow 0.4s, border-color 0.4s;
  clip-path: polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 26px 100%, 0 calc(100% - 26px));
  position: relative; overflow: hidden;
}
.project-card::after {
  content: ''; position: absolute; top: 0; left: -80%;
  width: 50%; height: 100%;
  background: linear-gradient(105deg, transparent, rgba(255,0,60,0.15), transparent);
  transition: left 0.6s;
}
.project-card:hover { transform: translateY(-8px); border-color: var(--red); box-shadow: 0 16px 50px rgba(255,0,60,0.3); }
.project-card:hover::after { left: 130%; }
.project-img-wrap { position: relative; overflow: hidden; border-bottom: 1px solid rgba(255,0,60,0.35); }
.project-img {
  width: 100%; height: 240px; object-fit: cover; display: block;
  filter: saturate(0.9);
  transition: transform 0.5s, filter 0.5s;
}
.project-card:hover .project-img { transform: scale(1.06); filter: saturate(1.1); }
.project-tag {
  position: absolute; top: 14px; left: 14px;
  font-family: var(--mono); font-size: 0.68rem; letter-spacing: 2px;
  color: #fff; background: var(--red);
  padding: 5px 12px; box-shadow: 0 0 14px rgba(255,0,60,0.7);
}
.project-body { padding: 24px 24px 28px; }
.project-body h3 { font-size: 1.05rem; letter-spacing: 2px; margin-bottom: 12px; }
.project-type { color: var(--red); font-family: var(--mono); font-size: 0.72rem; font-weight: normal; }
.project-body p { font-size: 0.88rem; color: var(--text-dim); line-height: 1.65; margin-bottom: 18px; }
.project-meta { display: flex; gap: 10px; flex-wrap: wrap; }
.project-meta span {
  font-family: var(--mono); font-size: 0.66rem; letter-spacing: 1px;
  color: var(--red-soft); border: 1px solid rgba(255,0,60,0.4);
  padding: 4px 10px;
}
.projects-more {
  margin-top: 40px; text-align: center;
  font-family: var(--mono); font-size: 0.8rem;
  color: var(--text-dim); letter-spacing: 2px;
  animation: tagPulse 2.4s infinite;
}

/* body locked while intro is up */
body.locked { overflow: hidden; }


/* ============================================================
   v4.1 — BOOT INTRO / SPA PAGES / TRANSITION / PROJECTS
   ============================================================ */

/* ---- PAGES: only active page shows ---- */
.page { display: none; }
.page.active { display: block; animation: pageIn 0.5s ease; }
@keyframes pageIn {
  0% { opacity: 0; filter: brightness(3) saturate(0); }
  40% { opacity: 1; filter: brightness(1.8) saturate(0.4); }
  100% { opacity: 1; filter: brightness(1) saturate(1); }
}
[data-page] { cursor: pointer; }

/* ---- BOOT INTRO ---- */
.boot-intro {
  position: fixed; inset: 0; z-index: 10000;
  display: flex; align-items: center; justify-content: center;
  background: #040408;
  transition: opacity 0.6s, visibility 0.6s;
}
.boot-intro.hidden { opacity: 0; visibility: hidden; }
.boot-box {
  width: min(680px, 92vw);
  background: var(--bg-panel);
  border: 1px solid rgba(255,0,60,0.45);
  box-shadow: 0 0 50px rgba(255,0,60,0.2);
}
.boot-log {
  padding: 26px 28px;
  font-family: var(--mono); font-size: 0.9rem; line-height: 2;
  color: var(--text-dim);
  min-height: 280px;
}
.boot-log .b-ok { color: #00e676; }
.boot-log .b-warn { color: #ffb800; }
.boot-log .b-red { color: var(--red-soft); }
.boot-log .b-bold { color: var(--text); font-weight: bold; }
.boot-enter { padding: 0 28px 26px; display: none; }
.boot-enter.show { display: block; }
.enter-line {
  font-family: var(--mono); font-size: 0.95rem;
  color: var(--red); letter-spacing: 2px;
  text-shadow: 0 0 12px var(--red);
}
.blink-hard { animation: blink 0.9s steps(1) infinite; }
.boot-intro.glitch-out { animation: bootGlitch 0.55s steps(6) forwards; }
@keyframes bootGlitch {
  0% { clip-path: inset(0 0 0 0); transform: none; filter: none; }
  20% { clip-path: inset(15% 0 40% 0); transform: translateX(-12px); filter: hue-rotate(40deg) brightness(2); }
  40% { clip-path: inset(60% 0 5% 0); transform: translateX(14px); filter: invert(0.9); }
  60% { clip-path: inset(30% 0 30% 0); transform: translateX(-8px) scaleY(1.15); filter: brightness(3); }
  80% { clip-path: inset(5% 0 75% 0); transform: translateX(10px); filter: saturate(0); }
  100% { clip-path: inset(50% 0 50% 0); transform: scaleY(0.02); opacity: 0; }
}

/* ---- PAGE TRANSITION OVERLAY ---- */
.transition-overlay {
  position: fixed; inset: 0; z-index: 9999;
  display: flex; align-items: center; justify-content: center;
  pointer-events: none;
  visibility: hidden;
}
.transition-overlay.play { visibility: visible; }
.t-bar {
  position: absolute; left: 0; width: 100%; height: 17%;
  background: linear-gradient(90deg, var(--red-dark), var(--red), var(--red-dark));
  box-shadow: 0 0 30px rgba(255,0,60,0.8);
  transform: scaleX(0);
}
.t-bar:nth-child(1) { top: 0;    transform-origin: left; }
.t-bar:nth-child(2) { top: 16.5%; transform-origin: right; }
.t-bar:nth-child(3) { top: 33%;  transform-origin: left; }
.t-bar:nth-child(4) { top: 49.5%; transform-origin: right; }
.t-bar:nth-child(5) { top: 66%;  transform-origin: left; }
.t-bar:nth-child(6) { top: 83%;  transform-origin: right; height: 17%; }
.transition-overlay.play .t-bar { animation: barSweep 0.55s cubic-bezier(0.7, 0, 0.3, 1) forwards; }
.t-bar:nth-child(2) { animation-delay: 0.04s; }
.t-bar:nth-child(3) { animation-delay: 0.08s; }
.t-bar:nth-child(4) { animation-delay: 0.12s; }
.t-bar:nth-child(5) { animation-delay: 0.16s; }
.t-bar:nth-child(6) { animation-delay: 0.20s; }
@keyframes barSweep {
  0% { transform: scaleX(0); }
  45% { transform: scaleX(1); }
  55% { transform: scaleX(1); }
  100% { transform: scaleX(0); }
}
.t-bar:nth-child(1), .t-bar:nth-child(3), .t-bar:nth-child(5) { --sx: 0; }
.transition-overlay.play .t-bar:nth-child(1),
.transition-overlay.play .t-bar:nth-child(3),
.transition-overlay.play .t-bar:nth-child(5) { animation-name: barSweepOut; }
@keyframes barSweepOut {
  0% { transform: scaleX(0); transform-origin: left; }
  45% { transform: scaleX(1); transform-origin: left; }
  55% { transform: scaleX(1); transform-origin: right; }
  100% { transform: scaleX(0); transform-origin: right; }
}
.transition-overlay.play .t-bar:nth-child(2),
.transition-overlay.play .t-bar:nth-child(4),
.transition-overlay.play .t-bar:nth-child(6) { animation-name: barSweepOutR; }
@keyframes barSweepOutR {
  0% { transform: scaleX(0); transform-origin: right; }
  45% { transform: scaleX(1); transform-origin: right; }
  55% { transform: scaleX(1); transform-origin: left; }
  100% { transform: scaleX(0); transform-origin: left; }
}
.t-label {
  font-family: var(--mono); font-weight: bold;
  font-size: 1.1rem; letter-spacing: 6px;
  color: #fff; text-shadow: 0 0 16px var(--red);
  opacity: 0; z-index: 2;
}
.transition-overlay.play .t-label { animation: labelFlash 0.55s ease forwards; }
@keyframes labelFlash {
  0%, 100% { opacity: 0; }
  40%, 60% { opacity: 1; }
}

/* ---- PROJECTS PAGE ---- */
.projects-grid { display: flex; flex-direction: column; gap: 36px; }
.project-card {
  display: grid; grid-template-columns: 300px 1fr;
  gap: 30px; align-items: center;
  background: var(--bg-panel);
  border: 1px solid rgba(255,0,60,0.35);
  padding: 26px;
  position: relative; overflow: hidden;
  transition: border-color 0.35s, box-shadow 0.35s, transform 0.35s;
  clip-path: polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 26px 100%, 0 calc(100% - 26px));
}
.project-card::before {
  content: '';
  position: absolute; top: 0; left: -100%;
  width: 60%; height: 100%;
  background: linear-gradient(105deg, transparent, rgba(255,0,60,0.12), transparent);
  transition: left 0.7s ease;
}
.project-card:hover::before { left: 140%; }
.project-card:hover {
  border-color: var(--red);
  box-shadow: 0 0 40px rgba(255,0,60,0.3);
  transform: translateY(-4px);
}
.project-img-wrap {
  position: relative; overflow: hidden;
  border: 1px solid rgba(255,0,60,0.4);
  box-shadow: 0 0 20px rgba(255,0,60,0.2);
  aspect-ratio: 4 / 3;
}
.project-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s; }
.project-card:hover .project-img { transform: scale(1.06); }
.project-scan {
  position: absolute; left: 0; width: 100%; height: 2px;
  background: var(--red); box-shadow: 0 0 10px var(--red);
  animation: imgScan 3s linear infinite;
}
.project-id {
  font-family: var(--mono); font-size: 0.72rem;
  color: var(--red); letter-spacing: 2px; margin-bottom: 8px;
}
.project-title {
  font-size: 1.6rem; font-weight: 900; letter-spacing: 2px;
  margin-bottom: 12px;
  text-shadow: 0 0 14px rgba(255,0,60,0.5);
}
.project-desc { color: var(--text-dim); font-size: 0.92rem; line-height: 1.65; margin-bottom: 16px; }
.project-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
.project-tags span {
  font-family: var(--mono); font-size: 0.68rem; letter-spacing: 1px;
  color: var(--red-soft);
  border: 1px solid rgba(255,0,60,0.45);
  padding: 4px 10px;
}
.btn-small { padding: 10px 22px; font-size: 0.82rem; }
.cert-badge {
  display: inline-block;
  font-family: var(--mono); font-size: 0.82rem; letter-spacing: 2px;
  color: #00e676; border: 1px solid rgba(0,230,118,0.5);
  padding: 10px 22px;
  text-shadow: 0 0 10px rgba(0,230,118,0.6);
}

/* ---- RESPONSIVE additions ---- */
@media (max-width: 800px) {
  .project-card { grid-template-columns: 1fr; }
  .boot-log { font-size: 0.78rem; min-height: 240px; }
}
