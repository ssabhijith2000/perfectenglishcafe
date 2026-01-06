// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Enhanced smooth scrolling for anchor links with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            
            // Use smooth scroll with custom easing
            const startPosition = window.pageYOffset;
            const distance = offsetTop - startPosition;
            const duration = 800;
            let start = null;
            
            function easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = easeInOutCubic(progress);
                
                window.scrollTo(0, startPosition + distance * ease);
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// Navbar background on scroll with smooth transitions
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
let ticking = false;

function updateNavbar() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
    
    lastScroll = currentScroll;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// Testimonial slider functionality
const testimonialCards = [
    {
        text: "My confidence in speaking English has improved tremendously. The teachers are supportive and the learning environment is fantastic!",
        author: "Azia A",
        location: "TVM, Kerala"
    },
    {
        text: "The one-on-one coaching sessions have been incredibly helpful. I've seen significant improvement in my fluency and confidence.",
        author: "Rajesh K",
        location: "Mumbai, Maharashtra"
    },
    {
        text: "Perfect English Cafe has transformed my career. I can now communicate effectively with international clients. Highly recommended!",
        author: "Priya S",
        location: "Bangalore, Karnataka"
    }
];

let currentTestimonial = 0;
const testimonialCard = document.querySelector('.testimonial-card');
const prevBtn = document.querySelector('.testimonial-btn.prev');
const nextBtn = document.querySelector('.testimonial-btn.next');

function updateTestimonial(index) {
    if (testimonialCard) {
        // Fade out
        testimonialCard.style.opacity = '0';
        testimonialCard.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            const testimonial = testimonialCards[index];
            const textElement = testimonialCard.querySelector('.testimonial-text');
            const nameElement = testimonialCard.querySelector('.author-name');
            const locationElement = testimonialCard.querySelector('.author-location');
            
            if (textElement) textElement.textContent = `"${testimonial.text}"`;
            if (nameElement) nameElement.textContent = testimonial.author;
            if (locationElement) locationElement.textContent = testimonial.location;
            
            // Fade in with smooth animation
            setTimeout(() => {
                testimonialCard.style.opacity = '1';
                testimonialCard.style.transform = 'scale(1)';
            }, 50);
        }, 300);
    }
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        updateTestimonial(currentTestimonial);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        updateTestimonial(currentTestimonial);
    });
}

// Enhanced Intersection Observer for smooth scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Remove observer after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animatable elements
const animateElements = document.querySelectorAll('.about-content, .mission-content, .cta-title, .section-header');

animateElements.forEach((element, index) => {
    observer.observe(element);
});

// Observe footer sections separately
const footerSections = document.querySelectorAll('.footer-content > div');
footerSections.forEach((section, index) => {
    observer.observe(section);
});

// Smooth parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');
        const appCard = hero.querySelector('.app-download-card');
        
        if (scrolled < hero.offsetHeight) {
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / 500);
            }
            if (appCard) {
                appCard.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        }
    });
}

// Form validation (if contact form is added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Smooth hover effects for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth transitions for social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scroll reveal for sections
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    revealObserver.observe(section);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set initial testimonial
    if (testimonialCard) {
        updateTestimonial(0);
        testimonialCard.classList.add('active');
    }
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.section-header').forEach(header => {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        });
    }, 300);
    
    // Animate CTA on load
    setTimeout(() => {
        const ctaTitle = document.querySelector('.cta-title');
        if (ctaTitle) {
            ctaTitle.classList.add('animate');
        }
    }, 500);
});

