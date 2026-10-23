// Theme
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

const syncThemeIcon = () => {
  const dark = root.getAttribute('data-theme') === 'dark';
  themeIcon.classList.toggle('fa-sun', dark);
  themeIcon.classList.toggle('fa-moon', !dark);
};

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) { }
  syncThemeIcon();
});
syncThemeIcon();

// Copy email
const EMAIL = 'hi@shenthar.me';
const copyBtn = document.getElementById('copy-email');
const copyLabel = copyBtn.querySelector('.copy-label');
let copyTimer;

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
  } catch (e) {
    const ta = document.createElement('textarea');
    ta.value = EMAIL;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (err) { }
    ta.remove();
  }
  copyLabel.textContent = 'copied ✓';
  copyBtn.classList.add('is-copied');
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => {
    copyLabel.textContent = 'copy';
    copyBtn.classList.remove('is-copied');
  }, 1600);
};
copyBtn.addEventListener('click', copyEmail);

// Desktop extras: cursor glow + keyboard shortcuts
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
const desktop = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');

document.querySelectorAll('.tile').forEach((tile) => {
  tile.addEventListener('pointermove', (e) => {
    if (!canHover.matches) return;
    const r = tile.getBoundingClientRect();
    tile.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    tile.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  });
});

const shortcuts = {};
document.querySelectorAll('[data-key]').forEach((el) => {
  shortcuts[el.dataset.key] = el;
});

window.addEventListener('keydown', (e) => {
  if (!desktop.matches || e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
  const t = e.target;
  if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
  const key = (e.key || '').toLowerCase();
  if (key === 'e') {
    copyEmail();
    return;
  }
  const el = shortcuts[key];
  if (!el) return;
  el.classList.add('is-pressed');
  setTimeout(() => el.classList.remove('is-pressed'), 180);
  window.open(el.href, '_blank', 'noopener');
});
