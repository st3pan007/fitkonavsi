// R-fitness Návsí - Complete Working JavaScript (FIXED VERSION)

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');

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
        if (themeIcon) {
            if (theme === 'light') {
                themeIcon.innerHTML = moonIcon;
                if (themeToggle) themeToggle.title = 'Přepnout na tmavý motiv';
            } else {
                themeIcon.innerHTML = sunIcon;
                if (themeToggle) themeToggle.title = 'Přepnout na světlý motiv';
            }
        }
    }

    // Initialize icon
    updateThemeIcon(currentTheme);

    // Theme toggle event
    if (themeToggle) {
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
    }

    // Loading overlay
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
    }, 1000);

    // Particle system
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        
        if (particlesContainer) {
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = (Math.random() * 8 + 8) + 's';
                particlesContainer.appendChild(particle);
            }
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

    // Intersection Observer options
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    // Basic animations observer
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

    // ==========================================
    // OPRAVENÁ ANIMACE ČÍSLA S KONTROLOU CHYB
    // ==========================================
    
    // CSS oprava pro stabilní layout
    const counterCSS = document.createElement('style');
    counterCSS.textContent = `
        .stat-number {
            min-width: 120px !important;
            display: inline-block !important;
            text-align: center !important;
            font-variant-numeric: tabular-nums !important;
            letter-spacing: 0.05em !important;
        }
    `;
    document.head.appendChild(counterCSS);

    // Counter observer s kompletní kontrolou chyb
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetValue = parseInt(counter.getAttribute('data-target'));
                
                console.log('Counter target:', targetValue);
                
                // Kontrola validity
                if (!targetValue || isNaN(targetValue)) {
                    console.error('Invalid target value:', targetValue);
                    return;
                }

                // Kontrola jestli už animace neběžela
                if (counter.hasAttribute('data-animated')) {
                    console.log('Animation already ran for this counter');
                    return;
                }
                
                counter.setAttribute('data-animated', 'true');
                console.log('Starting animation for:', targetValue);

                let current = 0;
                const increment = targetValue / 60; // 60 kroků
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= targetValue) {
                        counter.textContent = targetValue + '+';
                        clearInterval(timer);
                        console.log('Animation completed for:', targetValue);
                    } else {
                        counter.textContent = Math.floor(current) + '+';
                    }
                }, 50); // 50ms kroky
            }
        });
    }, observerOptions);

    // Observe stat numbers s kontrolou existence
    const statNumbers = document.querySelectorAll('.stat-number');
    console.log('Found stat numbers:', statNumbers.length);
    
    if (statNumbers.length > 0) {
        statNumbers.forEach((stat, index) => {
            console.log(`Observing stat ${index}:`, stat.getAttribute('data-target'));
            counterObserver.observe(stat);
        });
    } else {
        console.warn('No .stat-number elements found!');
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });

        // Close mobile menu when clicking on a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            });
        });
    }

    // Interactive timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items in the same timeline
            const timeline = this.closest('.timeline');
            if (timeline) {
                timeline.querySelectorAll('.timeline-item').forEach(i => i.classList.remove('active'));
            }
            
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

    if (scrollToTopBtn) {
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
    }

    // Interactive mouse effects
    document.querySelectorAll('.interactive-element').forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', x + 'px');
            this.style.setProperty('--mouse-y', y + 'px');
        });
    });

    // Add glitch effect to logo on hover
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease-in-out';
        });

        logo.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    }

    // Add glitch keyframes
    const glitchStyle = document.createElement('style');
    glitchStyle.textContent = `
        @keyframes glitch {
            0% { transform: translateX(0); }
            20% { transform: translateX(-2px); }
            40% { transform: translateX(2px); }
            60% { transform: translateX(-1px); }
            80% { transform: translateX(1px); }
            100% { transform: translateX(0); }
        }
    `;
    document.head.appendChild(glitchStyle);

    // Enhanced timeline interactivity
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
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

    // ==========================================
    //   GALLERY FUNCTIONALITY
    // ==========================================

    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    let currentImageIndex = 0;
    let visibleImages = [];

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px) scale(0.9)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
            
            updateVisibleImages();
        });
    });

    // Update visible images array
    function updateVisibleImages() {
        visibleImages = [];
        galleryItems.forEach(item => {
            if (!item.classList.contains('hidden')) {
                const img = item.querySelector('img');
                const title = item.querySelector('h4');
                const description = item.querySelector('p');
                
                if (img && title && description) {
                    visibleImages.push({
                        src: img.src,
                        alt: img.alt,
                        title: title.textContent,
                        description: description.textContent
                    });
                }
            }
        });
    }

    // Initialize visible images
    updateVisibleImages();

    // Lightbox functionality
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            if (this.classList.contains('hidden')) return;
            
            const img = this.querySelector('img');
            const title = this.querySelector('h4');
            const description = this.querySelector('p');
            
            if (img && title && description) {
                currentImageIndex = visibleImages.findIndex(image => image.src === img.src);
                openLightbox(img.src, `${title.textContent} - ${description.textContent}`);
            }
        });
    });

    function openLightbox(src, caption) {
        if (lightboxImage && lightboxCaption && lightbox) {
            lightboxImage.src = src;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            document.addEventListener('keydown', handleKeydown);
        }
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeydown);
        }
    }

    function showPrevImage() {
        if (visibleImages.length === 0 || !lightboxImage || !lightboxCaption) return;
        
        currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : visibleImages.length - 1;
        const image = visibleImages[currentImageIndex];
        
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = image.src;
            lightboxCaption.textContent = `${image.title} - ${image.description}`;
            lightboxImage.style.opacity = '1';
        }, 150);
    }

    function showNextImage() {
        if (visibleImages.length === 0 || !lightboxImage || !lightboxCaption) return;
        
        currentImageIndex = currentImageIndex < visibleImages.length - 1 ? currentImageIndex + 1 : 0;
        const image = visibleImages[currentImageIndex];
        
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = image.src;
            lightboxCaption.textContent = `${image.title} - ${image.description}`;
            lightboxImage.style.opacity = '1';
        }, 150);
    }

    function handleKeydown(e) {
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    }

    // Event listeners s kontrolou existence
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    if (lightboxImage) {
        lightboxImage.addEventListener('dragstart', function(e) {
            e.preventDefault();
        });
    }

    // Add loading animation to images
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });

    // Intersection Observer for gallery items animation
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    galleryItems.forEach(item => {
        galleryObserver.observe(item);
    });

    console.log('🖼️ Gallery loaded successfully with', galleryItems.length, 'images');
    console.log('🚀 R-fitness Návsí - ALL FUNCTIONS LOADED SUCCESSFULLY!');
});

// Performance optimization
let ticking = false;
function updateOnScroll() {
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

// MANUÁLNÍ SPUŠTĚNÍ PRO DEBUGGING
window.manualStartCounters = function() {
    console.log('🔧 Manual counter start...');
    
    const statNumbers = document.querySelectorAll('.stat-number');
    console.log('Manual: Found', statNumbers.length, 'stat numbers');
    
    statNumbers.forEach((counter, index) => {
        const target = parseInt(counter.getAttribute('data-target'));
        console.log(`Manual: Counter ${index} target:`, target);
        
        if (target && !isNaN(target)) {
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + '+';
                    clearInterval(timer);
                    console.log(`Manual: Completed ${target}`);
                } else {
                    counter.textContent = Math.floor(current) + '+';
                }
            }, 60);
        }
    });
};
