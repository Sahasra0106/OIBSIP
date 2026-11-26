
// Smooth scrolling for navigation links
document.querySelectorAll('nav a, .hero-btn').forEach(link => {
    link.addEventListener('click', function (event) {
        const targetId = this.getAttribute('href');

        if (targetId && targetId.startsWith('#')) {
            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Reveal sections while scrolling
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll('.section').forEach(section => {
    section.classList.add('reveal');
    observer.observe(section);
});

// Highlight active navigation link
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${current}`
        );
    });
});
