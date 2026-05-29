const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const icons = {
  quality: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 16.8 6.1 20l1.2-6.5L2.5 8.9 9.1 8 12 2z"/></svg>',
  print: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 8V3h10v5"/><path d="M6 17H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2"/><path d="M7 14h10v7H7z"/></svg>',
  eco: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 3s-7.5-.5-12 4-4 12-4 12 7.5.5 12-4 4-12 4-12z"/><path d="M4 20c5-6 9-9 15-15"/></svg>',
  speed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h8l-1 8 11-13h-8l0-7z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.5 19.5 0 0 1 5.2 13 19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 5.9 5.9l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>',
  location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/></svg>',
  message: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>'
};
$$('[data-icon]').forEach(icon => { icon.innerHTML = icons[icon.dataset.icon] || ''; });

window.addEventListener('load', () => setTimeout(() => $('.preloader')?.classList.add('hide'), 450));

const navbar = $('.navbar');
const updateScroll = () => {
  const scrollTop = window.scrollY;
  navbar?.classList.toggle('scrolled', scrollTop > 40);
};
window.addEventListener('scroll', updateScroll, { passive: true });
updateScroll();

const heroBannerEl = $('.hero.banner-hero');
const heroShowcaseEl = $('.hero-showcase');
const updateHeroPouchesVisibility = () => {
  if (!heroBannerEl || !heroShowcaseEl) return;
  const r = heroShowcaseEl.getBoundingClientRect();
  const scrolledPast = r.bottom < 12;
  const backInZone = r.bottom > 96;
  if (scrolledPast) heroBannerEl.classList.add('hero-pouches-off');
  else if (backInZone) heroBannerEl.classList.remove('hero-pouches-off');
};
window.addEventListener('scroll', updateHeroPouchesVisibility, { passive: true });
window.addEventListener('resize', updateHeroPouchesVisibility);
updateHeroPouchesVisibility();

const cursorDot = $('.cursor-dot');
const cursorRing = $('.cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
if (cursorDot && cursorRing) {
  window.addEventListener('pointermove', (event) => {
    mouseX = event.clientX; mouseY = event.clientY;
    cursorDot.style.left = `${mouseX}px`; cursorDot.style.top = `${mouseY}px`;
  });
  const animateCursor = () => {
    ringX += (mouseX - ringX) * 0.16; ringY += (mouseY - ringY) * 0.16;
    cursorRing.style.left = `${ringX}px`; cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();
  $$('a, button, .tilt-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
  });
}

const navToggle = $('.nav-toggle');
const navMenu = $('.nav-menu');
navToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
$$('.nav-menu a').forEach(link => link.addEventListener('click', () => {
  navMenu?.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

const touchFlipMq = window.matchMedia('(hover: none)');
const syncFlipCardsTouch = () => {
  $$('.flip-card').forEach(card => {
    if (touchFlipMq.matches) {
      card.classList.add('flip-card-touch');
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', 'Tap to swap the pack image');
      card.setAttribute('aria-pressed', String(card.classList.contains('is-flipped')));
    } else {
      card.classList.remove('flip-card-touch', 'is-flipped');
      card.removeAttribute('tabindex');
      card.removeAttribute('role');
      card.removeAttribute('aria-label');
      card.removeAttribute('aria-pressed');
    }
  });
};
const activateFlipCard = (card) => {
  if (!touchFlipMq.matches) return;
  const scope = card.closest('.premium-grid') || document.body;
  $$('.flip-card.is-flipped', scope).forEach(open => {
    if (open !== card) {
      open.classList.remove('is-flipped');
      open.setAttribute('aria-pressed', 'false');
    }
  });
  card.classList.toggle('is-flipped');
  card.setAttribute('aria-pressed', String(card.classList.contains('is-flipped')));
};
$$('.flip-card').forEach(card => {
  card.addEventListener('click', (event) => {
    if (!touchFlipMq.matches) return;
    event.preventDefault();
    activateFlipCard(card);
  });
  card.addEventListener('keydown', (event) => {
    if (!touchFlipMq.matches) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activateFlipCard(card);
    }
  });
});
syncFlipCardsTouch();
touchFlipMq.addEventListener('change', syncFlipCardsTouch);

const filterButtons = $$('[data-filter]');
const productCards = $$('.product-card');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    productCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category.includes(filter);
      if (match) {
        card.classList.remove('hide');
        setTimeout(() => card.classList.add('visible'), 30);
      } else {
        card.classList.add('hide');
      }
    });
  });
});

$$('.magnetic').forEach(element => {
  element.addEventListener('mousemove', (event) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    element.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });
  element.addEventListener('mouseleave', () => element.style.transform = '');
});

if (window.matchMedia('(pointer: fine)').matches) {
  $$('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 7}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

// Products showroom (products.html)
const showroom = $('[data-showroom]');
if (showroom) {
  const tabs = $$('[data-showroom-tab]', showroom);
  const panels = $$('[data-showroom-panel]', showroom);
  const setActive = (key) => {
    tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.showroomTab === key));
    panels.forEach(panel => panel.classList.toggle('is-active', panel.dataset.showroomPanel === key));
  };
  tabs.forEach(tab => tab.addEventListener('click', () => setActive(tab.dataset.showroomTab)));
}

const accordionItems = $$('.accordion-item');
const sliderImages = $$('.slider-track img');
const sliderDots = $$('.slider-dots button');
let slideIndex = 0;

const showSlide = (index) => {
  if (!sliderImages.length) return;
  sliderImages.forEach((img, i) => img.classList.toggle('active', i === index));
  sliderDots.forEach((dot, i) => dot.classList.toggle('active', i === index));
};

const setCapabilitiesState = (index) => {
  if (accordionItems.length) {
    const activeAccordionIndex = Math.min(index, accordionItems.length - 1);
    accordionItems.forEach((item, i) => item.classList.toggle('active', i === activeAccordionIndex));
  }
  slideIndex = index;
  showSlide(slideIndex);
};

if (accordionItems.length) {
  const prePressIndex = accordionItems.findIndex(item =>
    /pre-?press optimization/i.test(item.textContent || '')
  );
  const defaultIndex = prePressIndex >= 0 ? prePressIndex : 0;
  setCapabilitiesState(defaultIndex);

  accordionItems.forEach((item, index) => {
    item.addEventListener('click', () => setCapabilitiesState(index));
  });
}

if (sliderImages.length) {
  if (!accordionItems.length) showSlide(slideIndex);
  setInterval(() => {
    slideIndex = (slideIndex + 1) % sliderImages.length;
    setCapabilitiesState(slideIndex);
  }, 2800);
  sliderDots.forEach((dot, index) => dot.addEventListener('click', () => {
    setCapabilitiesState(index);
  }));
}

const form = $('.inquiry-form');
const note = $('.form-note');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  note.textContent = 'Thank you! Your inquiry is ready. Connect this form to email, WhatsApp, or a backend API to receive submissions.';
  form.reset();
});

// Intersection Observer for scroll reveal animations
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -8% 0px',
  threshold: 0.05
};
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      // Only unobserve if it's NOT a history row, to allow scroll-up re-animation
      if (!entry.target.classList.contains('history-luxe-row')) {
        observer.unobserve(entry.target);
      }
    } else {
      if (entry.target.classList.contains('history-luxe-row')) {
        entry.target.classList.remove('revealed');
      }
    }
  });
}, observerOptions);
$$('.reveal').forEach(el => revealObserver.observe(el));

// About page history axis glow: activate only while row is in view
const historyRows = $$('.history-luxe-row');
if (historyRows.length) {
  const historyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const shouldGlow = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      entry.target.classList.toggle('is-active', shouldGlow);
    });
  }, {
    root: null,
    rootMargin: '-14% 0px -14% 0px',
    threshold: [0, 0.15, 0.25, 0.5]
  });

  historyRows.forEach(row => historyObserver.observe(row));
}
