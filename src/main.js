import './style.css'
import { translations } from './translations.js'

// Sticky Header & Mobile Menu Logic
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.setAttribute('data-lucide', 'x');
    } else {
      icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
  });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    }
  });
});

// --- Language Switcher Logic ---
let currentLang = localStorage.getItem('site-lang') || 'en';

function applyTranslations(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = key.split('.').reduce((obj, i) => (obj ? obj[i] : null), translations[lang]);
    if (translation) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translation;
      } else {
        el.innerText = translation;
      }
    }
  });

  const placeHolders = document.querySelectorAll('[data-i18n-placeholder]');
  placeHolders.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translation = key.split('.').reduce((obj, i) => (obj ? obj[i] : null), translations[lang]);
    if (translation) {
      el.placeholder = translation;
    }
  });

  // Update HTML direction and lang
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  // Update button text
  const langBtnText = document.querySelector('#lang-btn span');
  if (langBtnText) {
    langBtnText.innerText = lang === 'en' ? 'AR' : 'EN';
  }

  // Update AOS if initialized
  if (window.AOS) {
    window.AOS.refresh();
  }
}

const langBtn = document.querySelector('#lang-btn');
if (langBtn) {
  langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('site-lang', currentLang);
    applyTranslations(currentLang);
  });
}

// Initial application
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(currentLang);
  
  // Hero Slider Logic
  const slides = document.querySelectorAll('.hero-bg-slider .slide');
  const dots = document.querySelectorAll('.slider-nav .dot');
  let currentSlide = 0;

  if (slides.length > 0) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      if(dots.length > 0) dots[currentSlide].classList.remove('active');
      
      currentSlide = (currentSlide + 1) % slides.length;
      
      slides[currentSlide].classList.add('active');
      if(dots.length > 0) dots[currentSlide].classList.add('active');
    }, 5000);
  }
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.height = '70px';
    header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
  } else {
    header.style.height = '80px';
    header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    header.style.boxShadow = 'none';
  }
});

// Smooth Scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Form Submission (Simulated)
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    const originalText = btn.innerText;
    
    btn.disabled = true;
    btn.innerText = currentLang === 'en' ? 'Sending...' : 'جاري الإرسال...';
    
    setTimeout(() => {
      btn.innerText = currentLang === 'en' ? 'Message Sent Successfully' : 'تم إرسال الرسالة بنجاح';
      btn.style.backgroundColor = '#10B981'; // Success Green
      contactForm.reset();
      
      setTimeout(() => {
        btn.disabled = false;
        btn.innerText = originalText;
        btn.style.backgroundColor = '';
      }, 3000);
    }, 1500);
  });
}

console.log('Al Khabbaz Corporate Site Initialized with i18n support');
