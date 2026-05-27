
/* ═══ v57 stat counter ═══ */
(function() {
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    if (!target) return;
    const start = performance.now();
    const duration = 2200;
    const fmt = n => '$' + Math.round(n).toLocaleString();
    function frame(t) {
      const p = Math.min(1, (t - start) / duration);
      // Ease-out
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * e);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  function startCounters() {
    document.querySelectorAll('#v57-stat-recovered').forEach(animateCounter);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(startCounters, 1100));
  } else {
    setTimeout(startCounters, 1100);
  }
})();

/* ═══ v57 ROI calculator ═══ */
(function() {
  function fmtDollar(v) {
    if (v >= 1e6) return '$' + (v/1e6).toFixed(2) + 'M';
    if (v >= 1e3) return '$' + Math.round(v/1e3) + 'K';
    return '$' + Math.round(v);
  }
  function fmtComma(n) { return Math.round(n).toLocaleString(); }
  function recompute() {
    const claims = parseFloat(document.getElementById('roi-claims')?.value || 100000);
    const denial = parseFloat(document.getElementById('roi-denial')?.value || 20);
    const dar    = parseFloat(document.getElementById('roi-dar')?.value || 50);

    // Annual recovery: recoverable denials × avg charge × recovery factor
    const targetDenial = 6;
    const recoverableDenials = claims * Math.max(0, (denial - targetDenial)) / 100;
    const avgCharge = 534;
    const recoveryFactor = 0.65;
    const recovery = recoverableDenials * avgCharge * recoveryFactor;

    // Cash unlock: days saved × daily charges
    const targetDar = 40;
    const daysSaved = Math.max(0, dar - targetDar);
    const annualCharges = claims * avgCharge;
    const dailyCharges = annualCharges / 365;
    const cashUnlock = daysSaved * dailyCharges;

    const cv = document.getElementById('roi-claims-val'); if (cv) cv.textContent = fmtComma(claims);
    const dv = document.getElementById('roi-denial-val'); if (dv) dv.textContent = denial.toFixed(1);
    const av = document.getElementById('roi-dar-val'); if (av) av.textContent = Math.round(dar);
    const rv = document.getElementById('roi-result'); if (rv) rv.textContent = fmtDollar(recovery);
    const cu = document.getElementById('roi-cash'); if (cu) cu.textContent = fmtDollar(cashUnlock);
  }
  function wire() {
    ['roi-claims', 'roi-denial', 'roi-dar'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', recompute);
    });
    recompute();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else { wire(); }
})();

/* ═══ v57 personalized greeting — keep in sync with DEMO_CONFIG ═══ */
(function() {
  function syncGreeting() {
    if (!window.DEMO_CONFIG) return;
    const name = window.DEMO_CONFIG.CLIENT_SHORT || 'your team';
    document.querySelectorAll('.greet-client').forEach(el => { el.textContent = name; });
    document.querySelectorAll('.v57-counter-client').forEach(el => { el.textContent = name; });
  }
  // Patch applyDemoConfig to also resync greeting
  const orig = window.applyDemoConfig;
  if (typeof orig === 'function') {
    window.applyDemoConfig = function() {
      const r = orig.apply(this, arguments);
      try { syncGreeting(); } catch(e) {}
      return r;
    };
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncGreeting);
  } else { syncGreeting(); }
})();
