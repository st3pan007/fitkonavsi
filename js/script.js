// Close mobile menu when clicking on a link
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
    });
});

// Interactive timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items in the same timeline
        const timeline = this.closest('.timeline');
        timeline.querySelectorAll('.timeline-item').forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Add a visual feedback
        this.style.transform = 'translateY(-8px) translateX(10px) scale(1.02)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
});

// Scroll to top functionality
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Interactive mouse effects
document.querySelectorAll('.interactive-element').forEach(element => {
    element.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const beforeElement = this.querySelector('::before') || this;
        if (beforeElement) {
            beforeElement.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 82, 255, 0.1) 0%, transparent 50%)`;
        }
    });
});

// Add glitch effect to logo on hover
const logo = document.querySelector('.logo');
logo.addEventListener('mouseenter', function() {
    this.style.animation = 'glitch 0.3s ease-in-out';
});

logo.addEventListener('animationend', function() {
    this.style.animation = '';
});

// Add glitch keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translateX(0); }
        20% { transform: translateX(-2px); }
        40% { transform: translateX(2px); }
        60% { transform: translateX(-1px); }
        80% { transform: translateX(1px); }
        100% { transform: translateX(0); }
    }
`;
document.head.appendChild(style);

// Enhanced timeline interactivity
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.addEventListener('mouseenter', function() {
        // Highlight timeline line
        const timeline = this.closest('.timeline');
        const timelineLine = timeline.querySelector('::before');
        
        // Add glow effect
        this.style.boxShadow = '0 20px 50px rgba(0, 82, 255, 0.3), inset 0 0 20px rgba(0, 82, 255, 0.1)';
        
        // Add data visualization on hover
        const year = this.getAttribute('data-year');
        if (year && !this.querySelector('.tooltip')) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.style.cssText = `
                position: absolute;
                top: -40px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(45deg, var(--primary-blue), var(--light-blue));
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: bold;
                z-index: 10;
                animation: fadeInTooltip 0.3s ease;
            `;
            tooltip.textContent = `Rok: ${year}`;
            this.appendChild(tooltip);
        }
    });

    item.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
        const tooltip = this.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// Add tooltip animation
const tooltipStyle = document.createElement('style');
tooltipStyle.textContent = `
    @keyframes fadeInTooltip {
        0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
        100% { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
`;
document.head.appendChild(tooltipStyle);

// Performance optimization - throttle scroll events
let ticking = false;
function updateOnScroll() {
    // Update any scroll-based animations here
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Preload critical resources
const preloadLinks = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Orbitron:wght@400;700;900&display=swap'
];

preloadLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
});

console.log('🚀 R-fitness Návsí - Professional Dark Theme Loaded Successfully!');// R-fitness Návsí - Main JavaScript

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Sun icon SVG
const sunIcon = `<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>`;

// Moon icon SVG  
const moonIcon = `<path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/>`;

// Set default theme to dark
let currentTheme = 'dark';
body.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.innerHTML = moonIcon;
        themeToggle.title = 'Přepnout na tmavý motiv';
    } else {
        themeIcon.innerHTML = sunIcon;
        themeToggle.title = 'Přepnout na světlý motiv';
    }
}

// Initialize icon
updateThemeIcon(currentTheme);

// Theme toggle event
themeToggle.addEventListener('click', () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add rotation animation
    themeToggle.classList.add('rotating');
    
    // Change theme after animation starts
    setTimeout(() => {
        body.setAttribute('data-theme', newTheme);
        currentTheme = newTheme;
        updateThemeIcon(newTheme);
    }, 150);
    
    // Remove animation class
    setTimeout(() => {
        themeToggle.classList.remove('rotating');
    }, 600);
});

// Loading overlay
window.addEventListener('load', () => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, 1000);
});

// Particle system
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 8 + 8) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Timeline animation with stagger effect
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const timelineItems = entry.target.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 300);
            });
        }
    });
}, observerOptions);

// Observe timelines
document.querySelectorAll('.timeline').forEach(timeline => {
    timelineObserver.observe(timeline);
});

// Counter animation for stats
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / 60;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + '+';
                }
            }, 50);
        }
    });
}, observerOptions);

// Observe stat numbers
document.querySelectorAll('.stat-number').forEach(stat => {
    counterObserver.observe(stat);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');

mobileMenuBtn.addEventListener('click', function() {
    nav.classList.toggle('active');
    this.textContent = nav.classList.contains('active') ? '✕' : '☰';
});
