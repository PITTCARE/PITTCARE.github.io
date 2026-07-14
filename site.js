/**
 * PITTCARE site.js
 * Injects shared nav and footer into every page.
 * Usage: <script src="site.js"></script> in <head> or end of <body>
 * The script reads data-page="pagename" on <body> to highlight the active nav item.
 */

(function () {
  const currentPage = document.body.getAttribute('data-page') || '';

  const NAV_LINKS = [
    { href: 'index.html',         label: 'Home',                 id: 'home' },
    { href: 'index.html#about',   label: 'About',                id: 'about' },
    { href: 'index.html#focus',   label: 'Research',             id: 'research' },
    { href: 'index.html#vop',     label: 'Voice of the People',  id: 'vop' },
    { href: 'collaborators.html', label: 'Collaborators',        id: 'collaborators' },
    { href: 'index.html#schools', label: 'Affiliations',         id: 'affiliations' },
    { href: 'index.html#contact', label: 'Contact',              id: 'contact' },
  ];

  const navHTML = `
<nav class="site-nav" role="navigation" aria-label="Main navigation">
  <a href="index.html" class="nav-brand">PITT<span>CARE</span></a>
  <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <ul class="nav-links" role="list">
    ${NAV_LINKS.map(l => `
    <li><a href="${l.href}"${currentPage === l.id ? ' class="active" aria-current="page"' : ''}>${l.label}</a></li>`).join('')}
  </ul>
</nav>`;

  const footerHTML = `
<footer class="site-footer" id="contact">
  <div class="footer-inner">
    <div class="footer-top">
      <div>
        <div class="footer-brand-name">PITT<span>CARE</span></div>
        <p class="footer-tagline">Center for Primary Care Intelligence-Technology<br>and Transformation</p>
        <p class="footer-affil">
          Department of Family Medicine<br>
          School of Medicine<br>
          University of Pittsburgh Health Sciences<br>
          <a href="https://pittcare.github.io" style="color:var(--light-blue);">pittcare.github.io</a>
        </p>
      </div>
      <div>
        <div class="footer-col-title">Quick Links</div>
        <ul class="footer-links">
          <li><a href="index.html#about">About PITTCARE</a></li>
          <li><a href="index.html#the-name">The Name</a></li>
          <li><a href="index.html#focus">Research Focus Areas</a></li>
          <li><a href="index.html#vop">Voice of the People Survey</a></li>
          <li><a href="collaborators.html">Key Collaborators</a></li>
          <li><a href="index.html#schools">School Affiliations</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Contact &amp; Links</div>
        <ul class="footer-links">
          <li><a href="mailto:pittcare@pitt.edu">pittcare@pitt.edu</a></li>
          <li><a href="https://www.dbmi.pitt.edu" target="_blank" rel="noopener">Dept. of Biomedical Informatics</a></li>
          <li><a href="https://www.dom.pitt.edu/fm" target="_blank" rel="noopener">Dept. of Family Medicine</a></li>
          <li><a href="https://www.medschool.pitt.edu" target="_blank" rel="noopener">School of Medicine</a></li>
          <li><a href="https://www.healthsciences.pitt.edu" target="_blank" rel="noopener">Pitt Health Sciences</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-bottom-text">© 2025 University of Pittsburgh PITTCARE. University of Pittsburgh Health Sciences.</p>
      <p class="footer-six-schools">Dental Medicine + Health and Rehabilitation Sciences + Medicine + Nursing + Pharmacy + Public Health</p>
    </div>
  </div>
</footer>`;

  // Inject nav
  const navContainer = document.getElementById('site-nav');
  if (navContainer) navContainer.innerHTML = navHTML;

  // Inject footer
  const footerContainer = document.getElementById('site-footer');
  if (footerContainer) footerContainer.innerHTML = footerHTML;

  // Mobile nav toggle
  document.addEventListener('click', function (e) {
    const toggle = e.target.closest('.nav-toggle');
    if (!toggle) return;
    const nav = toggle.closest('.site-nav');
    const links = nav.querySelector('.nav-links');
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    links.classList.toggle('open', !expanded);
  });

  // Scroll-triggered fade-in (shared across all pages)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add('visible');
        observer.unobserve(el.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

})();
