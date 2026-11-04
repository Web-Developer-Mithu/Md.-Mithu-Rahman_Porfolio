/**
 * CYBER DEVELOPER HERO - SCRIPT (OPTIMIZED FOR PERFORMANCE & MOBILE)
 * 99%+ Accurate Real Code-Sketch Drawing, Sunglass Glint, Laser Energy Sweep & Electric Climax
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
   2. 99%+ Real Code-Sketch Drawing & High-Performance Climax
-------------------------------------------------------------- */
function initRealCodeSketchAnimation() {
  const container = document.getElementById('cyber-image-container');
  const canvas = document.getElementById('cyber-canvas-overlay');
  const img = document.getElementById('cyber-portrait-img');
  const stylus = document.getElementById('cyber-stylus');
  const sweepLine = document.getElementById('energy-sweep-line');
  const sunglassGlint = document.getElementById('sunglass-glint');
  const statusTag = document.getElementById('hud-progress-tag');
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

  // Raw sketch contours from window.MITHU_SKETCH_DATA
  const sketchData = window.MITHU_SKETCH_DATA || { width: 446, height: 565, strokes: [], shading: [] };
  const rawW = sketchData.width || 446;
  const rawH = sketchData.height || 565;
  const totalStrokes = sketchData.strokes.length;
  const totalShading = sketchData.shading.length;

  const codeGlyphs = ['0', '1', '{', '}', '<', '>', '/', ';', '=', '*', '#', '$', 'const', 'dev', 'fn'];

  // Animation timeline configuration
  const animDuration = isMobile ? 4200 : 4800; // Snappier on mobile
  let startTime = null;
  let animFrameId = null;

  // State
  const sparks = [];
  const floatingDust = [];
  const activeCodeLabels = [];
  let shockwave = null;
  let hasTriggeredSweep = false;
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
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.stroke();

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
    const finalCount = isMobile ? Math.ceil(count * 0.6) : count;
    for (let i = 0; i < finalCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.8 + 1.2;
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
      color: Math.random() > 0.4 ? '#00f0ff' : '#ffffff'
    });
  }

  function startAnimation() {
    startTime = performance.now();
    sparks.length = 0;
    floatingDust.length = 0;
    activeCodeLabels.length = 0;
    shockwave = null;
    hasTriggeredSweep = false;
    hasTriggeredGlint = false;

    img.classList.remove('compiled');
    img.style.filter = 'grayscale(100%) brightness(0.08) contrast(200%)';
    img.style.opacity = '0.08';

    if (stylus) stylus.classList.add('active');
    if (sweepLine) sweepLine.classList.remove('active');
    if (sunglassGlint) sunglassGlint.classList.remove('shine');

    if (animFrameId) cancelAnimationFrame(animFrameId);
    loop();
  }

  function loop(currentTime) {
    if (!currentTime) currentTime = performance.now();

    // Pause rendering when tab or card is not visible to save 100% GPU
    if (!isCardVisible || document.hidden) {
      animFrameId = requestAnimationFrame(loop);
      return;
    }

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / animDuration, 1);

    ctx.clearRect(0, 0, width, height);

    const scaleX = width / rawW;
    const scaleY = height / rawH;

    // HUD Status Updates
    if (statusTag) {
      if (progress < 0.45) {
        statusTag.textContent = `PHASE 1: CONTOURS [${Math.floor(progress * 222)}%]`;
        statusTag.style.color = '#00f0ff';
      } else if (progress < 0.75) {
        statusTag.textContent = `PHASE 2: SHADING [${Math.floor((progress - 0.45) * 333)}%]`;
        statusTag.style.color = '#ffbd2e';
      } else if (progress < 0.95) {
        statusTag.textContent = `PHASE 3: LASER SWEEP [${Math.floor((progress - 0.75) * 500)}%]`;
        statusTag.style.color = '#00ff88';
      } else {
        statusTag.innerHTML = `<span style="color:#00ff88">✔ ONLINE // 99.8% VERIFIED</span>`;
      }
    }

    // 1. Draw Real Contours
    const strokeLimit = Math.min(Math.floor((progress / 0.75) * totalStrokes), totalStrokes);
    let lastPenX = width * 0.5;
    let lastPenY = height * 0.25;

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

      const strokeAlpha = progress < 0.85 ? 0.9 : Math.max(0.18, 1 - (progress - 0.85) * 3.5);
      ctx.strokeStyle = `rgba(0, 240, 255, ${strokeAlpha})`;
      ctx.stroke();
    }

    // 2. Code Typography along Contours
    if (progress < 0.85 && Math.random() < (isMobile ? 0.25 : 0.4) && strokeLimit > 10) {
      const randomStroke = sketchData.strokes[Math.floor(Math.random() * strokeLimit)];
      if (randomStroke && randomStroke.length > 2) {
        const randPt = randomStroke[Math.floor(Math.random() * randomStroke.length)];
        activeCodeLabels.push({
          x: randPt[0] * scaleX,
          y: randPt[1] * scaleY,
          text: codeGlyphs[Math.floor(Math.random() * codeGlyphs.length)],
          opacity: 1,
          decay: 0.04
        });
      }
    }

    // 3. Render Code Shading (Sunglasses & Hair)
    if (progress > 0.35 && totalShading > 0) {
      const shadeLimit = Math.min(Math.floor(((progress - 0.35) / 0.45) * totalShading), totalShading);
      ctx.font = '8px "Courier New", monospace';
      ctx.fillStyle = `rgba(0, 240, 255, ${progress < 0.85 ? 0.75 : 0.15})`;

      for (let k = 0; k < shadeLimit; k++) {
        const sp = sketchData.shading[k];
        const sx = sp[0] * scaleX;
        const sy = sp[1] * scaleY;
        ctx.fillText((k % 2 === 0) ? '1' : '0', sx - 2, sy + 3);

        if (progress > 0.5 && progress < 0.75 && k === shadeLimit - 1) {
          lastPenX = sx;
          lastPenY = sy;
        }
      }
    }

    // 4. Stylus Pen & Drawing Climax
    if (progress < 0.80) {
      if (stylus) {
        stylus.style.left = `${lastPenX}px`;
        stylus.style.top = `${lastPenY}px`;
      }

      addSparks(lastPenX, lastPenY, 2);

      // Electric arc from stylus tip
      if (Math.random() < (isMobile ? 0.2 : 0.32)) {
        const targetStroke = sketchData.strokes[Math.floor(Math.random() * strokeLimit)];
        if (targetStroke && targetStroke.length > 0) {
          const tPt = targetStroke[0];
          drawLightning(lastPenX, lastPenY, tPt[0] * scaleX, tPt[1] * scaleY, 22, 3, '#00f0ff', '#ffffff');
        }
      }

      const photoProgress = Math.max(0, (progress - 0.2) / 0.6);
      img.style.filter = `grayscale(${Math.max(0, 100 - photoProgress * 100)}%) brightness(${0.1 + photoProgress * 0.95}) contrast(${200 - photoProgress * 90}%)`;
      img.style.opacity = `${0.1 + photoProgress * 0.9}`;

    } else {
      // Climax Events
      if (!hasTriggeredSweep && sweepLine) {
        hasTriggeredSweep = true;
        sweepLine.classList.add('active');
        addSparks(width * 0.5, height * 0.3, 10);
      }

      if (progress >= 0.82 && !hasTriggeredGlint && sunglassGlint) {
        hasTriggeredGlint = true;
        sunglassGlint.classList.add('shine');
        addSparks(width * 0.52, height * 0.26, 12);
        drawLightning(width * 0.35, height * 0.26, width * 0.68, height * 0.26, 10, 3, '#00f0ff', '#ffffff');
      }

      if (stylus && stylus.classList.contains('active')) {
        stylus.classList.remove('active');
        shockwave = { radius: 10, maxRadius: width * 0.8, opacity: 1 };
        addSparks(width / 2, height / 2, 22);
      }

      if (!img.classList.contains('compiled')) {
        img.classList.add('compiled');
        img.style.filter = '';
        img.style.opacity = '';
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

    // 5. Floating Ambient Dust Particles
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

    // 6. Render Code Labels on Strokes
    ctx.font = '10px "Courier New", monospace';
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

    // 7. Render & update Sparks
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

    // 8. Shockwave on completion
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
  if (window.innerWidth <= 768) return; // Disable tilt on touch devices for performance & natural scrolling
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
