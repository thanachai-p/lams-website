const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

const remaining = [
  {
    target: '<div style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 4px;">',
    replace: '<div class="modal-notice-text">'
  },
  {
    target: '<a href="tel:077278873" style="color: var(--theme-amber); text-decoration: underline;">',
    replace: '<a href="tel:077278873" class="link-amber-underline">'
  },
  {
    target: '<div id="campusVideoBadge" style="padding: 4px 10px; border-radius: 999px; font-size: 0.78rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; background: rgba(220, 38, 38, 0.2); color: var(--theme-amber); white-space: nowrap;">',
    replace: '<div id="campusVideoBadge" class="video-modal-tag">'
  },
  {
    target: '<button id="closeCampusVideoModal" type="button" aria-label="ปิดหน้าต่างวิดีโอ" style="background: rgba(255,255,255,0.08); border: none; color: var(--text-primary); width: 36px; height: 36px; border-radius: 50%; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0;">',
    replace: '<button id="closeCampusVideoModal" type="button" aria-label="ปิดหน้าต่างวิดีโอ" class="modal-close-btn">'
  },
  {
    target: '<div id="campusVideoContainer" style="padding: 16px; background: #000; display: flex; justify-content: center; align-items: center; overflow: hidden; flex: 1; min-height: 320px;">',
    replace: '<div id="campusVideoContainer" class="video-player-frame">'
  }
];

let applied = 0;
remaining.forEach(r => {
  if (content.includes(r.target)) {
    content = content.split(r.target).join(r.replace);
    applied++;
  } else {
    console.warn(`Target not found: ${r.target.slice(0, 40)}`);
  }
});

fs.writeFileSync('index.html', content, 'utf8');
console.log(`Applied remaining ${applied} / ${remaining.length} in index.html`);
