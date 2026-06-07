// ===========================
// CURSOR GLOW
// ===========================
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

// ===========================
// NAVBAR – scroll effect + active link
// ===========================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const isOpen = navMenu.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// ===========================
// TYPED TEXT EFFECT
// ===========================
const typedEl = document.getElementById('typed');
const phrases = [
  'IT Student 🎓',
  'Web Developer 💻',
  'Frontend Learner 🎨',
  'Problem Solver 🧩',
  'Future Engineer 🚀',
];
let phraseIdx = 0, charIdx = 0, isDeleting = false;

function typeLoop() {
  const current = phrases[phraseIdx];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIdx === current.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(typeLoop, speed);
}
typeLoop();

// ===========================
// INTERSECTION OBSERVER – fade-up & skill bars
// ===========================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Skill bars
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });

      // Counter animation
      entry.target.querySelectorAll('.stat-number[data-target]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
    }
  });
}, { threshold: 0.15 });

// Add fade-up to all major blocks
document.querySelectorAll(
  '.hero-content, .hero-visual, .about-text, .about-stats, ' +
  '.skill-group, .project-card, .contact-left, .contact-form, ' +
  '.section-header'
).forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = (i % 4) * 0.1 + 's';
  observer.observe(el);
});

// Skill fills also need to be triggered by section observe
document.querySelectorAll('.skills, .about, .projects, .contact').forEach(sec => {
  observer.observe(sec);
});

// ===========================
// COUNTER ANIMATION
// ===========================
function animateCounter(el, target) {
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target) + '+';
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ===========================
// CONTACT FORM
// ===========================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
  btn.disabled = true;

  // Simulate sending (replace with real backend / EmailJS / Formspree)
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Gửi tin nhắn';
    btn.disabled = false;
    formSuccess.classList.add('show');
    contactForm.reset();

    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1500);
});

// ===========================
// SMOOTH SCROLL for all anchor links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
