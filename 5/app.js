const WHATSAPP = '79001234567';
const CEREMONY_FORM = 'https://wa.me/' + WHATSAPP + '?text=';
const CONSULT_FORM = 'https://wa.me/' + WHATSAPP + '?text=';

let lang = localStorage.getItem('lang') || 'en';

function t(path) {
  const keys = path.split('.');
  let v = T[lang];
  for (const k of keys) {
    v = v?.[k];
  }
  return v ?? path;
}

function setLang(l) {
  lang = l;
  localStorage.setItem('lang', l);
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === l);
  });
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = val;
    else el.textContent = val;
  });
  const valsEl = document.getElementById('values-list');
  if (valsEl) {
    const vals = T[lang]?.about?.valuesList;
    if (vals && Array.isArray(vals)) valsEl.innerHTML = vals.map(v => `<li>${v}</li>`).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
    b.addEventListener('click', () => setLang(b.dataset.lang));
  });
  setLang(lang);
});
