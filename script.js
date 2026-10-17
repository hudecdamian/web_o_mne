const name = document.getElementById('name');
const text = name.textContent;

name.textContent = '';

[...text].forEach((char, index) => {
  const span = document.createElement('span');

  if (char === ' ') {
    span.className = 'sp';
    span.innerHTML = '&nbsp;';
  } else {
    span.textContent = char;
  }

  span.style.animationDelay = (0.2 + index * 0.09) + 's';
  span.setAttribute('aria-hidden', 'true');
  name.appendChild(span);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const nav = document.getElementById('nav');
const bar = document.getElementById('progress');
const hero = document.getElementById('heroInner');

let lastScrollY = 0;
let ticking = false;

function onScroll() {
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  bar.style.width = (scrollY / maxScroll * 100) + '%';
  nav.classList.toggle('solid', scrollY > 80);
  nav.classList.toggle('hide', scrollY > lastScrollY && scrollY > 300);
  
  lastScrollY = scrollY;

  if (scrollY < window.innerHeight) {
    hero.style.transform = `translateY(${scrollY * 0.25}px)`;
    hero.style.opacity = 1 - scrollY / (window.innerHeight * 0.8);
  }

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(onScroll);
    ticking = true;
  }
}, { passive: true });

const navLinks = [...document.querySelectorAll('nav ul a')];

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

document.querySelectorAll('section').forEach((section) => sectionObserver.observe(section))