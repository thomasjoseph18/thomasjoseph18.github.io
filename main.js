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
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', x + '%');
    card.style.setProperty('--mouse-y', y + '%');
  });
});

/* ─── SCROLL PROGRESS BAR ─── */
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; z-index: 9000;
  height: 2px; width: 0%;
  background: linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4);
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
  'color:#a855f7;font-size:1.4rem;font-weight:bold;font-family:monospace',
  'color:#7c3aed;font-size:.9rem;font-family:monospace',
  'color:#06b6d4;font-size:.8rem;font-family:monospace',
  'color:#94a3b8;font-size:.8rem;font-family:monospace'
);
