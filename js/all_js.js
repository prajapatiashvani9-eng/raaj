// Mobile Menu Toggle
        const mobileMenu = document.querySelector('.mobile-menu');
        const navMenu = document.getElementById('nav-menu');

        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenu.querySelector('i').classList.toggle('fa-times');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenu.querySelector('i').classList.remove('fa-times');
            });
        });
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            const backToTop = document.getElementById('backToTop');
            
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            if (window.scrollY > 500) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        // Service cards animation on scroll
        const serviceCards = document.querySelectorAll('.service-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });
        
        serviceCards.forEach(card => {
            observer.observe(card);
        });

        // Form submission
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Back to top functionality
        document.getElementById('backToTop').addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Add floating animation to elements in hero section
        // const floatingElements = document.querySelectorAll('.floating-element');
        // floatingElements.forEach(element, index) => {
        //     element.style.animationDelay = `${index * 2}s`;
        // }



        // scrolling
        const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
    else {
        header.classList.remove('scrolled');
    }

    if (window.scrollY > 200) {
        backToTop.classList.add('active');
    }
    else {
        backToTop.classList.remove('active');
    }
});