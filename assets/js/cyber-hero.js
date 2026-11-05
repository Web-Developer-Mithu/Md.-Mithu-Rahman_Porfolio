/**
 * CYBER DEVELOPER HERO - SCRIPT (MOBILE-OPTIMIZED RETINA ENGINE)
 * Features:
 * 1. Frame-accumulated progress engine - animation NEVER gets skipped even if mobile thread is slow
 * 2. Disabled background canvas on mobile (100% GPU dedicated to avatar)
 * 3. Dynamic container layout auto-sync
 * 4. 1:1 hardware cached rendering for locked 60 FPS
 * 5. Spotless crystal-clear photo reveal with zero line residue
 */

document.addEventListener('DOMContentLoaded', () => {
  initCyberBackground();
  initCodeElementAssembly();
  initCyber3DTilt();
  initFloatingCodeParallax();
});

/* --------------------------------------------------------------
   1. Interactive Cyber Background (Desktop only for max mobile speed)
-------------------------------------------------------------- */
function initCyberBackground() {
  const isMobile = window.innerWidth <= 768;
  const canvas = document.getElementById('hero-bg-canvas');
  if (!canvas) return;

  // On mobile, completely turn off background canvas to ensure maximum FPS for avatar
  if (isMobile) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d', { alpha: true });
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  let cssWidth = canvas.parentElement.offsetWidth;
  let cssHeight = canvas.parentElement.offsetHeight || window.innerHeight;

  function resizeBg() {
    cssWidth = canvas.parentElement.offsetWidth;
    cssHeight = canvas.parentElement.offsetHeight || window.innerHeight;
    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);
    canvas.style.width = cssWidth + 'px';
    canvas.style.height = cssHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resizeBg();

  let isVisible = true;
  let bgAnimId = null;

  const observer = new IntersectionObserver((entries) => {
    const wasVisible = isVisible;
    isVisible = entries[0].isIntersecting;
    if (isVisible && !wasVisible && !bgAnimId) {
      bgAnimId = requestAnimationFrame(renderBg);
    }
  }, { threshold: 0.05 });
  observer.observe(canvas.parentElement);

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeBg, 150);
  }, { passive: true });

  const particleCount = 16;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * cssWidth,
      y: Math.random() * cssHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.6 + 0.8,
      color: Math.random() > 0.4 ? 'rgba(0, 240, 255, ' : 'rgba(112, 0, 255, '
    });
  }

  const ambientGlyphs = ['</>', '{}', '=>', '0101', 'fn()', 'const', 'php', 'npm', 'async', 'git', 'useState'];
  const codeParticleCount = 8;
  const codeParticles = [];

  for (let i = 0; i < codeParticleCount; i++) {
    codeParticles.push({
      x: Math.random() * cssWidth,
      y: Math.random() * cssHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.35 - 0.15,
      text: ambientGlyphs[Math.floor(Math.random() * ambientGlyphs.length)],
      opacity: Math.random() * 0.18 + 0.1,
      size: Math.floor(Math.random() * 2 + 10),
      color: Math.random() > 0.5 ? 'rgba(0, 240, 255, ' : 'rgba(0, 255, 136, '
    });
  }

  let mouse = { x: null, y: null, radius: 100 };
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }, { passive: true });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function renderBg() {
    if (!isVisible || document.hidden) {
      bgAnimId = null;
      return;
    }

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    ctx.font = 'bold 11px "Courier New", monospace';
    for (let c = 0; c < codeParticles.length; c++) {
      const cp = codeParticles[c];
      cp.x += cp.vx;
      cp.y += cp.vy;

      if (cp.y < -20) cp.y = cssHeight + 10;
      if (cp.x < -30) cp.x = cssWidth + 20;
      if (cp.x > cssWidth + 30) cp.x = -20;

      ctx.fillStyle = cp.color + cp.opacity + ')';
      ctx.fillText(cp.text, cp.x, cp.y);
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > cssWidth) p.vx *= -1;
      if (p.y < 0 || p.y > cssHeight) p.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.1;
          p.y -= (dy / dist) * force * 1.1;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.6)';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 85) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const alpha = 0.12 * (1 - dist / 85);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    bgAnimId = requestAnimationFrame(renderBg);
  }
  bgAnimId = requestAnimationFrame(renderBg);
}

/* --------------------------------------------------------------
   2. Parallax Motion on Floating Code Capsules (Desktop only)
-------------------------------------------------------------- */
function initFloatingCodeParallax() {
  if (window.innerWidth <= 768) return;
  const cards = document.querySelectorAll('.floating-code-card');
  if (!cards.length) return;

  window.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 32;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 32;

    cards.forEach((card) => {
      const speed = parseFloat(card.getAttribute('data-speed')) || 0.04;
      const moveX = mouseX * speed * 20;
      const moveY = mouseY * speed * 20;
      card.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
  }, { passive: true });
}

/* --------------------------------------------------------------
   3. Digital Code-Brick Architecture Engine & Grand Photo Reveal
   (Fail-Safe Frame Accumulator & Ultra-Vibrant Syntax Engine)
-------------------------------------------------------------- */
function initCodeElementAssembly() {
  const container = document.getElementById('cyber-image-container');
  const canvas = document.getElementById('cyber-canvas-overlay');
  const img = document.getElementById('cyber-portrait-img');
  const stylus = document.getElementById('cyber-stylus');
  const seamLine = document.getElementById('energy-sweep-line');
  const beamTag = document.getElementById('code-beam-tag');
  const sunglassGlint = document.getElementById('sunglass-glint');
  const statusTag = document.getElementById('hud-progress-tag');
  const codeLogText = document.getElementById('hud-code-text');
  const replayBtn = document.getElementById('replay-avatar-btn');

  if (!container || !canvas || !img) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  const isMobile = window.innerWidth <= 768;

  // Sharpness DPR: 1.25 on mobile (lightweight, zero lag), 2.0 on desktop (crisp Retina)
  const dpr = isMobile ? 1.25 : Math.min(window.devicePixelRatio || 1, 2.0);

  let width, height;

  const cacheCanvas = document.createElement('canvas');
  const cacheCtx = cacheCanvas.getContext('2d', { alpha: true });
  let cachedBrickCount = 0;

  function resizeCanvas() {
    const rect = container.getBoundingClientRect();
    width = rect.width || container.offsetWidth || 300;
    height = rect.height || container.offsetHeight || Math.round(width * (565 / 446));

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    cacheCanvas.width = canvas.width;
    cacheCanvas.height = canvas.height;

    cacheCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cachedBrickCount = 0;
  }
  resizeCanvas();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 150);
  }, { passive: true });

  const sketchData = window.MITHU_SKETCH_DATA || { width: 446, height: 565, cells: [], strokes: [] };
  const rawW = sketchData.width || 446;
  const rawH = sketchData.height || 565;
  const cells = sketchData.cells || [];
  const strokes = sketchData.strokes || [];
  const totalCells = cells.length;
  const totalStrokes = strokes.length;

  // Ultra-vibrant, high-chroma IDE syntax tokens (Razor-sharp neon colors)
  const SYNTAX_TOKENS = [
    // 1. Keywords (Hyper Neon Hot Pink)
    { text: 'const', color: '#ff007f', border: 'rgba(255, 0, 127, 0.85)', bg: 'rgba(38, 5, 25, 0.94)' },
    { text: 'async', color: '#ff007f', border: 'rgba(255, 0, 127, 0.85)', bg: 'rgba(38, 5, 25, 0.94)' },
    { text: 'await', color: '#ff007f', border: 'rgba(255, 0, 127, 0.85)', bg: 'rgba(38, 5, 25, 0.94)' },
    { text: 'fn()',  color: '#ff007f', border: 'rgba(255, 0, 127, 0.85)', bg: 'rgba(38, 5, 25, 0.94)' },
    { text: 'class', color: '#ff007f', border: 'rgba(255, 0, 127, 0.85)', bg: 'rgba(38, 5, 25, 0.94)' },
    { text: 'ret;',  color: '#ff007f', border: 'rgba(255, 0, 127, 0.85)', bg: 'rgba(38, 5, 25, 0.94)' },

    // 2. Functions & Methods (Pure Electric Cyan)
    { text: 'init()', color: '#00f0ff', border: 'rgba(0, 240, 255, 0.85)', bg: 'rgba(3, 25, 42, 0.94)' },
    { text: 'fetch',  color: '#00f0ff', border: 'rgba(0, 240, 255, 0.85)', bg: 'rgba(3, 25, 42, 0.94)' },
    { text: 'exec()', color: '#00f0ff', border: 'rgba(0, 240, 255, 0.85)', bg: 'rgba(3, 25, 42, 0.94)' },
    { text: 'calc()', color: '#00f0ff', border: 'rgba(0, 240, 255, 0.85)', bg: 'rgba(3, 25, 42, 0.94)' },
    { text: 'sync()', color: '#00f0ff', border: 'rgba(0, 240, 255, 0.85)', bg: 'rgba(3, 25, 42, 0.94)' },

    // 3. JSX & HTML Tags (Vivid Neon Coral Orange)
    { text: '<div/>', color: '#ff6600', border: 'rgba(255, 102, 0, 0.85)', bg: 'rgba(40, 16, 5, 0.94)' },
    { text: '<Hero>', color: '#ff6600', border: 'rgba(255, 102, 0, 0.85)', bg: 'rgba(40, 16, 5, 0.94)' },
    { text: '<App/>', color: '#ff6600', border: 'rgba(255, 102, 0, 0.85)', bg: 'rgba(40, 16, 5, 0.94)' },
    { text: '<btn/>', color: '#ff6600', border: 'rgba(255, 102, 0, 0.85)', bg: 'rgba(40, 16, 5, 0.94)' },
    { text: '<tag>',  color: '#ff6600', border: 'rgba(255, 102, 0, 0.85)', bg: 'rgba(40, 16, 5, 0.94)' },

    // 4. Strings & Literals (Pure Matrix Neon Lime Green)
    { text: '"mithu"', color: '#00ff66', border: 'rgba(0, 255, 102, 0.85)', bg: 'rgba(5, 36, 18, 0.94)' },
    { text: '"cyber"', color: '#00ff66', border: 'rgba(0, 255, 102, 0.85)', bg: 'rgba(5, 36, 18, 0.94)' },
    { text: '"react"', color: '#00ff66', border: 'rgba(0, 255, 102, 0.85)', bg: 'rgba(5, 36, 18, 0.94)' },
    { text: '"node"',  color: '#00ff66', border: 'rgba(0, 255, 102, 0.85)', bg: 'rgba(5, 36, 18, 0.94)' },
    { text: '"php"',   color: '#00ff66', border: 'rgba(0, 255, 102, 0.85)', bg: 'rgba(5, 36, 18, 0.94)' },

    // 5. Numbers & Constants (High-Voltage Neon Golden Yellow)
    { text: '0x01', color: '#ffe600', border: 'rgba(255, 230, 0, 0.85)', bg: 'rgba(38, 34, 5, 0.94)' },
    { text: '100%', color: '#ffe600', border: 'rgba(255, 230, 0, 0.85)', bg: 'rgba(38, 34, 5, 0.94)' },
    { text: 'true;', color: '#ffe600', border: 'rgba(255, 230, 0, 0.85)', bg: 'rgba(38, 34, 5, 0.94)' },
    { text: '3000', color: '#ffe600', border: 'rgba(255, 230, 0, 0.85)', bg: 'rgba(38, 34, 5, 0.94)' },
    { text: '200OK', color: '#ffe600', border: 'rgba(255, 230, 0, 0.85)', bg: 'rgba(38, 34, 5, 0.94)' },

    // 6. Variables & PHP Types (Electric Neon Purple)
    { text: '$dev',   color: '#c850fe', border: 'rgba(200, 80, 254, 0.85)', bg: 'rgba(32, 10, 45, 0.94)' },
    { text: '$mithu', color: '#c850fe', border: 'rgba(200, 80, 254, 0.85)', bg: 'rgba(32, 10, 45, 0.94)' },
    { text: 'state',  color: '#c850fe', border: 'rgba(200, 80, 254, 0.85)', bg: 'rgba(32, 10, 45, 0.94)' },
    { text: 'props',  color: '#c850fe', border: 'rgba(200, 80, 254, 0.85)', bg: 'rgba(32, 10, 45, 0.94)' },
    { text: 'data',   color: '#c850fe', border: 'rgba(200, 80, 254, 0.85)', bg: 'rgba(32, 10, 45, 0.94)' },

    // 7. Operators & Braces (Pure Crisp White & Cyan)
    { text: '=>{}',   color: '#ffffff', border: 'rgba(0, 240, 255, 0.85)', bg: 'rgba(15, 25, 42, 0.94)' },
    { text: '</>',    color: '#00f0ff', border: 'rgba(0, 240, 255, 0.85)', bg: 'rgba(4, 25, 42, 0.94)' },
    { text: '{01}',   color: '#00f0ff', border: 'rgba(0, 240, 255, 0.85)', bg: 'rgba(4, 25, 42, 0.94)' },
    { text: '&&',     color: '#ffffff', border: 'rgba(255, 255, 255, 0.8)', bg: 'rgba(22, 26, 36, 0.94)' },
    { text: '[...]',  color: '#38bdf8', border: 'rgba(56, 189, 248, 0.85)', bg: 'rgba(8, 28, 44, 0.94)' }
  ];

  // Duration in milliseconds
  const animDuration = isMobile ? 3000 : 3600;

  // Fail-safe frame accumulator variables (NEVER skipped even if main thread lags)
  let lastFrameTime = null;
  let animElapsed = 0;
  let animFrameId = null;

  const sparks = [];
  let shockwave = null;
  let hasTriggeredGlint = false;
  let isCardVisible = true;

  const cardObserver = new IntersectionObserver((entries) => {
    isCardVisible = entries[0].isIntersecting;
  }, { threshold: 0.05 });
  cardObserver.observe(container);

  function drawLightning(x1, y1, x2, y2, displacement, iteration, color, coreColor) {
    if (iteration === 0) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.4;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = coreColor || '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();
      return;
    }

    const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * displacement;
    const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * displacement;

    drawLightning(x1, y1, midX, midY, displacement / 1.7, iteration - 1, color, coreColor);
    drawLightning(midX, midY, x2, y2, displacement / 1.7, iteration - 1, color, coreColor);
  }

  function addSparks(x, y, count, customColor) {
    const finalCount = isMobile ? Math.ceil(count * 0.5) : count;
    for (let i = 0; i < finalCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.5 + 1.2;
      sparks.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: Math.random() * 0.06 + 0.035,
        color: customColor || '#00f0ff'
      });
    }
  }

  function startAnimation() {
    lastFrameTime = performance.now();
    animElapsed = 0;
    sparks.length = 0;
    shockwave = null;
    hasTriggeredGlint = false;

    // Reset dimensions in case layout settled
    resizeCanvas();

    // Reset image to 100% hidden (NO photo visible during code-brick construction!)
    img.classList.remove('compiled');
    img.style.opacity = '0';
    img.style.clipPath = 'none';

    if (stylus) {
      stylus.classList.add('active');
      stylus.style.opacity = '1';
    }
    if (seamLine) {
      seamLine.classList.add('active');
      seamLine.style.opacity = '1';
      seamLine.style.top = '0px';
    }
    if (sunglassGlint) sunglassGlint.classList.remove('shine');

    if (animFrameId) cancelAnimationFrame(animFrameId);
    loop();
  }

  function loop(currentTime) {
    if (!currentTime) currentTime = performance.now();

    if (!lastFrameTime) lastFrameTime = currentTime;
    // Frame delta clamped to max 50ms so thread stalls do NOT advance animation in background!
    const delta = Math.min(Math.max(currentTime - lastFrameTime, 0), 50);
    lastFrameTime = currentTime;

    if (!isCardVisible || document.hidden) {
      animFrameId = requestAnimationFrame(loop);
      return; // Do NOT advance animation while hidden!
    }

    // Auto-sync dimensions if container settled during first 400ms
    if (animElapsed < 400) {
      const curW = container.offsetWidth;
      if (curW > 50 && Math.abs(curW - width) > 4) {
        resizeCanvas();
      }
    }

    animElapsed += delta;
    const progress = Math.min(animElapsed / animDuration, 1);

    // Clear physical canvas buffer
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    const scaleX = width / rawW;
    const scaleY = height / rawH;
    const cellW = 13.0 * scaleX;
    const cellH = 13.0 * scaleY;

    // -----------------------------------------------------------------
    // PHASE 1 (0.00 to 0.80): Multi-Color Code-Brick Architecture Construction
    // Photo is 100% HIDDEN. Razor-sharp colorful syntax bricks stack up!
    // -----------------------------------------------------------------
    if (progress < 0.80) {
      img.style.opacity = '0';
      img.style.clipPath = 'none';

      const buildProgress = progress / 0.80;
      const builtCount = Math.floor(buildProgress * totalCells);
      const currentRevealY = buildProgress * height;

      if (seamLine) {
        seamLine.style.top = `${currentRevealY}px`;
      }

      // INCREMENTAL CACHING: Render newly added bricks ONCE to cacheCanvas!
      if (builtCount > cachedBrickCount) {
        cacheCtx.textAlign = 'center';
        cacheCtx.textBaseline = 'middle';
        cacheCtx.font = 'bold 7.5px "Fira Code", "Consolas", "Courier New", monospace';

        while (cachedBrickCount < builtCount) {
          const i = cachedBrickCount;
          const c = cells[i];
          const cx = c[0] * scaleX;
          const cy = c[1] * scaleY;
          const token = SYNTAX_TOKENS[i % SYNTAX_TOKENS.length];

          // Brick masonry body
          cacheCtx.fillStyle = token.bg;
          cacheCtx.fillRect(cx - cellW / 2 + 0.6, cy - cellH / 2 + 0.6, cellW - 1.2, cellH - 1.2);

          // Brick neon syntax border
          cacheCtx.strokeStyle = token.border;
          cacheCtx.lineWidth = 1;
          cacheCtx.strokeRect(cx - cellW / 2 + 0.6, cy - cellH / 2 + 0.6, cellW - 1.2, cellH - 1.2);

          // Razor-sharp micro-code syntax token
          cacheCtx.fillStyle = token.color;
          cacheCtx.fillText(token.text, cx, cy);

          cachedBrickCount++;
        }
      }

      // BLIT all cached bricks in ONE instantaneous 1:1 hardware GPU call!
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(cacheCanvas, 0, 0);
      ctx.restore();

      // Dynamic Overlays drawn with DPR transform for crisp lines
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Draw subtle architectural blueprint wireframe strokes
      const strokeCutoff = Math.floor(buildProgress * totalStrokes);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      for (let s = 0; s < strokeCutoff; s++) {
        const pts = strokes[s];
        if (!pts || pts.length < 2) continue;
        ctx.beginPath();
        ctx.moveTo(pts[0][0] * scaleX, pts[0][1] * scaleY);
        for (let p = 1; p < pts.length; p++) {
          ctx.lineTo(pts[p][0] * scaleX, pts[p][1] * scaleY);
        }
        ctx.stroke();
      }

      // Now draw ONLY the active 6-10 newly placed snapping bricks (flashing highlight + glow)
      const recentWindow = isMobile ? 8 : 14;
      const activeStart = Math.max(0, builtCount - recentWindow);
      let latestX = width * 0.5;
      let latestY = currentRevealY;

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 7.5px "Fira Code", "Consolas", "Courier New", monospace';

      for (let i = activeStart; i < builtCount; i++) {
        const c = cells[i];
        const cx = c[0] * scaleX;
        const cy = c[1] * scaleY;
        const token = SYNTAX_TOKENS[i % SYNTAX_TOKENS.length];

        ctx.fillStyle = token.color;
        ctx.fillRect(cx - cellW / 2 + 0.6, cy - cellH / 2 + 0.6, cellW - 1.2, cellH - 1.2);

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cx - cellW / 2 + 0.6, cy - cellH / 2 + 0.6, cellW - 1.2, cellH - 1.2);

        ctx.fillStyle = '#ffffff';
        ctx.fillText(token.text, cx, cy);

        latestX = cx;
        latestY = cy;
        if (Math.random() < 0.12) {
          addSparks(cx, cy, 1, token.color);
        }
      }

      // Position stylus to follow the newest assembling code brick
      if (stylus) {
        stylus.style.left = `${latestX}px`;
        stylus.style.top = `${latestY}px`;
      }

      // Electric welding lightning at the active construction level
      if (Math.random() < (isMobile ? 0.22 : 0.35)) {
        const seamX1 = Math.max(0, latestX - 60);
        const seamX2 = Math.min(width, latestX + 60);
        const activeToken = SYNTAX_TOKENS[builtCount % SYNTAX_TOKENS.length];
        drawLightning(seamX1, currentRevealY, seamX2, currentRevealY, 10, 3, activeToken.color, '#ffffff');
      }

      ctx.restore();

      // Live Compiler Logs update with syntax-highlighted code components
      if (codeLogText && beamTag) {
        if (buildProgress < 0.18) {
          codeLogText.innerHTML = `&gt; [ARCHITECTING]: <span style="color:#ff007f">const</span> <span style="color:#00f0ff">HairMesh</span> = <span style="color:#ff6600">&lt;Voxel /&gt;</span>`;
          beamTag.innerHTML = `<span style="color:#ff007f">&lt;hair:</span> <span style="color:#00f0ff">voxel_mesh</span> <span style="color:#ff007f">/&gt;</span>`;
        } else if (buildProgress < 0.35) {
          codeLogText.innerHTML = `&gt; [ARCHITECTING]: <span style="color:#ff6600">&lt;Sunglasses</span> <span style="color:#c850fe">uv</span>=<span style="color:#00ff66">"400"</span> <span style="color:#c850fe">dark</span>={<span style="color:#ffe600">true</span>} <span style="color:#ff6600">/&gt;</span>`;
          beamTag.innerHTML = `<span style="color:#ffe600">&lt;sunglasses:</span> <span style="color:#00f0ff">wayfarer</span> <span style="color:#ffe600">/&gt;</span>`;
        } else if (buildProgress < 0.50) {
          codeLogText.innerHTML = `&gt; [ARCHITECTING]: <span style="color:#c850fe">$Mithu</span>-&gt;<span style="color:#00f0ff">renderFaceGeometry</span>(<span style="color:#ffe600">0x01</span>)`;
          beamTag.innerHTML = `<span style="color:#00ff66">&lt;face:</span> <span style="color:#00f0ff">poly_mesh</span> <span style="color:#00ff66">/&gt;</span>`;
        } else if (buildProgress < 0.70) {
          codeLogText.innerHTML = `&gt; [ARCHITECTING]: <span style="color:#ff6600">&lt;KurtaCollar</span> <span style="color:#c850fe">embroidery</span>=<span style="color:#ffe600">"GoldZari"</span> <span style="color:#ff6600">/&gt;</span>`;
          beamTag.innerHTML = `<span style="color:#ffe600">&lt;collar:</span> <span style="color:#ff007f">embroidery</span> <span style="color:#ffe600">/&gt;</span>`;
        } else {
          codeLogText.innerHTML = `&gt; [ARCHITECTING]: <span style="color:#ff007f">await</span> <span style="color:#00f0ff">FullStackFoundation</span>.<span style="color:#00f0ff">mount</span>()`;
          beamTag.innerHTML = `<span style="color:#00f0ff">&lt;core:</span> <span style="color:#c850fe">foundation</span> <span style="color:#00f0ff">/&gt;</span>`;
        }
      }

      // HUD Progress Count
      if (statusTag) {
        const renderPct = Math.min(100, Math.floor(buildProgress * 100));
        statusTag.textContent = `VOXEL BRICKS: ${builtCount}/${totalCells} [${renderPct}%]`;
        statusTag.style.color = '#00f0ff';
      }

    } else if (progress < 0.90) {
      // -----------------------------------------------------------------
      // PHASE 2 (0.80 to 0.90): Complete Multi-Color Code Architecture & Molecular Fusion
      // Entire 942-brick sculpture glowing in vibrant IDE syntax colors; electric fusion surge!
      // -----------------------------------------------------------------
      img.style.opacity = '0';
      img.style.clipPath = 'none';

      if (seamLine) seamLine.style.top = `${height}px`;
      if (stylus) stylus.style.opacity = '0';

      // Ensure all 942 bricks are cached
      if (cachedBrickCount < totalCells) {
        cacheCtx.textAlign = 'center';
        cacheCtx.textBaseline = 'middle';
        cacheCtx.font = 'bold 7.5px "Fira Code", "Consolas", "Courier New", monospace';
        while (cachedBrickCount < totalCells) {
          const i = cachedBrickCount;
          const c = cells[i];
          const cx = c[0] * scaleX;
          const cy = c[1] * scaleY;
          const token = SYNTAX_TOKENS[i % SYNTAX_TOKENS.length];
          cacheCtx.fillStyle = token.bg;
          cacheCtx.fillRect(cx - cellW / 2 + 0.6, cy - cellH / 2 + 0.6, cellW - 1.2, cellH - 1.2);
          cacheCtx.strokeStyle = token.border;
          cacheCtx.lineWidth = 1;
          cacheCtx.strokeRect(cx - cellW / 2 + 0.6, cy - cellH / 2 + 0.6, cellW - 1.2, cellH - 1.2);
          cacheCtx.fillStyle = token.color;
          cacheCtx.fillText(token.text, cx, cy);
          cachedBrickCount++;
        }
      }

      // Blit cache canvas with a subtle energy pulse
      const pulse = 0.85 + Math.sin(currentTime * 0.02) * 0.15;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = pulse;
      ctx.drawImage(cacheCanvas, 0, 0);
      ctx.restore();

      // Dynamic fusion lightning in DPR coordinates
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Draw all blueprint wireframe contours
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.55)';
      for (let s = 0; s < totalStrokes; s++) {
        const pts = strokes[s];
        if (!pts || pts.length < 2) continue;
        ctx.beginPath();
        ctx.moveTo(pts[0][0] * scaleX, pts[0][1] * scaleY);
        for (let p = 1; p < pts.length; p++) {
          ctx.lineTo(pts[p][0] * scaleX, pts[p][1] * scaleY);
        }
        ctx.stroke();
      }

      // High voltage fusion lightning surging in multi-color cyber arcs
      if (Math.random() < 0.55) {
        const idx1 = Math.floor(Math.random() * totalCells);
        const idx2 = Math.floor(Math.random() * totalCells);
        const c1 = cells[idx1];
        const c2 = cells[idx2];
        const token = SYNTAX_TOKENS[idx1 % SYNTAX_TOKENS.length];
        drawLightning(c1[0] * scaleX, c1[1] * scaleY, c2[0] * scaleX, c2[1] * scaleY, 18, 3, token.color, '#ffffff');
        addSparks(c2[0] * scaleX, c2[1] * scaleY, 2, token.color);
      }

      ctx.restore();

      if (statusTag) {
        statusTag.innerHTML = `<span style="color:#ffe600">⚡ 942/942 BLOCKS // MOLECULAR FUSION</span>`;
      }
      if (codeLogText) {
        codeLogText.innerHTML = `<span style="color:#00f0ff">&gt; [FUSION]: Synthesizing syntax-colored voxels -&gt; photo render...</span>`;
      }
      if (beamTag) {
        beamTag.textContent = `<status: molecular_fusion />`;
      }

    } else if (progress < 1.0) {
      // -----------------------------------------------------------------
      // PHASE 3 (0.90 to 1.00): Grand Materialization & Clean Transition
      // Colorful code bricks dissolve as authentic, crystal-clear photo materializes!
      // -----------------------------------------------------------------
      const transProgress = (progress - 0.90) / 0.10;

      // Real photo smoothly fades in
      img.style.opacity = `${Math.min(1, transProgress * 1.2)}`;
      img.style.clipPath = 'none';

      // Laser seam line sweeps down with dissolving wave
      if (seamLine) {
        seamLine.style.top = `${transProgress * height}px`;
        seamLine.style.opacity = `${1 - transProgress}`;
      }

      // Smoothly dissolve cacheCanvas
      const brickAlpha = Math.max(0, 1 - transProgress * 1.3);
      if (brickAlpha > 0.01) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalAlpha = brickAlpha;
        ctx.drawImage(cacheCanvas, 0, 0);
        ctx.restore();
      }

      // Trigger sunglasses lens glint
      if (transProgress >= 0.4 && !hasTriggeredGlint && sunglassGlint) {
        hasTriggeredGlint = true;
        sunglassGlint.classList.add('shine');
        ctx.save();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        addSparks(width * 0.52, height * 0.26, 16, '#ffe600');
        ctx.restore();
      }

      if (statusTag) {
        statusTag.innerHTML = `<span style="color:#00ff66">MATERIALIZING PHOTOGRAPH [${Math.floor(transProgress * 100)}%]</span>`;
      }
      if (codeLogText) {
        codeLogText.innerHTML = `<span style="color:#00ff88">&gt; [MATERIALIZATION]: Dissolving syntax voxels -&gt; Crystal-clear portrait</span>`;
      }

    } else {
      // -----------------------------------------------------------------
      // PHASE 4 (COMPLETED): 100% CRYSTAL-CLEAR PHOTO (ZERO SPIDERWEB / LINES)
      // -----------------------------------------------------------------
      img.style.opacity = '1';
      img.style.clipPath = 'none';

      if (!img.classList.contains('compiled')) {
        img.classList.add('compiled');
        shockwave = { radius: 10, maxRadius: width * 0.85, opacity: 1 };
        ctx.save();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        addSparks(width / 2, height / 2, 20, '#00f0ff');
        ctx.restore();
        if (!hasTriggeredGlint && sunglassGlint) {
          hasTriggeredGlint = true;
          sunglassGlint.classList.add('shine');
        }
      }

      if (stylus && stylus.classList.contains('active')) {
        stylus.classList.remove('active');
      }

      if (seamLine && seamLine.classList.contains('active')) {
        seamLine.classList.remove('active');
      }

      if (statusTag) {
        statusTag.innerHTML = `<span style="color:#00ff66">✔ SYS.ONLINE // 100% READY</span>`;
      }

      if (codeLogText) {
        codeLogText.innerHTML = `<span style="color:#00ff88">&gt; [DEPLOYED]: ${totalCells} CODE MODULES COMPILED // MITHU RAHMAN READY</span>`;
      }

      // Stop the animation loop 1.5s after completion to free up 100% of CPU/GPU!
      if (animElapsed > animDuration + 1500 && sparks.length === 0 && (!shockwave || shockwave.opacity <= 0)) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        if (animFrameId) {
          cancelAnimationFrame(animFrameId);
          animFrameId = null;
        }
        return; // Full stop! 0% idle CPU!
      }
    }

    // Dynamic sparks & shockwave in DPR transform
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Sparks
    for (let s = sparks.length - 1; s >= 0; s--) {
      const sp = sparks[s];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.life -= sp.decay;

      if (sp.life <= 0) {
        sparks.splice(s, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.life * 2, 0, Math.PI * 2);
      ctx.fillStyle = sp.color;
      ctx.fill();
    }

    // Completion Shockwave ring
    if (shockwave && shockwave.opacity > 0) {
      shockwave.radius += (shockwave.maxRadius - shockwave.radius) * 0.16;
      shockwave.opacity -= 0.04;

      ctx.beginPath();
      ctx.arc(width / 2, height / 2, shockwave.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 240, 255, ${Math.max(0, shockwave.opacity)})`;
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }

    ctx.restore();

    animFrameId = requestAnimationFrame(loop);
  }

  // Start immediately and also verify on window load
  setTimeout(startAnimation, 100);
  window.addEventListener('load', () => {
    if (animElapsed === 0) {
      startAnimation();
    }
  });

  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      startAnimation();
    });
  }
}

/* --------------------------------------------------------------
   4. Interactive 3D Parallax Tilt Effect on Avatar Card (Desktop Only)
-------------------------------------------------------------- */
function initCyber3DTilt() {
  if (window.innerWidth <= 768) return;
  const card = document.getElementById('cyber-avatar-card');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
}
