/**
 * CYBER DEVELOPER HERO - SCRIPT (CODE COMPILATION SHOWCASE)
 * Real-time Compiler Engine, Code Typography Contours, Binary Shading & Progressive Art Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  initCyberBackground();
  initRealCodeSketchAnimation();
  initCyber3DTilt();
});

/* --------------------------------------------------------------
   1. Interactive Cyber Background Particle Canvas (Lightweight)
-------------------------------------------------------------- */
function initCyberBackground() {
  const canvas = document.getElementById('hero-bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });

  const isMobile = window.innerWidth <= 768;
  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.parentElement.offsetHeight || window.innerHeight);

  let isVisible = true;
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.1 });
  observer.observe(canvas.parentElement);

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }, 150);
  }, { passive: true });

  const particleCount = isMobile ? 18 : 45;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.8 + 1,
      color: Math.random() > 0.4 ? 'rgba(0, 240, 255, ' : 'rgba(112, 0, 255, '
    });
  }

  let mouse = { x: null, y: null, radius: 100 };
  if (!isMobile) {
    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }, { passive: true });
    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });
  }

  function renderBg() {
    if (!isVisible || document.hidden) {
      requestAnimationFrame(renderBg);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      if (!isMobile && mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.2;
          p.y -= (dy / dist) * force * 1.2;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.6)';
      ctx.fill();

      // Connecting lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < (isMobile ? 70 : 90)) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const alpha = 0.14 * (1 - dist / (isMobile ? 70 : 90));
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(renderBg);
  }
  renderBg();
}

/* --------------------------------------------------------------
   2. 99%+ Real Code Compilation & Progressive Art Reveal
-------------------------------------------------------------- */
function initRealCodeSketchAnimation() {
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
  let width, height;

  function resizeCanvas() {
    width = canvas.width = container.offsetWidth;
    height = canvas.height = container.offsetHeight;
  }
  resizeCanvas();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 150);
  }, { passive: true });

  // Raw sketch contours (Strictly sorted from top to bottom)
  const sketchData = window.MITHU_SKETCH_DATA || { width: 446, height: 565, strokes: [], shading: [] };
  const rawW = sketchData.width || 446;
  const rawH = sketchData.height || 565;
  const totalStrokes = sketchData.strokes.length;
  const totalShading = sketchData.shading.length;

  // Real programming code syntax strings rendered along the contours & body
  const codeStrings = [
    'const mithu = new Developer();',
    'function compileAvatar() {',
    '  renderSunglasses({ uv: 400 });',
    '  buildKurtaCollar({ gold: true });',
    '  mountWatch({ live: true });',
    '  return <FullStackDev />;',
    '}',
    '<div class="mithu-core" />',
    'import { Laravel, React } from "mithu";',
    '$dev->setRole("Full Stack Pro");',
    'async function generateFace() => {',
    'const status = "ONLINE_2026";',
    '01011001 01100101 01110011'
  ];

  const codeTokens = ['const', 'let', 'div', '{}', '()', '=>', 'fn', 'php', 'react', '0101', 'class', 'import', 'return', 'await'];

  // Matrix drops in the unrevealed zone
  const matrixCols = isMobile ? 14 : 22;
  const matrixDrops = Array.from({ length: matrixCols }, () => Math.random() * -20);

  // Animation timeline configuration
  const animDuration = isMobile ? 4400 : 5000;
  let startTime = null;
  let animFrameId = null;

  // State
  const sparks = [];
  const floatingDust = [];
  const activeCodeLabels = [];
  let shockwave = null;
  let hasTriggeredGlint = false;
  let isCardVisible = true;

  const cardObserver = new IntersectionObserver((entries) => {
    isCardVisible = entries[0].isIntersecting;
  }, { threshold: 0.1 });
  cardObserver.observe(container);

  // Electric Lightning generator
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

  function addSparks(x, y, count) {
    const finalCount = isMobile ? Math.ceil(count * 0.6) : count;
    for (let i = 0; i < finalCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.2;
      sparks.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: Math.random() * 0.05 + 0.03,
        color: Math.random() > 0.3 ? '#00f0ff' : '#00ff88'
      });
    }
  }

  function addFloatingDust() {
    if (floatingDust.length > (isMobile ? 12 : 25)) return;
    floatingDust.push({
      x: Math.random() * width,
      y: height + 5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.8 - 0.3,
      size: Math.random() * 1.6 + 0.8,
      opacity: 0.85,
      decay: 0.009,
      color: Math.random() > 0.4 ? '#00f0ff' : '#00ff88'
    });
  }

  function startAnimation() {
    startTime = performance.now();
    sparks.length = 0;
    floatingDust.length = 0;
    activeCodeLabels.length = 0;
    shockwave = null;
    hasTriggeredGlint = false;

    // Reset image to 100% hidden at bottom
    img.classList.remove('compiled');
    img.style.clipPath = 'inset(0 0 100% 0)';
    img.style.opacity = '1';

    if (stylus) stylus.classList.add('active');
    if (seamLine) seamLine.classList.add('active');
    if (sunglassGlint) sunglassGlint.classList.remove('shine');

    if (animFrameId) cancelAnimationFrame(animFrameId);
    loop();
  }

  function loop(currentTime) {
    if (!currentTime) currentTime = performance.now();

    if (!isCardVisible || document.hidden) {
      animFrameId = requestAnimationFrame(loop);
      return;
    }

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / animDuration, 1);

    ctx.clearRect(0, 0, width, height);

    const scaleX = width / rawW;
    const scaleY = height / rawH;

    // Active Drawing Phase: 0 -> 0.82
    const strokeLimit = Math.min(Math.floor((progress / 0.82) * totalStrokes), totalStrokes);
    let lastPenX = width * 0.5;
    let lastPenY = 0;

    // 1. Draw Real Contours from Top to Bottom
    ctx.lineWidth = 1.25;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 0; i < strokeLimit; i++) {
      const stroke = sketchData.strokes[i];
      if (!stroke || stroke.length < 2) continue;

      ctx.beginPath();
      const startX = stroke[0][0] * scaleX;
      const startY = stroke[0][1] * scaleY;
      ctx.moveTo(startX, startY);

      for (let j = 1; j < stroke.length; j++) {
        const px = stroke[j][0] * scaleX;
        const py = stroke[j][1] * scaleY;
        ctx.lineTo(px, py);

        if (i === strokeLimit - 1 && j === stroke.length - 1) {
          lastPenX = px;
          lastPenY = py;
        }
      }

      const strokeAlpha = progress < 0.85 ? 0.85 : 0.2;
      ctx.strokeStyle = `rgba(0, 240, 255, ${strokeAlpha})`;
      ctx.stroke();
    }

    // 2. Render Code Shading on Sunglasses and Hair (Real binary & code blocks!)
    if (totalShading > 0) {
      const shadeLimit = Math.min(Math.floor((progress / 0.82) * totalShading), totalShading);
      ctx.font = 'bold 8.5px "Courier New", monospace';
      ctx.fillStyle = progress < 0.85 ? '#00f0ff' : 'rgba(0, 240, 255, 0.2)';

      for (let k = 0; k < shadeLimit; k++) {
        const sp = sketchData.shading[k];
        const sx = sp[0] * scaleX;
        const sy = sp[1] * scaleY;

        // Render code tokens directly inside sunglasses and hair!
        const codeChar = (k % 4 === 0) ? '{1}' : (k % 4 === 1) ? '<0>' : (k % 4 === 2) ? 'PHP' : 'DEV';
        ctx.fillText(codeChar, sx - 4, sy + 3);
      }
    }

    // 3. Progressive Reveal Synchronized to Pen Y Position
    if (progress < 0.82) {
      const currentRevealY = Math.max(0, Math.min(height, lastPenY + 6));
      const bottomCutoff = Math.max(0, 100 - (currentRevealY / height) * 100);
      const ratio = currentRevealY / height;

      // Clip image so ONLY the code-drawn portion is visible!
      img.style.clipPath = `inset(0 0 ${bottomCutoff.toFixed(1)}% 0)`;

      // Stylus positioning
      if (stylus) {
        stylus.style.left = `${lastPenX}px`;
        stylus.style.top = `${lastPenY}px`;
      }

      // Drawing seam positioning
      if (seamLine) {
        seamLine.style.top = `${currentRevealY}px`;
      }

      // Live Compiler Log & Floating Code Tag updates
      if (codeLogText && beamTag) {
        if (ratio < 0.20) {
          codeLogText.textContent = `> [COMPILING]: renderHair({ style: 'slick', color: 'dark' });`;
          beamTag.textContent = `<hair: compiling />`;
        } else if (ratio < 0.35) {
          codeLogText.textContent = `> [COMPILING]: mountSunglasses({ polarize: true, uv: 400 });`;
          beamTag.textContent = `<sunglasses: wayfarer />`;
        } else if (ratio < 0.50) {
          codeLogText.textContent = `> [COMPILING]: constructFaceMesh({ eyes: 'focused', beard: 'sharp' });`;
          beamTag.textContent = `<face: contours />`;
        } else if (ratio < 0.70) {
          codeLogText.textContent = `> [COMPILING]: buildKurtaCollar({ embroidery: 'gold', buttons: 3 });`;
          beamTag.textContent = `<collar: embroidery />`;
        } else if (ratio < 0.85) {
          codeLogText.textContent = `> [COMPILING]: renderHandsAndWatch({ wrist: 'metallic_watch' });`;
          beamTag.textContent = `<hands: watch />`;
        } else {
          codeLogText.textContent = `> [COMPILING]: linkFullStack({ Laravel, React, Node, PHP });`;
          beamTag.textContent = `<stack: fullstack />`;
        }
      }

      // HUD Percentage
      if (statusTag) {
        const renderPct = Math.min(100, Math.floor((progress / 0.82) * 100));
        statusTag.textContent = `CODE COMPILING [${renderPct}%]`;
        statusTag.style.color = '#00f0ff';
      }

      // 4. Matrix Code Waterfall in the Unrevealed Zone (Below the seam!)
      ctx.font = 'bold 9px "Courier New", monospace';
      ctx.fillStyle = 'rgba(0, 255, 136, 0.45)';
      const colStep = width / matrixCols;

      for (let m = 0; m < matrixCols; m++) {
        const charX = m * colStep;
        matrixDrops[m] += 3;
        const charY = currentRevealY + (matrixDrops[m] % Math.max(30, height - currentRevealY));

        if (charY > currentRevealY && charY < height) {
          const char = Math.random() > 0.5 ? '1' : '0';
          ctx.fillText(char, charX, charY);
        }
      }

      // 5. Code Stream Strings floating off the active seam
      if (Math.random() < 0.4) {
        activeCodeLabels.push({
          x: Math.max(10, Math.min(width - 70, lastPenX + (Math.random() - 0.5) * 60)),
          y: currentRevealY + (Math.random() - 0.5) * 12,
          text: codeTokens[Math.floor(Math.random() * codeTokens.length)],
          opacity: 1,
          decay: 0.035
        });
      }

      // Sparks & Lightning
      addSparks(lastPenX, lastPenY, 3);

      if (Math.random() < (isMobile ? 0.25 : 0.38)) {
        const seamX1 = Math.max(0, lastPenX - 60);
        const seamX2 = Math.min(width, lastPenX + 60);
        drawLightning(seamX1, currentRevealY, seamX2, currentRevealY, 12, 3, '#00f0ff', '#ffffff');
      }

      // Sunglasses Glint trigger
      if (currentRevealY > height * 0.28 && !hasTriggeredGlint && sunglassGlint) {
        hasTriggeredGlint = true;
        sunglassGlint.classList.add('shine');
        addSparks(width * 0.52, currentRevealY, 14);
      }

    } else {
      // Completed Art
      img.style.clipPath = 'inset(0 0 0% 0)';

      if (!img.classList.contains('compiled')) {
        img.classList.add('compiled');
        shockwave = { radius: 10, maxRadius: width * 0.85, opacity: 1 };
        addSparks(width / 2, height / 2, 25);
      }

      if (stylus && stylus.classList.contains('active')) {
        stylus.classList.remove('active');
      }

      if (seamLine && seamLine.classList.contains('active')) {
        seamLine.classList.remove('active');
      }

      if (statusTag) {
        statusTag.innerHTML = `<span style="color:#00ff88">✔ SYS.ONLINE // 99.8% VERIFIED</span>`;
      }

      if (codeLogText) {
        codeLogText.innerHTML = `<span style="color:#00ff88">&gt; [SUCCESS]: 100% COMPILED // MITHU RAHMAN READY</span>`;
      }

      if (Math.random() < 0.2) {
        addFloatingDust();
      }

      if (Math.random() < (isMobile ? 0.02 : 0.03)) {
        const s1 = sketchData.strokes[Math.floor(Math.random() * totalStrokes)];
        const s2 = sketchData.strokes[Math.floor(Math.random() * totalStrokes)];
        if (s1 && s2 && s1.length > 0 && s2.length > 0) {
          const p1 = s1[0];
          const p2 = s2[0];
          drawLightning(p1[0] * scaleX, p1[1] * scaleY, p2[0] * scaleX, p2[1] * scaleY, 24, 3, '#00f0ff', '#ffffff');
          addSparks(p2[0] * scaleX, p2[1] * scaleY, 3);
        }
      }
    }

    // 6. Render Floating Dust Particles
    for (let d = floatingDust.length - 1; d >= 0; d--) {
      const dust = floatingDust[d];
      dust.x += dust.vx;
      dust.y += dust.vy;
      dust.opacity -= dust.decay;

      if (dust.opacity <= 0) {
        floatingDust.splice(d, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(dust.x, dust.y, dust.size, 0, Math.PI * 2);
      ctx.fillStyle = dust.color;
      ctx.globalAlpha = dust.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // 7. Render Floating Code Tokens along the Seam
    ctx.font = 'bold 9.5px "Courier New", monospace';
    for (let l = activeCodeLabels.length - 1; l >= 0; l--) {
      const lbl = activeCodeLabels[l];
      lbl.opacity -= lbl.decay;
      if (lbl.opacity <= 0) {
        activeCodeLabels.splice(l, 1);
        continue;
      }

      ctx.fillStyle = `rgba(0, 240, 255, ${lbl.opacity})`;
      ctx.fillText(lbl.text, lbl.x, lbl.y);
    }

    // 8. Render & update Sparks
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
      ctx.arc(sp.x, sp.y, sp.life * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = sp.color;
      ctx.fill();
    }

    // 9. Shockwave on completion
    if (shockwave && shockwave.opacity > 0) {
      shockwave.radius += (shockwave.maxRadius - shockwave.radius) * 0.16;
      shockwave.opacity -= 0.04;

      ctx.beginPath();
      ctx.arc(width / 2, height / 2, shockwave.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 240, 255, ${Math.max(0, shockwave.opacity)})`;
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    animFrameId = requestAnimationFrame(loop);
  }

  // Fast start
  setTimeout(startAnimation, 200);

  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      startAnimation();
    });
  }
}

/* --------------------------------------------------------------
   3. Interactive 3D Parallax Tilt Effect on Avatar Card (Desktop Only)
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

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
}
