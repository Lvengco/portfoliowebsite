// ============================================
// PORTFOLIO — INTERACTIVE EFFECTS (main.js)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavHighlight();
  initTypingEffect();
  initScrollReveal();
  initSkillBars();
});

// ---------- NAV: highlight active section ----------
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
}

// ---------- TYPING EFFECT (hero subtitle) ----------
function initTypingEffect() {
  const el = document.querySelector('.typed-text');
  if (!el) return;

  const phrases = el.dataset.phrases
    ? JSON.parse(el.dataset.phrases)
    : [el.textContent.trim()];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseMs = 2000;

  function tick() {
    const current = phrases[phraseIdx];

    if (isDeleting) {
      charIdx--;
    } else {
      charIdx++;
    }

    el.textContent = current.slice(0, charIdx);

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIdx === current.length) {
      delay = pauseMs;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  }

  el.textContent = '';
  setTimeout(tick, 600);
}

// ---------- SCROLL REVEAL ----------
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => observer.observe(el));
}

// ---------- SKILL BARS ----------
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-bar-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          fill.style.width = fill.dataset.level + '%';
          fill.classList.add('animate');
          observer.unobserve(fill);
        }
      });
    },
    { threshold: 0.3 }
  );

  fills.forEach((fill) => {
    fill.style.width = '0';
    observer.observe(fill);
  });
}
