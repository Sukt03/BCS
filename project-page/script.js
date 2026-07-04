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
  revealEls.forEach((el) => el.classList.add('visible'));
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
