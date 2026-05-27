
window.DEMO_CONFIG = {
  CLIENT_NAME:       "MetroHealth Specialty Group",
  CLIENT_SHORT:      "MetroHealth",
  CLIENT_BRAND_UC:   "METROHEALTH",
  FACILITY_PRIMARY:  "MetroHealth Downtown Specialty Center",
  BILLING_ENTITY:    "MetroHealth Revenue Services LLC",
  METRO_CITY:        "Boston",
  METRO_STATE:       "MA",
  AS_OF_DATE:        "May 15, 2026",
  FISCAL_QUARTER:    "Q2 FY2026"
};

// Defaults the HTML ships with — what applyDemoConfig swaps FROM when re-running
window._DEMO_DEFAULTS = JSON.parse(JSON.stringify(window.DEMO_CONFIG));
window._DEMO_CURRENT  = JSON.parse(JSON.stringify(window.DEMO_CONFIG));

window.applyDemoConfig = function() {
  const cur = window._DEMO_CURRENT;
  const tgt = window.DEMO_CONFIG;
  // Build replacement pairs: from current values → target values
  const pairs = [];
  for (const k of Object.keys(tgt)) {
    if (cur[k] !== tgt[k]) pairs.push([cur[k], tgt[k]]);
  }
  if (!pairs.length) return 0;
  let nodeCount = 0;

  function walk(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    let node;
    while ((node = walker.nextNode())) {
      let changed = false;
      let txt = node.nodeValue;
      for (const [from, to] of pairs) {
        if (txt.indexOf(from) >= 0) { txt = txt.split(from).join(to); changed = true; }
      }
      if (changed) { node.nodeValue = txt; nodeCount++; }
    }
    // Also handle attributes that often hold visible text
    if (root.querySelectorAll) {
      root.querySelectorAll('[title],[alt],[placeholder]').forEach(el => {
        ['title','alt','placeholder'].forEach(attr => {
          const v = el.getAttribute(attr);
          if (!v) return;
          let w = v, changed = false;
          for (const [from, to] of pairs) {
            if (w.indexOf(from) >= 0) { w = w.split(from).join(to); changed = true; }
          }
          if (changed) el.setAttribute(attr, w);
        });
      });
    }
  }

  walk(document);
  // Walk iframes (same-origin via srcdoc)
  document.querySelectorAll('iframe').forEach(f => {
    try { walk(f.contentDocument); } catch(e) {}
  });

  window._DEMO_CURRENT = JSON.parse(JSON.stringify(tgt));
  return nodeCount;
};

// Hotkey Ctrl+K: open admin panel
window.addEventListener('keydown', function(e) {
  if (e.ctrlKey && (e.key === 'k' || e.key === 'K')) {
    e.preventDefault();
    const ex = document.getElementById('demo-config-admin');
    if (ex) { ex.remove(); return; }
    const panel = document.createElement('div');
    panel.id = 'demo-config-admin';
    panel.style.cssText = 'position:fixed;top:20px;right:20px;z-index:99999;width:380px;background:#0F172A;color:#F1F5F9;border-radius:10px;box-shadow:0 10px 40px rgba(0,0,0,0.5);padding:16px;font-family:system-ui;font-size:13px;';
    panel.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><strong style="font-size:14px;">Demo Client Config</strong><span style="font-size:11px;opacity:.6;">Ctrl+K to close</span></div>'
      + '<div style="opacity:.7;font-size:11px;margin-bottom:10px;">Edit client name; click Apply to swap live across all four products.</div>'
      + Object.keys(window.DEMO_CONFIG).map(k =>
          '<div style="margin-bottom:6px;"><label style="display:block;font-size:10px;opacity:.6;margin-bottom:2px;text-transform:uppercase;letter-spacing:0.06em;">' + k + '</label>'
          + '<input id="dcfg-' + k + '" value="' + (window.DEMO_CONFIG[k]||'').replace(/"/g,'&quot;') + '" style="width:100%;padding:6px 8px;background:#1E293B;border:1px solid #334155;color:#F1F5F9;border-radius:5px;font-size:12px;font-family:inherit;" /></div>'
        ).join('')
      + '<div style="display:flex;gap:8px;margin-top:10px;">'
      + '<button onclick="(function(){Object.keys(window.DEMO_CONFIG).forEach(k=>{const i=document.getElementById(\'dcfg-\'+k);if(i)window.DEMO_CONFIG[k]=i.value;});const n=window.applyDemoConfig();document.getElementById(\'dcfg-status\').textContent=\'Applied — \'+n+\' nodes updated\';})()" style="flex:1;padding:8px 12px;background:#3B82F6;color:#fff;border:none;border-radius:5px;cursor:pointer;font-weight:600;">Apply</button>'
      + '<button onclick="document.getElementById(\'demo-config-admin\').remove()" style="padding:8px 12px;background:#334155;color:#F1F5F9;border:none;border-radius:5px;cursor:pointer;">Close</button>'
      + '</div>'
      + '<div id="dcfg-status" style="margin-top:8px;font-size:11px;opacity:.7;"></div>';
    document.body.appendChild(panel);
  }
});

// Auto-apply once after each iframe loads (in case iframe replaces existing text)
window.addEventListener('load', function() {
  document.querySelectorAll('iframe').forEach(f => {
    f.addEventListener('load', () => {
      // Mark current as defaults so subsequent applyDemoConfig has a target
      if (window._DEMO_CURRENT) window._DEMO_CURRENT = JSON.parse(JSON.stringify(window._DEMO_CURRENT));
    });
  });
});
