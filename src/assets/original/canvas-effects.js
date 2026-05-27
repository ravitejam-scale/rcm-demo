
(() => {
  const c = document.getElementById('bg-canvas');
  const ctx = c.getContext('2d');
  let w, h, pts = [], mouse = { x: -999, y: -999 };
  const GRID = 60, CONNECT = 120;

  window._bgResize = resize;
  function resize() {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    pts = [];
    for (let x = 0; x < w + GRID; x += GRID) {
      for (let y = 0; y < h + GRID; y += GRID) {
        pts.push({
          ox: x, oy: y, x, y,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15
        });
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    // update positions
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      const dx = p.x - p.ox, dy = p.y - p.oy;
      if (Math.abs(dx) > 12) p.vx *= -1;
      if (Math.abs(dy) > 12) p.vy *= -1;
    }
    // draw connections
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < CONNECT) {
          const a = (1 - d / CONNECT) * 0.12;
          ctx.strokeStyle = `rgba(100,120,200,${a * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }
    // draw dots
    for (const p of pts) {
      const md = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      const glow = md < 150 ? (1 - md / 150) * 0.5 : 0;
      ctx.fillStyle = `rgba(100,120,200,${0.08 + glow * 0.3})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.2 + glow * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  resize();
  draw();
})();

// ═══ SHIELD CONSTELLATION — Unified Shield Ring ═══
(() => {
  const cv = document.getElementById('shield-constellation');
  if (!cv) return;
  const cx = cv.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  let t = 0;

  // 4 segments forming ONE unified protective ring
  const segments = [
    { label: ['Operations', 'Analytics'],     color: '91,156,246',  startAngle: -Math.PI/2, endAngle: 0 },
    { label: ['Denial', 'Shield'],     color: '164,122,245', startAngle: 0,          endAngle: Math.PI/2 },
    { label: ['Front Desk', 'Shield'], color: '245,183,74',  startAngle: Math.PI/2,  endAngle: Math.PI },
    { label: ['Revenue', 'Shield'],    color: '74,232,160',  startAngle: Math.PI,    endAngle: 3*Math.PI/2 }
  ];

  // Incoming threats from all directions
  const crosses = [];
  for (let i = 0; i < 15; i++) {
    crosses.push({
      angle: Math.random() * Math.PI * 2,
      progress: i / 15,
      speed: 0.002 + Math.random() * 0.002,
      size: 6 + Math.random() * 4
    });
  }

  function getSegColorAtAngle(angle) {
    const a = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const shifted = a < Math.PI * 1.5 ? a + Math.PI / 2 : a - Math.PI * 1.5;
    return segments[Math.floor(shifted / (Math.PI / 2)) % 4].color;
  }

  window._constellationResize = resize;
  function resize() {
    const rect = cv.getBoundingClientRect();
    cv.width = rect.width * dpr;
    cv.height = rect.height * dpr;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawHospital(x, y, size) {
    cx.save(); cx.translate(x, y);
    const s = size;
    cx.fillStyle = 'rgba(10,12,35,0.12)';
    cx.strokeStyle = 'rgba(10,12,35,0.6)';
    cx.lineWidth = 1.2;
    cx.beginPath(); cx.rect(-s*0.45, -s*0.3, s*0.9, s*0.65); cx.fill(); cx.stroke();
    cx.beginPath();
    cx.moveTo(-s*0.55, -s*0.3); cx.lineTo(0, -s*0.6); cx.lineTo(s*0.55, -s*0.3); cx.closePath();
    cx.fillStyle = 'rgba(20,20,40,0.03)'; cx.fill(); cx.stroke();
    cx.strokeStyle = 'rgba(91,156,246,0.9)'; cx.lineWidth = 2;
    cx.beginPath();
    cx.moveTo(0, -s*0.18); cx.lineTo(0, s*0.12);
    cx.moveTo(-s*0.15, -s*0.03); cx.lineTo(s*0.15, -s*0.03);
    cx.stroke();
    cx.fillStyle = 'rgba(245,183,74,0.35)';
    [[-s*0.25, s*0.06], [s*0.12, s*0.06], [-s*0.25, s*0.19], [s*0.12, s*0.19]].forEach(([wx,wy]) => {
      cx.fillRect(wx, wy, s*0.1, s*0.08);
    });
    cx.restore();
  }

  function draw() {
    const W = cv.width / dpr, H = cv.height / dpr;
    const cX = W / 2, cY = H / 2;
    const R = Math.min(W, H) / 2;
    const shieldR = R * 0.60;
    const ringW  = R * 0.08;
    t++;
    cx.clearRect(0, 0, W, H);
    const pulse = 0.85 + 0.15 * Math.sin(t * 0.025);

    // ── Outer danger zone ──
    const dangerGrad = cx.createRadialGradient(cX, cY, shieldR, cX, cY, R);
    dangerGrad.addColorStop(0, 'rgba(244,63,94,0.04)');
    dangerGrad.addColorStop(1, 'rgba(244,63,94,0.08)');
    cx.fillStyle = dangerGrad;
    cx.beginPath(); cx.arc(cX, cY, R, 0, Math.PI * 2); cx.fill();

    // ── Inner safe zone ──
    const safeGrad = cx.createRadialGradient(cX, cY, 0, cX, cY, shieldR - ringW);
    safeGrad.addColorStop(0, 'rgba(41,121,245,0.18)');
    safeGrad.addColorStop(0.45, 'rgba(14,188,120,0.12)');
    safeGrad.addColorStop(1, 'transparent');
    cx.fillStyle = safeGrad;
    cx.beginPath(); cx.arc(cX, cY, shieldR - ringW, 0, Math.PI * 2); cx.fill();

    // ── Ripples inward from ring ──
    for (let r = 0; r < 3; r++) {
      const ph = ((t * 0.008 + r / 3) % 1);
      const rR = (shieldR - ringW) * (1 - ph * 0.88);
      cx.strokeStyle = `rgba(41,121,245,${(1 - ph) * 0.2})`;
      cx.lineWidth = 1;
      cx.beginPath(); cx.arc(cX, cY, rR, 0, Math.PI * 2); cx.stroke();
    }

    // ── Dashed outer threat perimeter ──
    cx.strokeStyle = `rgba(244,63,94,${0.07 + 0.03 * Math.sin(t * 0.015)})`;
    cx.lineWidth = 0.8; cx.setLineDash([3, 7]);
    cx.beginPath(); cx.arc(cX, cY, R * 0.88, 0, Math.PI * 2); cx.stroke();
    cx.setLineDash([]);

    // ── UNIFIED SHIELD RING — 4 colored segments ──
    const gap = 0.045;
    segments.forEach((seg, i) => {
      const sA = seg.startAngle + gap;
      const eA = seg.endAngle - gap;
      const midA = (seg.startAngle + seg.endAngle) / 2;
      const segPulse = pulse + 0.1 * Math.sin(t * 0.02 + i * 1.3);

      // Wide outer glow halo
      cx.beginPath(); cx.arc(cX, cY, shieldR, sA, eA);
      cx.lineWidth = ringW * 3;
      cx.strokeStyle = `rgba(${seg.color},${0.18 * segPulse})`;
      cx.stroke();

      // Main ring body
      cx.beginPath(); cx.arc(cX, cY, shieldR, sA, eA);
      cx.lineWidth = ringW;
      cx.strokeStyle = `rgba(${seg.color},${0.65 * segPulse})`;
      cx.stroke();

      // Inner bright edge
      cx.beginPath(); cx.arc(cX, cY, shieldR - ringW * 0.38, sA, eA);
      cx.lineWidth = 1.8;
      cx.strokeStyle = `rgba(${seg.color},${1.0 * segPulse})`;
      cx.stroke();

      // Outer bright edge
      cx.beginPath(); cx.arc(cX, cY, shieldR + ringW * 0.38, sA, eA);
      cx.lineWidth = 1;
      cx.strokeStyle = `rgba(${seg.color},${0.75 * segPulse})`;
      cx.stroke();

      // Moving energy pulse along the arc
      const arcLen = Math.PI / 2;
      const pulsePos = sA + ((t * 0.006 + i * 0.25) % 1) * arcLen;
      if (pulsePos < eA) {
        const ex = cX + Math.cos(pulsePos) * shieldR;
        const ey = cY + Math.sin(pulsePos) * shieldR;
        const eg = cx.createRadialGradient(ex, ey, 0, ex, ey, ringW * 1.2);
        eg.addColorStop(0, `rgba(${seg.color},0.5)`);
        eg.addColorStop(1, 'transparent');
        cx.fillStyle = eg;
        cx.beginPath(); cx.arc(ex, ey, ringW * 1.2, 0, Math.PI * 2); cx.fill();
      }

      // Connector rivet at join points
      const joinA = seg.startAngle + gap * 0.5;
      const rx = cX + Math.cos(joinA) * shieldR;
      const ry = cY + Math.sin(joinA) * shieldR;
      const rg = cx.createRadialGradient(rx, ry, 0, rx, ry, ringW * 0.55);
      rg.addColorStop(0, `rgba(255,255,255,0.5)`);
      rg.addColorStop(1, 'transparent');
      cx.fillStyle = rg;
      cx.beginPath(); cx.arc(rx, ry, ringW * 0.55, 0, Math.PI * 2); cx.fill();

      // Label outside the ring
      const labelR = shieldR + ringW * 0.5 + R * 0.16;
      const lx = cX + Math.cos(midA) * labelR;
      const ly = cY + Math.sin(midA) * labelR;
      const fs  = Math.max(R * 0.065, 8);
      const lh  = fs * 1.3;
      cx.fillStyle = `rgba(${seg.color},0.92)`;
      cx.font = `700 ${fs}px 'Plus Jakarta Sans', sans-serif`;
      cx.textAlign = 'center'; cx.textBaseline = 'middle';
      seg.label.forEach((word, wi) => {
        cx.fillText(word, lx, ly + (wi - (seg.label.length - 1) / 2) * lh);
      });
    });

    // ── THREATS approaching the unified ring ──
    crosses.forEach(f => {
      f.progress += f.speed;
      if (f.progress > 1) {
        f.progress = 0;
        f.angle = Math.random() * Math.PI * 2;
        f.size  = 8 + Math.random() * 5;
      }
      const outerR  = R * 0.95;
      const targetR = shieldR;

      if (f.progress < 0.65) {
        const p  = f.progress / 0.65;
        const cr = outerR - (outerR - targetR) * p;
        const px = cX + Math.cos(f.angle) * cr;
        const py = cY + Math.sin(f.angle) * cr;
        const alpha = p < 0.1 ? p / 0.1 : 0.5;
        const sz = f.size * (0.5 + p * 0.5);
        cx.strokeStyle = `rgba(244,63,94,${alpha * 0.8})`;
        cx.lineWidth = 1.5; cx.lineCap = 'round';
        cx.beginPath(); cx.moveTo(px - sz/2, py - sz/2); cx.lineTo(px + sz/2, py + sz/2); cx.stroke();
        cx.beginPath(); cx.moveTo(px + sz/2, py - sz/2); cx.lineTo(px - sz/2, py + sz/2); cx.stroke();
        cx.fillStyle = `rgba(244,63,94,${alpha * 0.1})`;
        cx.beginPath(); cx.arc(px, py, sz, 0, Math.PI * 2); cx.fill();
      } else if (f.progress < 0.78) {
        const p  = (f.progress - 0.65) / 0.13;
        const px = cX + Math.cos(f.angle) * targetR;
        const py = cY + Math.sin(f.angle) * targetR;
        const sc = getSegColorAtAngle(f.angle);
        const flashR = 5 + p * 18;
        const grad = cx.createRadialGradient(px, py, 0, px, py, flashR);
        grad.addColorStop(0, `rgba(${sc},${(1-p) * 0.75})`);
        grad.addColorStop(0.3, `rgba(255,255,255,${(1-p) * 0.3})`);
        grad.addColorStop(1, 'transparent');
        cx.fillStyle = grad;
        cx.beginPath(); cx.arc(px, py, flashR, 0, Math.PI * 2); cx.fill();
        for (let k = 0; k < 5; k++) {
          const sa = f.angle + Math.PI + (k - 2) * 0.35;
          const sd = 3 + p * 14;
          cx.fillStyle = `rgba(${sc},${(1-p) * 0.8})`;
          cx.beginPath(); cx.arc(px + Math.cos(sa)*sd, py + Math.sin(sa)*sd, 1.5*(1-p), 0, Math.PI*2); cx.fill();
        }
      }
    });

    // ── Central safe glow ──
    const cGlow = cx.createRadialGradient(cX, cY, 0, cX, cY, R * 0.26);
    cGlow.addColorStop(0, `rgba(74,232,160,${0.07 * pulse})`);
    cGlow.addColorStop(0.5, `rgba(91,156,246,${0.04 * pulse})`);
    cGlow.addColorStop(1, 'transparent');
    cx.fillStyle = cGlow;
    cx.beginPath(); cx.arc(cX, cY, R * 0.26, 0, Math.PI * 2); cx.fill();

    // ── Hospital ──
    drawHospital(cX, cY, R * 0.2);

    // ── Center label ──
    cx.fillStyle = `rgba(5,6,20,${0.75 + 0.12 * pulse})`;
    cx.font = `600 ${Math.max(R * 0.058, 8)}px 'Plus Jakarta Sans', sans-serif`;
    cx.textAlign = 'center'; cx.textBaseline = 'top';
    cx.fillText('Protected', cX, cY + R * 0.2);

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();




