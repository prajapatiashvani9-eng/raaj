// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenu.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenu.querySelector('i').classList.remove('fa-times');
        mobileMenu.querySelector('i').classList.add('fa-bars');
    });
});

// Back to top functionality
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    
    // Header scroll effect
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Enhanced smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (targetId === '#' || targetId === '#home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        // Check if target exists
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Hero section animations
window.addEventListener('load', () => {
    const welcome = document.querySelector('.center-text');
    const rectangles = [
        document.querySelector('.left.rect1'),
        document.querySelector('.right.rect5'),
        document.querySelector('.left.rect2'),
        document.querySelector('.right.rect6'),
        document.querySelector('.left.rect3'),
        document.querySelector('.right.rect7'),
        document.querySelector('.left.rect4'),
        document.querySelector('.right.rect8')
    ];

    // Animate welcome text
    setTimeout(() => {
        if (welcome) {
            welcome.classList.add('glow');
            welcome.style.animation = 'fadeIn 1s ease forwards';
        }
    }, 200);

    // Animate rectangles sequentially
    rectangles.forEach((rect, index) => {
        if (rect) {
            setTimeout(() => {
                rect.classList.add('show', 'glow');
            }, 500 + index * 150);
        }
    });
});

// About section animations on scroll
const aboutBoxes = document.querySelectorAll('.about-box');
if (aboutBoxes.length > 0) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    aboutBoxes.forEach(box => {
        aboutObserver.observe(box);
    });
}

// Service items hover effects
const serviceItems = document.querySelectorAll('.service-item, .qualification-card');
serviceItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Button hover effects
const moreInfoBtns = document.querySelectorAll('.more-info-btn, .btn-more');
moreInfoBtns.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Service cards hover effects
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon i');
        if (icon) {
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.service-icon i');
        if (icon) {
            icon.style.transform = 'scale(1)';
        }
    });
});

// Initialize animations for elements
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation to all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Intersection Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Prevent form submission if any form exists
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Form submitted successfully!');
        this.reset();
    });
});