// Header state on scroll + back-to-top button
const header = document.getElementById('header');
const toTop = document.getElementById('to-top');

function onScroll() {
  const scrolled = window.scrollY > 40;
  header.classList.toggle('scrolled', scrolled);
  toTop.classList.toggle('visible', window.scrollY > 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile nav toggle
const burger = document.getElementById('burger');
const mainNav = document.getElementById('main-nav');

burger.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  burger.classList.toggle('active', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('[data-nav]').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// Scroll-reveal animation
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
);
revealEls.forEach((el) => revealObserver.observe(el));

// Contact form (front-end only demo submission)
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get('name') || '').toString().trim();
  const email = (data.get('email') || '').toString().trim();

  if (!name || !email) {
    status.textContent = 'Пожалуйста, заполните имя и email.';
    return;
  }

  status.textContent = `Спасибо, ${name}! Ваша заявка принята — мы свяжемся с вами по адресу ${email}.`;
  form.reset();
});
