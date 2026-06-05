/**
 * Mohamed Tharik — Premium Portfolio
 * Main JavaScript — Vanilla JS, no frameworks
 */

(function () {
  'use strict';

  /* =========================================================================
     DOM REFERENCES
     ========================================================================= */
  const DOM = {
    loader: document.getElementById('loader'),
    header: document.getElementById('header'),
    navMenu: document.getElementById('nav-menu'),
    navToggle: document.getElementById('nav-toggle'),
    navLinks: document.querySelectorAll('.nav__link'),
    roleRotator: document.getElementById('role-rotator'),
    scrollProgressBar: document.querySelector('.scroll-progress__bar'),
    particlesCanvas: document.getElementById('particles-canvas'),
    cursorDot: document.querySelector('.cursor--dot'),
    cursorRing: document.querySelector('.cursor--ring'),
    mouseGlow: document.querySelector('.mouse-glow'),
    reveals: document.querySelectorAll('.reveal'),
    statNumbers: document.querySelectorAll('.stats__number'),
    skillBars: document.querySelectorAll('.skill-bar'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    projectCards: document.querySelectorAll('.project-card'),
    projectModal: document.getElementById('project-modal'),
    modalContent: document.getElementById('modal-content'),
    modalClose: document.querySelector('.modal__close'),
    modalBackdrop: document.querySelector('.modal__backdrop'),
    testimonialsTrack: document.getElementById('testimonials-track'),
    testimonialsDots: document.getElementById('testimonials-dots'),
    testimonialPrev: document.querySelector('.testimonials__btn--prev'),
    testimonialNext: document.querySelector('.testimonials__btn--next'),
    contactForm: document.getElementById('contact-form'),
    formSuccess: document.getElementById('form-success'),
    year: document.getElementById('year'),
    magneticEls: document.querySelectorAll('.magnetic'),
  };

  /* =========================================================================
     CONFIGURATION
     ========================================================================= */
  const ROLES = [
    'Data Analyst',
    'Business Analyst',
    'Power BI Developer',
    'Python Developer',
    'Web Developer',
  ];

  const PROJECTS = {
    'hr-analytics': {
      title: 'HR Analytics Dashboard',
      tags: ['Python', 'Power BI', 'Advanced Excel', 'SQL'],
      description: 'An end-to-end HR Analytics Dashboard designed to track and visualize key workforce metrics including employee records, attendance, and reporting summaries.',
      details: [
        'Utilized Python for back-end data processing and automation of HR data workflows, reducing manual effort significantly.',
        'Built interactive Power BI dashboards providing real-time visual insights into HR KPIs such as headcount trends and departmental reporting.',
        'Leveraged Advanced Excel (PivotTables, VLOOKUP, conditional formatting) for data validation, cleaning, and structured reporting.',
        'Demonstrated ability to translate raw HR data into clear, decision-ready visual reports for management.',
      ],
      github: 'https://github.com/MOHAMEDTHARIK-GIT',
    },
    'web-portfolio': {
      title: 'Premium Portfolio Website',
      tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
      description: 'An award-winning personal portfolio featuring glassmorphism design, fluid 60fps animations, and fully responsive layouts across all devices.',
      details: [
        'Built with semantic HTML5, modern CSS architecture, and vanilla JavaScript for optimal performance.',
        'Implemented advanced effects including particle systems, custom cursor, magnetic buttons, and scroll-triggered animations.',
        'Designed with a mobile-first approach using CSS Grid, Flexbox, and clamp() for responsive typography.',
        'Achieved premium SaaS-level UI/UX inspired by Apple, Stripe, Linear, and Framer design languages.',
      ],
      github: 'https://github.com/MOHAMEDTHARIK-GIT',
    },
    'ai-app': {
      title: 'AI-Powered Application',
      tags: ['Python', 'AI/ML', 'API Integration'],
      description: 'An intelligent application leveraging AI capabilities for automated data processing and smart insights generation.',
      details: [
        'Developed using Python with integration of AI/ML models for intelligent data analysis.',
        'Built RESTful API endpoints for seamless data exchange and processing automation.',
        'Implemented smart features that reduce manual data handling and improve decision accuracy.',
        'Designed with scalability in mind for future feature expansion and model improvements.',
      ],
      github: 'https://github.com/MOHAMEDTHARIK-GIT',
    },
  };

  /* =========================================================================
     STATE
     ========================================================================= */
  let roleIndex = 0;
  let testimonialIndex = 0;
  let testimonialCount = 0;
  let testimonialAutoplay = null;
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let ringX = 0;
  let ringY = 0;
  let isDesktop = window.matchMedia('(min-width: 769px)').matches;
  let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================================================================
     LOADING SCREEN
     ========================================================================= */
  function initLoader() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        DOM.loader.classList.add('hidden');
        document.body.classList.add('loaded');
        initReveals();
      }, 1800);
    });
  }

  /* =========================================================================
     CUSTOM CURSOR (Desktop Only)
     ========================================================================= */
  function initCursor() {
    if (!isDesktop || prefersReducedMotion) {
      return;
    }

    document.body.classList.add('custom-cursor');

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    /* Smooth cursor animation loop */
    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (DOM.cursorDot) {
        DOM.cursorDot.style.left = cursorX + 'px';
        DOM.cursorDot.style.top = cursorY + 'px';
      }
      if (DOM.cursorRing) {
        DOM.cursorRing.style.left = ringX + 'px';
        DOM.cursorRing.style.top = ringY + 'px';
      }
      if (DOM.mouseGlow) {
        DOM.mouseGlow.style.left = mouseX + 'px';
        DOM.mouseGlow.style.top = mouseY + 'px';
      }

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    /* Hover state for interactive elements */
    const hoverTargets = document.querySelectorAll('a, button, input, textarea, .magnetic, .project-card');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        DOM.cursorRing?.classList.add('hover');
        DOM.cursorDot?.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        DOM.cursorRing?.classList.remove('hover');
        DOM.cursorDot?.classList.remove('hover');
      });
    });
  }

  /* =========================================================================
     SCROLL PROGRESS INDICATOR
     ========================================================================= */
  function initScrollProgress() {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if (DOM.scrollProgressBar) {
        DOM.scrollProgressBar.style.width = progress + '%';
      }

      /* Header background on scroll */
      if (DOM.header) {
        DOM.header.classList.toggle('scrolled', scrollTop > 50);
      }

      /* Active nav link highlighting */
      updateActiveNavLink();
    }, { passive: true });
  }

  /* =========================================================================
     NAVIGATION
     ========================================================================= */
  function initNavigation() {
    /* Mobile toggle */
    DOM.navToggle?.addEventListener('click', () => {
      const isOpen = DOM.navMenu.classList.toggle('open');
      DOM.navToggle.classList.toggle('active');
      DOM.navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Close menu on link click */
    DOM.navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        DOM.navMenu.classList.remove('open');
        DOM.navToggle.classList.remove('active');
        DOM.navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    /* Smooth scroll for anchor links */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        DOM.navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }

  /* =========================================================================
     ROLE ROTATOR (Typing Effect)
     ========================================================================= */
  function initRoleRotator() {
    if (!DOM.roleRotator) return;

    function rotateRole() {
      DOM.roleRotator.classList.add('fade-out');

      setTimeout(() => {
        roleIndex = (roleIndex + 1) % ROLES.length;
        DOM.roleRotator.textContent = ROLES[roleIndex];
        DOM.roleRotator.classList.remove('fade-out');
      }, 300);
    }

    setInterval(rotateRole, 3000);
  }

  /* =========================================================================
     PARTICLE SYSTEM
     ========================================================================= */
  function initParticles() {
    const canvas = DOM.particlesCanvas;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticles() {
      const count = isDesktop ? 60 : 30;
      particles = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        /* Wrap around edges */
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${p.opacity})`;
        ctx.fill();

        /* Connect nearby particles */
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(drawParticles);
    }

    resize();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    /* Pause when tab is hidden for performance */
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        drawParticles();
      }
    });
  }

  /* =========================================================================
     SCROLL REVEAL ANIMATIONS
     ========================================================================= */
  function initReveals() {
    if (prefersReducedMotion) {
      DOM.reveals.forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    DOM.reveals.forEach((el) => observer.observe(el));
  }

  /* =========================================================================
     ANIMATED COUNTERS
     ========================================================================= */
  function initCounters() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    DOM.statNumbers.forEach((el) => observer.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      /* Ease out cubic */
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  /* =========================================================================
     SKILL BAR ANIMATIONS
     ========================================================================= */
  function initSkillBars() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const progress = bar.dataset.progress;
            const fill = bar.querySelector('.skill-bar__fill');
            if (fill) {
              setTimeout(() => {
                fill.style.width = progress + '%';
              }, 200);
            }
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.3 }
    );

    DOM.skillBars.forEach((bar) => observer.observe(bar));
  }

  /* =========================================================================
     PROJECT FILTER
     ========================================================================= */
  function initProjectFilter() {
    DOM.filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        DOM.filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        DOM.projectCards.forEach((card) => {
          const category = card.dataset.category;
          const show = filter === 'all' || category === filter;

          if (show) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeInUp 0.5s ease forwards';
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* =========================================================================
     PROJECT MODAL
     ========================================================================= */
  function initProjectModal() {
    /* Open modal triggers */
    document.querySelectorAll('[data-project]').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const projectId = trigger.dataset.project;
        openModal(projectId);
      });
    });

    /* Close modal */
    DOM.modalClose?.addEventListener('click', closeModal);
    DOM.modalBackdrop?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  function openModal(projectId) {
    const project = PROJECTS[projectId];
    if (!project || !DOM.projectModal) return;

    DOM.modalContent.innerHTML = `
      <h2 id="modal-title">${project.title}</h2>
      <div class="modal__tags">
        ${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join('')}
      </div>
      <p>${project.description}</p>
      <ul>
        ${project.details.map((d) => `<li>${d}</li>`).join('')}
      </ul>
      <div class="modal__links">
        <a href="${project.github}" class="btn btn--primary magnetic" target="_blank" rel="noopener noreferrer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          View on GitHub
        </a>
      </div>
    `;

    DOM.projectModal.removeAttribute('hidden');
    requestAnimationFrame(() => {
      DOM.projectModal.classList.add('active');
    });
    document.body.style.overflow = 'hidden';

    /* Re-init magnetic on new elements */
    initMagneticButtons();
  }

  function closeModal() {
    if (!DOM.projectModal) return;
    DOM.projectModal.classList.remove('active');
    document.body.style.overflow = '';

    setTimeout(() => {
      DOM.projectModal.setAttribute('hidden', '');
    }, 350);
  }

  /* =========================================================================
     TESTIMONIALS SLIDER
     ========================================================================= */
  function initTestimonials() {
    const cards = DOM.testimonialsTrack?.querySelectorAll('.testimonial-card');
    if (!cards || cards.length === 0) return;

    testimonialCount = cards.length;

    /* Create dots */
    for (let i = 0; i < testimonialCount; i++) {
      const dot = document.createElement('button');
      dot.classList.add('testimonials__dot');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToTestimonial(i));
      DOM.testimonialsDots?.appendChild(dot);
    }

    DOM.testimonialPrev?.addEventListener('click', () => {
      goToTestimonial(testimonialIndex - 1);
    });

    DOM.testimonialNext?.addEventListener('click', () => {
      goToTestimonial(testimonialIndex + 1);
    });

    /* Autoplay */
    startTestimonialAutoplay();

    /* Pause on hover */
    DOM.testimonialsTrack?.parentElement?.addEventListener('mouseenter', stopTestimonialAutoplay);
    DOM.testimonialsTrack?.parentElement?.addEventListener('mouseleave', startTestimonialAutoplay);

    /* Touch swipe support */
    let touchStartX = 0;
    DOM.testimonialsTrack?.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    DOM.testimonialsTrack?.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goToTestimonial(diff > 0 ? testimonialIndex + 1 : testimonialIndex - 1);
      }
    }, { passive: true });
  }

  function goToTestimonial(index) {
    if (!DOM.testimonialsTrack) return;

    testimonialIndex = ((index % testimonialCount) + testimonialCount) % testimonialCount;
    DOM.testimonialsTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;

    /* Update dots */
    DOM.testimonialsDots?.querySelectorAll('.testimonials__dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === testimonialIndex);
    });
  }

  function startTestimonialAutoplay() {
    stopTestimonialAutoplay();
    testimonialAutoplay = setInterval(() => {
      goToTestimonial(testimonialIndex + 1);
    }, 5000);
  }

  function stopTestimonialAutoplay() {
    if (testimonialAutoplay) {
      clearInterval(testimonialAutoplay);
      testimonialAutoplay = null;
    }
  }

  /* =========================================================================
     MAGNETIC BUTTONS
     ========================================================================= */
  function initMagneticButtons() {
    if (!isDesktop) return;

    DOM.magneticEls.forEach((el) => {
      /* Prevent duplicate listeners */
      if (el._magneticInit) return;
      el._magneticInit = true;

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* =========================================================================
     CONTACT FORM VALIDATION
     ========================================================================= */
  function initContactForm() {
    if (!DOM.contactForm) return;

    DOM.contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fields = {
        name: DOM.contactForm.querySelector('#name'),
        email: DOM.contactForm.querySelector('#email'),
        subject: DOM.contactForm.querySelector('#subject'),
        message: DOM.contactForm.querySelector('#message'),
      };

      let isValid = true;

      /* Clear previous errors */
      Object.keys(fields).forEach((key) => {
        fields[key].classList.remove('error');
        const errorEl = document.getElementById(key + '-error');
        if (errorEl) errorEl.textContent = '';
      });

      /* Validate name */
      if (!fields.name.value.trim()) {
        showError('name', 'Name is required');
        isValid = false;
      } else if (fields.name.value.trim().length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
      }

      /* Validate email */
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!fields.email.value.trim()) {
        showError('email', 'Email is required');
        isValid = false;
      } else if (!emailRegex.test(fields.email.value.trim())) {
        showError('email', 'Please enter a valid email');
        isValid = false;
      }

      /* Validate subject */
      if (!fields.subject.value.trim()) {
        showError('subject', 'Subject is required');
        isValid = false;
      }

      /* Validate message */
      if (!fields.message.value.trim()) {
        showError('message', 'Message is required');
        isValid = false;
      } else if (fields.message.value.trim().length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
      }

      if (isValid) {
        /* Simulate form submission — integrate with backend/email service as needed */
        DOM.formSuccess.removeAttribute('hidden');
        DOM.contactForm.reset();

        setTimeout(() => {
          DOM.formSuccess.setAttribute('hidden', '');
        }, 5000);
      }
    });

    /* Real-time error clearing */
    DOM.contactForm.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener('input', () => {
        input.classList.remove('error');
        const errorEl = document.getElementById(input.id + '-error');
        if (errorEl) errorEl.textContent = '';
      });
    });
  }

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + '-error');
    if (field) field.classList.add('error');
    if (errorEl) errorEl.textContent = message;
  }

  /* =========================================================================
     PARALLAX EFFECTS
     ========================================================================= */
  function initParallax() {
    if (prefersReducedMotion || !isDesktop) return;

    const parallaxEls = document.querySelectorAll('.gradient-blob');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      parallaxEls.forEach((el, i) => {
        const speed = 0.05 + i * 0.02;
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    }, { passive: true });
  }

  /* =========================================================================
     FOOTER YEAR
     ========================================================================= */
  function initFooter() {
    if (DOM.year) {
      DOM.year.textContent = new Date().getFullYear();
    }
  }

  /* =========================================================================
     RESIZE HANDLER
     ========================================================================= */
  function initResizeHandler() {
    window.addEventListener('resize', () => {
      const wasDesktop = isDesktop;
      isDesktop = window.matchMedia('(min-width: 769px)').matches;

      document.body.classList.toggle('custom-cursor', isDesktop && !prefersReducedMotion);
    });
  }

  /* =========================================================================
     INITIALIZE ALL MODULES
     ========================================================================= */
  function init() {
    initLoader();
    initCursor();
    initScrollProgress();
    initNavigation();
    initRoleRotator();
    initParticles();
    initCounters();
    initSkillBars();
    initProjectFilter();
    initProjectModal();
    initTestimonials();
    initMagneticButtons();
    initContactForm();
    initParallax();
    initFooter();
    initResizeHandler();
  }

  /* Run when DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
