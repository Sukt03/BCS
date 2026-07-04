// Copy BibTeX
const copyBtn = document.querySelector('[data-copy-bibtex]');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const text = document.querySelector('#bibtex-source').innerText;
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    const original = copyBtn.textContent;
    copyBtn.textContent = 'Copied ✓';
    copyBtn.setAttribute('data-copied', 'true');
    setTimeout(() => {
      copyBtn.textContent = original;
      copyBtn.removeAttribute('data-copied');
    }, 1800);
  });
}

// Scroll-reveal (skipped entirely if the user prefers reduced motion)
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');

if (prefersReduced || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => {
    el.classList.add('visible');
  });
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => io.observe(el));
}

const statEls = document.querySelectorAll('.stat .num');
statEls.forEach(el => { el.dataset.raw = el.textContent.trim(); });
function formatStat(raw, value){
  if (raw.includes(',')) return Math.round(value).toLocaleString('en-US');
  if (raw.includes('.')) return value.toFixed(raw.split('.')[1].length);
  return Math.round(value).toString();
}
if (!prefersReduced && statEls.length && 'IntersectionObserver' in window) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.raw.replace(/,/g, ''));
      const duration = 900;
      const start = performance.now();
      function tick(now){
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = formatStat(el.dataset.raw, target * eased);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = el.dataset.raw;
      }
      requestAnimationFrame(tick);
      statObserver.unobserve(el);
    });
  }, { threshold: 0.4 });
  statEls.forEach(el => statObserver.observe(el));
}
