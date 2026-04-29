// Nav scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMobile = document.querySelector('.nav-mobile-menu');
if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
        navMobile.classList.toggle('open');
        navToggle.classList.toggle('open');
    });
    navMobile.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMobile.classList.remove('open');
            navToggle.classList.remove('open');
        });
    });
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Console easter egg
window.addEventListener('load', () => {
    setTimeout(() => {
        console.clear();
        console.log('Jazz DeFreitas — Senior Full Stack Engineer')
        console.log('%c Open to Dev roles, consulting, & interesting projects. jazzdefreitas@gmail.com')
    }, 500);
});
