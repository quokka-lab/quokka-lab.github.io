(() => {
  'use strict';
  const cards = [...document.querySelectorAll('[data-project]')];
  const pager = document.querySelector('.project-pagination');
  const prev = document.getElementById('project-prev');
  const next = document.getElementById('project-next');
  const all = document.getElementById('project-all');
  const status = document.getElementById('project-status');
  const perPage = 3;
  let page = 0;
  let showAll = true;
  const print = document.getElementById('print-cv');
  if (print) { print.hidden = false; print.addEventListener('click', () => window.print()); }
  const isCV = /\/cv(?:\.html|\/)?$/.test(location.pathname);
  document.querySelectorAll('.site-header nav a').forEach(link => {
    if ((isCV && /\/cv(?:\.html|\/)?$/.test(link.pathname)) || (!isCV && link.textContent === 'Profile')) link.setAttribute('aria-current', 'page');
  });
  function render() {
    cards.forEach((card, index) => { card.hidden = !showAll && Math.floor(index / perPage) !== page; });
    const count = Math.ceil(cards.length / perPage);
    status.textContent = showAll ? `All ${cards.length} projects` : `Page ${page + 1} of ${count}`;
    prev.hidden = next.hidden = showAll;
    prev.disabled = page === 0;
    next.disabled = page === count - 1;
    all.textContent = showAll ? 'Show pages' : 'Show all';
    all.setAttribute('aria-pressed', String(!showAll));
  }
  if (cards.length > perPage && pager) {
    pager.hidden = false;
    prev.addEventListener('click', () => { page = Math.max(0, page - 1); render(); document.getElementById('project-experience').scrollIntoView(); });
    next.addEventListener('click', () => { page = Math.min(Math.ceil(cards.length / perPage) - 1, page + 1); render(); document.getElementById('project-experience').scrollIntoView(); });
    all.addEventListener('click', () => { showAll = !showAll; page = 0; render(); });
    render();
  }
  const links = [...document.querySelectorAll('.section-index nav a')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        links.forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    }, { rootMargin: '-5% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('.resume-section').forEach(section => observer.observe(section));
  }
})();
