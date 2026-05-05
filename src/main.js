import './style.css'

// Sticky Header Effect
const header = document.querySelector('header');
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

document.addEventListener('DOMContentLoaded', () => {
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
    btn.innerText = 'Sending...';
    
    setTimeout(() => {
      btn.innerText = 'Message Sent Successfully';
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

console.log('Al Khabbaz Corporate Site Initialized');
