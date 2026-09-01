/**
 * PITTCARE — tight edition — site.js
 * Consolidated nav (5 items, down from 9) + footer injection,
 * mobile toggle, expand-in-place for bios and project detail,
 * and scroll fade-in. One file, reused by every page.
 */
(function () {
  'use strict';

  const currentPage = document.body.getAttribute('data-page') || '';

  const NAV_LINKS = [
    { href: 'index.html',         label: 'Home',     id: 'home' },
    { href: 'about.html',         label: 'About',    id: 'about' },
    { href: 'research.html',      label: 'Research', id: 'research' },
    { href: 'team.html',          label: 'Team',      id: 'team' },
    { href: 'index.html#contact', label: 'Contact',  id: 'contact' },
  ];

  const navHTML = `
<nav class="site-nav" aria-label="Main navigation">
  <a href="index.html" class="nav-brand">PITT<span>CARE</span></a>
  <button class="nav-toggle" aria-label="Open navigation menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <ul class="nav-links" id="nav-links">
    ${NAV_LINKS.map(l => `<li><a href="${l.href}"${currentPage === l.id ? ' class="active" aria-current="page"' : ''}>${l.label}</a></li>`).join('')}
  </ul>
</nav>`;

  const footerHTML = `
<footer class="site-footer" id="contact">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">PITT<span>CARE</span></div>
        <p class="footer-tag">Center for Primary Care Intelligence-Technology and Transformation</p>
        <p style="font-family:var(--font-sans); font-size:12px; color:rgba(255,255,255,0.5); line-height:1.8;">
          Department of Family Medicine · School of Medicine<br>University of Pittsburgh Health Sciences
        </p>
      </div>
      <div>
        <div class="footer-col-title">Explore</div>
        <ul class="footer-links">
          <li><a href="about.html">About &amp; History</a></li>
          <li><a href="index.html#about">Mission &amp; the Name</a></li>
          <li><a href="index.html#ethics">Ethics &amp; Governance</a></li>
          <li><a href="research.html">Research &amp; Projects</a></li>
          <li><a href="team.html">Team, Partners &amp; Advisory Board</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Contact</div>
        <ul class="footer-links">
          <li><a href="mailto:pittcare@pitt.edu">pittcare@pitt.edu</a></li>
          <li><a href="https://www.familymedicine.pitt.edu" target="_blank" rel="noopener">Dept. of Family Medicine ↗</a></li>
          <li><a href="https://www.healthsciences.pitt.edu" target="_blank" rel="noopener">Pitt Health Sciences ↗</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 University of Pittsburgh · PITTCARE</span>
      <span>Dental Medicine · Health &amp; Rehabilitation Sciences · Medicine · Nursing · Pharmacy · Public Health</span>
    </div>
  </div>
</footer>`;

  const navSlot = document.getElementById('site-nav');
  if (navSlot) navSlot.innerHTML = navHTML;
  const footerSlot = document.getElementById('site-footer');
  if (footerSlot) footerSlot.innerHTML = footerHTML;

  document.addEventListener('click', function (e) {
    const toggle = e.target.closest('.nav-toggle');
    if (toggle) {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      document.getElementById('nav-links').classList.toggle('open', !open);
      return;
    }
    if (e.target.closest('.site-nav .nav-links a')) {
      document.getElementById('nav-links').classList.remove('open');
    }
  });

  /* Expand-in-place: works for both .pcard (person bios) and .proj (project detail) */
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.expand-btn');
    if (!btn) return;
    const card = btn.closest('.pcard, .proj');
    if (!card) return;
    const expanded = card.classList.toggle('expanded');
    btn.textContent = expanded ? 'Show less ↑' : 'Read more ↓';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) { el.target.classList.add('visible'); observer.unobserve(el.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

})();
