/**
 * PITTCARE site.js  v2
 * - Injects shared nav and footer HTML into every page
 * - Injects shared nav/footer CSS once (avoids duplication across pages)
 * - Handles mobile hamburger toggle
 * - Handles scroll-triggered fade-in
 *
 * Usage in any page:
 *   <div id="site-nav"></div>   ← nav lands here
 *   <div id="site-footer"></div> ← footer lands here
 *   <script src="site.js"></script>
 *   Set data-page="pageid" on <body> to highlight the active nav item.
 */

(function () {
  'use strict';

  const currentPage = document.body.getAttribute('data-page') || '';

  /* ── Navigation link table ──────────────────────────────────────── */
  const NAV_LINKS = [
    { href: 'index.html',          label: 'Home',               id: 'home' },
    { href: 'index.html#about',    label: 'About',              id: 'about' },
    { href: 'research.html',       label: 'Research',           id: 'research' },
    { href: 'index.html#vop',      label: 'Voice of the People',id: 'vop' },
    { href: 'collaborators.html',  label: 'Collaborators',      id: 'collaborators' },
    { href: 'advisory-board.html', label: 'Advisory Board',     id: 'advisory-board' },
    { href: 'index.html#schools',  label: 'Affiliations',       id: 'affiliations' },
    { href: 'index.html#contact',  label: 'Contact',            id: 'contact' },
  ];

  /* ── Inject shared CSS ──────────────────────────────────────────── */
  const css = `
/* ── PITTCARE shared nav + footer styles (injected by site.js) ── */

.site-nav {
  position: sticky;
  top: 0;
  z-index: 200;
  background: #003594;
  border-bottom: 3px solid #ffb81c;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(16px, 4vw, 72px);
  height: 60px;
  box-sizing: border-box;
}

.site-nav .nav-brand {
  font-family: 'Roboto', sans-serif;
  font-weight: 800;
  font-size: 22px;
  color: #ffffff;
  text-decoration: none;
  letter-spacing: 0.02em;
  flex-shrink: 0;
  margin-right: 16px;
}

.site-nav .nav-brand span { color: #ffb81c; }

/* Desktop link list */
.site-nav .nav-links {
  display: flex;
  gap: clamp(10px, 1.4vw, 24px);
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: nowrap;
  align-items: center;
  overflow: hidden;
}

.site-nav .nav-links a {
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: clamp(10px, 1.1vw, 13px);
  color: rgba(255,255,255,0.82);
  text-decoration: none;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;
  padding: 4px 0;
  border-bottom: 2px solid transparent;
  transition: color 0.18s, border-color 0.18s;
}

.site-nav .nav-links a:hover  { color: #ffb81c; }
.site-nav .nav-links a.active { color: #ffb81c; border-bottom-color: #ffb81c; }

/* Hamburger button — hidden on desktop */
.site-nav .nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px 8px;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}

.site-nav .nav-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: #ffffff;
  border-radius: 2px;
  transition: transform 0.22s ease, opacity 0.22s ease;
}

/* Animated X when open */
.site-nav .nav-toggle[aria-expanded="true"] span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.site-nav .nav-toggle[aria-expanded="true"] span:nth-child(2) {
  opacity: 0;
}
.site-nav .nav-toggle[aria-expanded="true"] span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ── Mobile nav ─────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .site-nav {
    /* allow dropdown to overflow below */
    position: sticky;
    flex-wrap: wrap;
    height: auto;
    min-height: 60px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .site-nav .nav-brand {
    /* stays in the 60px header row */
    height: 60px;
    line-height: 60px;
  }

  /* Hamburger visible */
  .site-nav .nav-toggle {
    display: flex;
    height: 60px;
  }

  /* Link list: hidden by default, revealed as a full-width dropdown */
  .site-nav .nav-links {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    background: #002570;
    padding: 8px 0 16px;
    gap: 0;
    border-top: 1px solid rgba(255,255,255,0.1);
    /* order: after the brand+toggle row */
    order: 3;
  }

  .site-nav .nav-links.open {
    display: flex;
  }

  .site-nav .nav-links li {
    width: 100%;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  .site-nav .nav-links a {
    display: block;
    padding: 13px clamp(16px, 4vw, 72px);
    font-size: 14px;
    letter-spacing: 0.04em;
    color: rgba(255,255,255,0.85);
    border-bottom: none;  /* no underline on mobile items */
  }

  .site-nav .nav-links a.active {
    color: #ffb81c;
    background: rgba(255,255,255,0.04);
    border-left: 3px solid #ffb81c;
    padding-left: calc(clamp(16px, 4vw, 72px) - 3px);
  }

  .site-nav .nav-links a:hover {
    background: rgba(255,255,255,0.06);
    color: #ffb81c;
  }
}

/* ── Shared footer ──────────────────────────────────────────────── */
.site-footer {
  background: #002570;
  padding: clamp(48px,6vw,80px) clamp(20px,5vw,80px) 36px;
  color: #ffffff;
}

.site-footer .footer-inner { max-width: 1140px; margin: 0 auto; }

.site-footer .footer-top {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

.site-footer .footer-brand-name {
  font-family: 'Roboto', sans-serif;
  font-weight: 800;
  font-size: 28px;
  color: #ffffff;
  margin-bottom: 6px;
}

.site-footer .footer-brand-name span { color: #ffb81c; }

.site-footer .footer-tagline {
  font-family: 'Merriweather', serif;
  font-style: italic;
  font-weight: 300;
  font-size: 13px;
  color: rgba(255,255,255,0.6);
  margin-bottom: 20px;
  line-height: 1.6;
}

.site-footer .footer-affil {
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  color: rgba(255,255,255,0.5);
  line-height: 1.8;
}

.site-footer .footer-col-title {
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #ffb81c;
  margin-bottom: 16px;
}

.site-footer .footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.site-footer .footer-links a {
  font-family: 'Merriweather', serif;
  font-weight: 300;
  font-size: 14px;
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  transition: color 0.2s;
}

.site-footer .footer-links a:hover { color: #ffb81c; }

.site-footer .footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.12);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.site-footer .footer-bottom-text {
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  color: rgba(255,255,255,0.4);
}

.site-footer .footer-six-schools {
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 0.06em;
  color: rgba(255,255,255,0.3);
}

@media (max-width: 860px) {
  .site-footer .footer-top { grid-template-columns: 1fr; gap: 32px; }
}
`;

  /* Inject CSS once */
  if (!document.getElementById('pittcare-site-css')) {
    const style = document.createElement('style');
    style.id = 'pittcare-site-css';
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ── Nav HTML ───────────────────────────────────────────────────── */
  const navHTML = `
<nav class="site-nav" role="navigation" aria-label="Main navigation">
  <a href="index.html" class="nav-brand">PITT<span>CARE</span></a>
  <button class="nav-toggle" aria-label="Open navigation menu" aria-expanded="false" aria-controls="site-nav-links">
    <span></span><span></span><span></span>
  </button>
  <ul class="nav-links" id="site-nav-links" role="list">
    ${NAV_LINKS.map(l => `
    <li><a href="${l.href}"${currentPage === l.id ? ' class="active" aria-current="page"' : ''}>${l.label}</a></li>`).join('')}
  </ul>
</nav>`;

  /* ── Footer HTML ────────────────────────────────────────────────── */
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
          <a href="https://pittcare.github.io" style="color:#66b2e3;">pittcare.github.io</a>
        </p>
      </div>
      <div>
        <div class="footer-col-title">Quick Links</div>
        <ul class="footer-links">
          <li><a href="index.html#about">About PITTCARE</a></li>
          <li><a href="index.html#the-name">The Name</a></li>
          <li><a href="research.html">Research &amp; Projects</a></li>
          <li><a href="index.html#vop">Voice of the People Survey</a></li>
          <li><a href="collaborators.html">Key Collaborators</a></li>
          <li><a href="advisory-board.html">External Advisory Board</a></li>
          <li><a href="index.html#schools">School Affiliations</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Contact &amp; Links</div>
        <ul class="footer-links">
          <li><a href="mailto:pittcare@pitt.edu">pittcare@pitt.edu</a></li>
          <li><a href="https://www.dbmi.pitt.edu" target="_blank" rel="noopener">Dept. of Biomedical Informatics</a></li>
          <li><a href="https://www.sci.pitt.edu" target="_blank" rel="noopener">School of Computing and Information</a></li>
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

  /* ── Inject nav ─────────────────────────────────────────────────── */
  const navContainer = document.getElementById('site-nav');
  if (navContainer) navContainer.innerHTML = navHTML;

  /* ── Inject footer ──────────────────────────────────────────────── */
  const footerContainer = document.getElementById('site-footer');
  if (footerContainer) footerContainer.innerHTML = footerHTML;

  /* ── Hamburger toggle ───────────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    const toggle = e.target.closest('.nav-toggle');
    if (toggle) {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      toggle.setAttribute('aria-label', expanded ? 'Open navigation menu' : 'Close navigation menu');
      const links = document.getElementById('site-nav-links');
      if (links) links.classList.toggle('open', !expanded);
      return;
    }
    /* Close menu when user taps a link inside it on mobile */
    const navLink = e.target.closest('.site-nav .nav-links a');
    if (navLink) {
      const links = document.getElementById('site-nav-links');
      const toggle2 = document.querySelector('.nav-toggle');
      if (links)   links.classList.remove('open');
      if (toggle2) { toggle2.setAttribute('aria-expanded', 'false'); toggle2.setAttribute('aria-label', 'Open navigation menu'); }
    }
  });

  /* ── Close menu on outside tap ──────────────────────────────────── */
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.site-nav')) {
      const links = document.getElementById('site-nav-links');
      const toggle = document.querySelector('.nav-toggle');
      if (links && links.classList.contains('open')) {
        links.classList.remove('open');
        if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation menu'); }
      }
    }
  });

  /* ── Scroll-triggered fade-in ────────────────────────────────────── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add('visible');
        observer.unobserve(el.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

})();
