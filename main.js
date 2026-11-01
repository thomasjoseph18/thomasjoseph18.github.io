/* =====================================================
   THOMAS JOSEPH — PORTFOLIO  |  main.js
   ===================================================== */

"use strict";

/* ─── SMOOTH SCROLL (native fallback) ─── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // close mobile menu
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

/* ─── NAV SCROLL EFFECT ─── */
const nav = document.getElementById('nav');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
    backTop.classList.add('show');
  } else {
    nav.classList.remove('scrolled');
    backTop.classList.remove('show');
  }
}, { passive: true });

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ─── HAMBURGER MENU ─── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

/* ─── CUSTOM CURSOR ─── */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
})();

/* hide default cursor when inside viewport */
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  cursorFollower.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  cursorFollower.style.opacity = '1';
});

/* ─── TYPEWRITER ─── */
const phrases = [
  'AI & Data Science Student',
  'Machine Learning Enthusiast',
  'Open Source Contributor',
  'Web Developer',
  'Problem Solver',
];

const twEl = document.getElementById('typewriter');
let pIdx = 0, cIdx = 0, deleting = false;

function typewriter() {
  const current = phrases[pIdx];
  if (!deleting) {
    twEl.textContent = current.slice(0, ++cIdx);
    if (cIdx === current.length) {
      deleting = true;
      setTimeout(typewriter, 2000);
      return;
    }
    setTimeout(typewriter, 70);
  } else {
    twEl.textContent = current.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
      setTimeout(typewriter, 400);
      return;
    }
    setTimeout(typewriter, 35);
  }
}
setTimeout(typewriter, 800);

/* ─── SCROLL REVEAL (IntersectionObserver) ─── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Keep observing for skill-bar re-trigger is not needed; unobserve normal elements
      if (!entry.target.classList.contains('skill-card')) {
        revealObserver.unobserve(entry.target);
      }
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ─── STAGGER CHILDREN ─── */
document.querySelectorAll('.skills-grid, .projects-grid, .contact-grid').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.08}s`;
  });
});

/* ─── PARALLAX ORBS (subtle, on mouse move) ─── */
const orbs = document.querySelectorAll('.orb');

document.addEventListener('mousemove', e => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  orbs.forEach((orb, i) => {
    const depth = (i + 1) * 8;
    orb.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
  });
}, { passive: true });

/* ─── ACTIVE NAV HIGHLIGHT ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--text)';
        }
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));

/* ─── PROJECT CARD GLOW ON MOUSE ─── */
function attachCardGlow(elements) {
  elements.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });
}
attachCardGlow(document.querySelectorAll('.project-card'));

/* ─── DYNAMIC GITHUB INTEGRATION ─── */
const GITHUB_USERNAME = "thomasjoseph18";

const langColors = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C++": "#f34b7d",
  C: "#555555",
  TypeScript: "#3178c6",
  Shell: "#89e051",
  Java: "#b07219",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  PHP: "#4F5D95",
  Rust: "#dea584",
  Go: "#00ADD8",
  Jupyter: "#DA5B0B",
  "Jupyter Notebook": "#DA5B0B"
};

async function loadGitHubProjects() {
  const container = document.getElementById("projects-grid");
  if (!container) return;

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    if (!res.ok) return;
    const repos = await res.json();

    const ownRepos = repos.filter(r => !r.fork);
    if (!ownRepos.length) return;

    container.innerHTML = ownRepos.map(repo => {
      const desc = repo.description || "Open source project on GitHub.";
      const lang = repo.language || "Code";
      const stars = repo.stargazers_count;
      const homepage = repo.homepage;

      return `
        <article class="project-card reveal visible">
          <div class="project-card-inner">
            <div class="project-header">
              <div class="project-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7l9-4 9 4v10l-9 4-9-4V7z"/></svg>
              </div>
              <div class="project-links">
                ${homepage ? `
                  <a href="${homepage}" target="_blank" rel="noopener" aria-label="Live Demo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                ` : ''}
                <a href="${repo.html_url}" target="_blank" rel="noopener" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                </a>
              </div>
            </div>
            <h3 class="project-title">${repo.name}</h3>
            <p class="project-desc">${desc}</p>
            <div class="project-footer">
              <div class="project-tech">
                <span class="tech-tag">${lang}</span>
              </div>
              <div class="project-stars">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span>${stars}</span>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join("");

    attachCardGlow(container.querySelectorAll('.project-card'));
  } catch (err) {
    console.error("Error loading GitHub projects:", err);
  }
}

async function loadGitHubStats() {
  const statsCard = document.getElementById("github-stats-card");
  const langsCard = document.getElementById("github-langs-card");

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`)
    ]);

    let repos = [];
    if (reposRes.ok) {
      repos = await reposRes.json();
    }

    if (userRes.ok && statsCard) {
      const user = await userRes.json();
      const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);

      statsCard.innerHTML = `
        <h3>Thomas's GitHub Stats</h3>
        <div class="stats-rows">
          <div class="stats-row">
            <span class="stats-label">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Total Stars
            </span>
            <span class="stats-value">${totalStars}</span>
          </div>
          <div class="stats-row">
            <span class="stats-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
              Public Repos
            </span>
            <span class="stats-value">${user.public_repos}</span>
          </div>
          <div class="stats-row">
            <span class="stats-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Followers
            </span>
            <span class="stats-value">${user.followers}</span>
          </div>
          <div class="stats-row">
            <span class="stats-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
              Following
            </span>
            <span class="stats-value">${user.following}</span>
          </div>
        </div>
      `;
    }

    if (langsCard && repos.length) {
      const langCounts = {};
      repos.filter(r => !r.fork && r.language).forEach(r => {
        const l = r.language;
        langCounts[l] = (langCounts[l] || 0) + (r.size || 1);
      });

      const sortedLangs = Object.entries(langCounts).sort((a, b) => b[1] - a[1]);
      const totalWeight = sortedLangs.reduce((acc, [, val]) => acc + val, 0);

      if (sortedLangs.length > 0) {
        const barSpans = sortedLangs.map(([lang, val]) => {
          const pct = ((val / totalWeight) * 100).toFixed(1);
          const col = langColors[lang] || "#a855f7";
          return `<span style="width: ${pct}%; background: ${col}" title="${lang}: ${pct}%"></span>`;
        }).join("");

        const listItems = sortedLangs.map(([lang, val]) => {
          const pct = ((val / totalWeight) * 100).toFixed(1);
          const col = langColors[lang] || "#a855f7";
          return `
            <div class="lang-item">
              <span class="lang-dot" style="background:${col}"></span>
              <span>${lang}</span>
              <span style="opacity:0.7">${pct}%</span>
            </div>
          `;
        }).join("");

        langsCard.innerHTML = `
          <h3>Thomas's Top Languages</h3>
          <div class="lang-bar-wrap">
            <div class="lang-bar">${barSpans}</div>
          </div>
          <div class="lang-list">${listItems}</div>
        `;
      }
    }
  } catch (err) {
    console.error("Error loading GitHub stats:", err);
  }
}

loadGitHubProjects();
loadGitHubStats();

/* ─── SCROLL PROGRESS BAR ─── */
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; z-index: 9000;
  height: 2px; width: 0%;
  background: linear-gradient(90deg, #059669, #10b981, #84cc16);
  transition: width 0.1s linear;
`;
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = ((scrollTop / docHeight) * 100) + '%';
}, { passive: true });

/* ─── CONSOLE EASTER EGG ─── */
console.log(`
%c  Thomas Joseph
%c  AI & Data Science @ CUSAT
%c  Built with HTML, CSS & Vanilla JS
%c  github.com/thomasjoseph18
`,
  'color:#10b981;font-size:1.4rem;font-weight:bold;font-family:monospace',
  'color:#059669;font-size:.9rem;font-family:monospace',
  'color:#84cc16;font-size:.8rem;font-family:monospace',
  'color:#94a3b8;font-size:.8rem;font-family:monospace'
);
