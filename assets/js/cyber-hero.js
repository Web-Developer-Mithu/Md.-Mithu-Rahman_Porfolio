/**
 * CYBER DEVELOPER HERO - SCRIPT
 * Generative Code-Sketch Drawing ("ঘষে ঘষে ড্রয়িং"), Electric Lightning & 3D Tilt
 */

document.addEventListener('DOMContentLoaded', () => {
  initCyberBackground();
  initCyberSketchAnimation();
  initCyber3DTilt();
});

/* --------------------------------------------------------------
   1. Interactive Cyber Background Particle Canvas
-------------------------------------------------------------- */
function initCyberBackground() {
  const canvas = document.getElementById('hero-bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 14000), 65);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? 'rgba(0, 240, 255, ' : 'rgba(112, 0, 255, '
    });
  }

  let mouse = { x: null, y: null, radius: 120 };
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function renderBg() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Mouse attraction / deflection
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.7)';
      ctx.fill();

      // Connecting lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const alpha = 0.16 * (1 - dist / 100);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(renderBg);
  }
  renderBg();
}

/* --------------------------------------------------------------
   2. Generative Code-Sketch ("ঘষে ঘষে ড্রয়িং") & Electric Animation
-------------------------------------------------------------- */
function initCyberSketchAnimation() {
  const container = document.getElementById('cyber-image-container');
  const canvas = document.getElementById('cyber-canvas-overlay');
  const img = document.getElementById('cyber-portrait-img');
  const stylus = document.getElementById('cyber-stylus');
  const statusTag = document.getElementById('hud-progress-tag');
  const replayBtn = document.getElementById('replay-avatar-btn');

  if (!container || !canvas || !img) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  function resizeCanvas() {
    width = canvas.width = container.offsetWidth;
    height = canvas.height = container.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Animation configuration
  let startTime = null;
  const drawDuration = 5000; // 5 seconds for complete sketch & development
  let animFrameId = null;

  // Code snippets emitted by the sketching pen
  const codeWords = ['<div>', 'const', '{...}', '=>', 'function', 'class', '0101', 'return', 'async', 'import', 'state', 'props', 'laravel', 'react'];
  
  // Sketch stroke paths (Outline points + hatching paths across face & body)
  const drawnStrokes = [];
  const sparks = [];
  const codeParticles = [];

  // Shockwave ring on completion
  let shockwave = null;

  // Electric Lightning generator
  function drawLightning(x1, y1, x2, y2, displacement, iteration, color, coreColor) {
    if (iteration === 0) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.8;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.stroke();

      // White-hot core
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = coreColor || '#ffffff';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 0;
      ctx.stroke();
      return;
    }

    const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * displacement;
    const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * displacement;

    drawLightning(x1, y1, midX, midY, displacement / 1.7, iteration - 1, color, coreColor);
    drawLightning(midX, midY, x2, y2, displacement / 1.7, iteration - 1, color, coreColor);
  }

  function addSparks(x, y, count) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4.5 + 1.5;
      sparks.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: Math.random() * 0.05 + 0.03,
        color: Math.random() > 0.3 ? '#00f0ff' : '#ffffff'
      });
    }
  }

  function addCodeParticle(x, y) {
    const text = codeWords[Math.floor(Math.random() * codeWords.length)];
    codeParticles.push({
      x: x + (Math.random() - 0.5) * 15,
      y: y + (Math.random() - 0.5) * 15,
      text: text,
      vx: (Math.random() - 0.5) * 1.5,
      vy: -Math.random() * 1.8 - 0.6,
      opacity: 1,
      decay: 0.03,
      size: Math.floor(Math.random() * 3 + 10)
    });
  }

  // Pre-generate sketching path pattern (Outlines + cross-hatching strokes)
  function getStylusPosition(progress) {
    const cx = width * 0.5;
    const cy = height * 0.45;

    // Phase 1: Outline contour tracing (0 -> 0.25)
    if (progress < 0.25) {
      const p = progress / 0.25;
      const angle = p * Math.PI * 4;
      const rx = width * 0.32;
      const ry = height * 0.38;
      return {
        x: cx + Math.cos(angle) * rx * (0.8 + 0.2 * Math.sin(p * 8)),
        y: cy + Math.sin(angle) * ry
      };
    }

    // Phase 2: Rapid back-and-forth cross-hatching / "ঘষে ঘষে স্কেচ করা" (0.25 -> 0.85)
    const hatchP = (progress - 0.25) / 0.6;
    // Sweeps from top (head) to bottom (waist/chest) while zigzagging across
    const curY = height * 0.12 + hatchP * (height * 0.78);
    // Fast zigzag frequency to simulate pencil/stylus sketching
    const zigzag = Math.sin(hatchP * Math.PI * 32);
    // Variable stroke width based on body contour
    const span = width * 0.38 * (0.6 + 0.4 * Math.sin(hatchP * Math.PI));
    const curX = cx + zigzag * span;

    return { x: curX, y: curY };
  }

  function startAnimation() {
    startTime = performance.now();
    drawnStrokes.length = 0;
    sparks.length = 0;
    codeParticles.length = 0;
    shockwave = null;

    img.classList.remove('compiled');
    img.style.filter = 'grayscale(100%) brightness(0.1) contrast(200%)';
    img.style.opacity = '0.12';

    if (stylus) stylus.classList.add('active');

    if (animFrameId) cancelAnimationFrame(animFrameId);
    loop();
  }

  let prevPos = null;

  function loop(currentTime) {
    if (!currentTime) currentTime = performance.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / drawDuration, 1);

    ctx.clearRect(0, 0, width, height);

    // Update HUD Status Text
    if (statusTag) {
      if (progress < 0.25) {
        statusTag.textContent = `PHASE 1: TRACING OUTLINES [${Math.floor(progress * 100)}%]`;
        statusTag.style.color = '#00f0ff';
      } else if (progress < 0.85) {
        statusTag.textContent = `PHASE 2: CODE-SKETCHING [${Math.floor(progress * 100)}%]`;
        statusTag.style.color = '#ffbd2e';
      } else if (progress < 1) {
        statusTag.textContent = `PHASE 3: COMPILING AVATAR [${Math.floor(progress * 100)}%]`;
        statusTag.style.color = '#00ff88';
      } else {
        statusTag.textContent = `SYS.STATUS: ONLINE // VERIFIED`;
        statusTag.style.color = '#00f0ff';
      }
    }

    // Active Drawing Phase (progress < 0.88)
    if (progress < 0.88) {
      const pos = getStylusPosition(progress);

      // Move Stylus DOM Indicator
      if (stylus) {
        stylus.style.left = `${pos.x}px`;
        stylus.style.top = `${pos.y}px`;
      }

      // Record sketch stroke
      if (prevPos) {
        drawnStrokes.push({
          x1: prevPos.x,
          y1: prevPos.y,
          x2: pos.x,
          y2: pos.y,
          alpha: 1,
          color: Math.random() > 0.3 ? '#00f0ff' : '#ffffff'
        });
      }
      prevPos = pos;

      // Emit sparks from pen tip
      addSparks(pos.x, pos.y, 4);

      // Emit floating code fragments
      if (Math.random() < 0.35) {
        addCodeParticle(pos.x, pos.y);
      }

      // Electric lightning bolt surges between stylus and edges
      if (Math.random() < 0.28) {
        const edgeX = Math.random() > 0.5 ? 0 : width;
        const edgeY = Math.random() * height;
        const color = Math.random() > 0.4 ? '#00f0ff' : '#9b51e0';
        drawLightning(pos.x, pos.y, edgeX, edgeY, 35, 4, color, '#ffffff');
      }

      // Progressive Image Development ("ঘষে ঘষে ইমেজ প্রকাশ")
      const devProgress = Math.max(0, (progress - 0.15) / 0.72);
      img.style.filter = `grayscale(${Math.max(0, 100 - devProgress * 100)}%) brightness(${0.15 + devProgress * 0.9}) contrast(${200 - devProgress * 90}%)`;
      img.style.opacity = `${0.15 + devProgress * 0.85}`;

    } else {
      // Completed Drawing: Fade out stylus
      if (stylus && stylus.classList.contains('active')) {
        stylus.classList.remove('active');
        // Trigger completion shockwave
        shockwave = { radius: 10, maxRadius: width * 0.7, opacity: 1 };
        addSparks(width / 2, height / 2, 28);
      }

      // Final HD Image state
      if (!img.classList.contains('compiled')) {
        img.classList.add('compiled');
        img.style.filter = '';
        img.style.opacity = '';
      }

      // Idle subtle lightning every few moments
      if (Math.random() < 0.03) {
        const x1 = Math.random() * width;
        const y1 = Math.random() * (height * 0.3);
        const x2 = width * 0.2 + Math.random() * (width * 0.6);
        const y2 = height * 0.3 + Math.random() * (height * 0.6);
        drawLightning(x1, y1, x2, y2, 40, 4, '#00f0ff', '#ffffff');
        addSparks(x2, y2, 5);
      }
    }

    // Render & fade accumulated sketch strokes
    for (let i = drawnStrokes.length - 1; i >= 0; i--) {
      const stroke = drawnStrokes[i];
      stroke.alpha -= progress < 0.88 ? 0.008 : 0.035;

      if (stroke.alpha <= 0) {
        drawnStrokes.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.moveTo(stroke.x1, stroke.y1);
      ctx.lineTo(stroke.x2, stroke.y2);
      ctx.strokeStyle = `rgba(0, 240, 255, ${stroke.alpha * 0.75})`;
      ctx.lineWidth = 1.6;
      ctx.stroke();
    }

    // Render floating code particles
    ctx.font = '12px "Courier New", monospace';
    for (let i = codeParticles.length - 1; i >= 0; i--) {
      const cp = codeParticles[i];
      cp.x += cp.vx;
      cp.y += cp.vy;
      cp.opacity -= cp.decay;

      if (cp.opacity <= 0) {
        codeParticles.splice(i, 1);
        continue;
      }

      ctx.fillStyle = `rgba(0, 240, 255, ${cp.opacity * 0.9})`;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 8;
      ctx.fillText(cp.text, cp.x, cp.y);
    }
    ctx.shadowBlur = 0;

    // Render and update sparks
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.life -= s.decay;

      if (s.life <= 0) {
        sparks.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.life * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 8;
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Render shockwave on finish
    if (shockwave && shockwave.opacity > 0) {
      shockwave.radius += (shockwave.maxRadius - shockwave.radius) * 0.15;
      shockwave.opacity -= 0.04;

      ctx.beginPath();
      ctx.arc(width / 2, height / 2, shockwave.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 240, 255, ${Math.max(0, shockwave.opacity)})`;
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    animFrameId = requestAnimationFrame(loop);
  }

  // Start sequence on load
  setTimeout(startAnimation, 350);

  // Replay Button listener
  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      startAnimation();
    });
  }
}

/* --------------------------------------------------------------
   3. Interactive 3D Parallax Tilt Effect on Avatar Card
-------------------------------------------------------------- */
function initCyber3DTilt() {
  const card = document.getElementById('cyber-avatar-card');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
}
