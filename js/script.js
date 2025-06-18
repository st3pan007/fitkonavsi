// R-fitness Návsí - Main JavaScript with Clean Animations

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
    
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 8 + 8) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Easing functions for smooth animations
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Initialize particles
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

    // Intersection Observer for animations with improved settings
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation for better visual flow
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 150);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });

    // Timeline animation with improved stagger effect
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const timelineItems = entry.target.querySelectorAll('.timeline-item');
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 200); // Increased delay for cleaner effect
                });
            }
        });
    }, observerOptions);

    // Observe timelines
    document.querySelectorAll('.timeline').forEach(timeline => {
        timelineObserver.observe(timeline);
    });

    // ==========================================
    // CLEAN COUNTER ANIMATION WITH STABLE LAYOUT
    // ==========================================
    
    function setupCounterStableLayout(counter, finalText) {
        // Create temporary element to measure final width
        const measureElement = document.createElement('span');
        measureElement.style.cssText = `
            visibility: hidden;
            position: absolute;
            font-family: ${getComputedStyle(counter).fontFamily};
            font-size: ${getComputedStyle(counter).fontSize};
            font-weight: ${getComputedStyle(counter).fontWeight};
            letter-spacing: ${getComputedStyle(counter).letterSpacing};
        `;
        measureElement.textContent = finalText;
        
        document.body.appendChild(measureElement);
        const finalWidth = measureElement.offsetWidth;
        document.body.removeChild(measureElement);
        
        // Set stable layout properties
        counter.style.cssText += `
            min-width: ${Math.max(finalWidth, 80)}px;
            display: inline-block;
            text-align: center;
            font-variant-numeric: tabular-nums;
        `;
        
        return finalWidth;
    }

    function animateCounter(counter, target, duration = 2000) {
        const finalText = target + '+';
        
        // Setup stable layout first
        setupCounterStableLayout(counter, finalText);
        
        const startTime = performance.now();
        const startValue = 0;
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Use easing function for smooth animation
            const easedProgress = easeOutCubic(progress);
            const currentValue = Math.floor(startValue + (target * easedProgress));
            
            // Update display
            if (progress < 1) {
                counter.textContent = currentValue + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = finalText;
                // Add completion effect
                counter.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    counter.style.transform = 'scale(1)';
                }, 200);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                
                // Check if animation already ran
                if (counter.hasAttribute('data-animated')) return;
                counter.setAttribute('data-animated', 'true');
                
                // Add smooth transition for the scale effect
                counter.style.transition = 'transform 0.2s ease-out';
                
                // Start clean animation with delay for better visual flow
                setTimeout(() => {
                    animateCounter(counter, target, 2500); // Longer duration for smoother effect
                }, 300);
            }
        });
    }, {
        threshold: 0.3, // Higher threshold for more intentional triggering
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    console.log('Found stat numbers:', statNumbers.length);
    
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });

    // Header scroll effect with smoother transition
    let lastScrollY = 0;
    
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
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

    // Enhanced timeline items with cleaner interactions
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items in the same timeline
            const timeline = this.closest('.timeline');
            timeline.querySelectorAll('.timeline-item').forEach(i => {
                i.classList.remove('active');
                i.style.transform = '';
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Smoother visual feedback
            this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = 'translateY(-8px) translateX(10px) scale(1.02)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) translateX(5px)';
            }, 300);
        });
    });

    // Scroll to top functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                if (window.scrollY > 500) {
                    scrollToTopBtn.classList.add('visible');
                } else {
                    scrollToTopBtn.classList.remove('visible');
                }
            }, 10);
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Enhanced interactive mouse effects
    document.querySelectorAll('.interactive-element').forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // More subtle effect
            this.style.setProperty('--mouse-x', x + 'px');
            this.style.setProperty('--mouse-y', y + 'px');
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.removeProperty('--mouse-x');
            this.style.removeProperty('--mouse-y');
        });
    });

    // Logo glitch effect with cleaner animation
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.4s ease-in-out';
        });

        logo.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    }

    // Improved glitch keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch {
            0% { transform: translateX(0); }
            15% { transform: translateX(-2px) scale(1.01); }
            30% { transform: translateX(2px) scale(0.99); }
            45% { transform: translateX(-1px) scale(1.02); }
            60% { transform: translateX(1px) scale(0.98); }
            75% { transform: translateX(-0.5px) scale(1.01); }
            100% { transform: translateX(0) scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Enhanced timeline interactivity with cleaner effects
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            // Cleaner glow effect
            this.style.transition = 'all 0.3s ease-out';
            this.style.boxShadow = '0 15px 40px rgba(0, 82, 255, 0.25), inset 0 0 15px rgba(0, 82, 255, 0.08)';
            
            // Enhanced tooltip
            const year = this.getAttribute('data-year');
            if (year && !this.querySelector('.tooltip')) {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.style.cssText = `
                    position: absolute;
                    top: -45px;
                    left: 50%;
                    transform: translateX(-50%) translateY(10px);
                    background: linear-gradient(135deg, var(--primary-blue), var(--light-blue));
                    color: white;
                    padding: 10px 18px;
                    border-radius: 25px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    z-index: 10;
                    opacity: 0;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 8px 25px rgba(0, 82, 255, 0.3);
                `;
                tooltip.textContent = `${year}`;
                this.appendChild(tooltip);
                
                // Animate tooltip in
                requestAnimationFrame(() => {
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'translateX(-50%) translateY(0)';
                });
            }
        });

        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateX(-50%) translateY(10px)';
                setTimeout(() => tooltip.remove(), 300);
            }
        });
    });

    // ==========================================
    //   ENHANCED GALLERY FUNCTIONALITY
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

    // Enhanced filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button with smoother transition
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.style.transform = 'translateY(0)';
            });
            this.classList.add('active');
            this.style.transform = 'translateY(-2px)';
            
            // Filter gallery items with improved animation
            galleryItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, index * 50); // Faster stagger for cleaner effect
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 200);
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
                const title = item.querySelector('h4')?.textContent || '';
                const description = item.querySelector('p')?.textContent || '';
                visibleImages.push({
                    src: img.src,
                    alt: img.alt,
                    title: title,
                    description: description
                });
            }
        });
    }

    // Initialize visible images
    updateVisibleImages();

    // Enhanced lightbox functionality
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            if (this.classList.contains('hidden')) return;
            
            const img = this.querySelector('img');
            const title = this.querySelector('h4')?.textContent || '';
            const description = this.querySelector('p')?.textContent || '';
            
            currentImageIndex = visibleImages.findIndex(image => image.src === img.src);
            
            openLightbox(img.src, `${title} - ${description}`);
        });
    });

    function openLightbox(src, caption) {
        if (!lightbox || !lightboxImage) return;
        
        lightboxImage.src = src;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        document.addEventListener('keydown', handleKeydown);
    }

    function closeLightbox() {
        if (!lightbox) return;
        
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeydown);
    }

    function showPrevImage() {
        if (visibleImages.length === 0 || !lightboxImage || !lightboxCaption) return;
        
        currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : visibleImages.length - 1;
        const image = visibleImages[currentImageIndex];
        
        // Smooth transition
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
        
        // Smooth transition
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

    // Event listeners with null checks
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

    // Enhanced loading animation for images
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            });
            
            img.style.cssText += `
                opacity: 0;
                transform: scale(1.05);
                transition: all 0.4s ease-out;
            `;
        }
    });

    // Enhanced gallery items animation
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 80);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    galleryItems.forEach(item => {
        galleryObserver.observe(item);
    });

    console.log('🖼️ Gallery loaded successfully with', galleryItems.length, 'images');
    console.log('🚀 R-fitness Návsí - Enhanced Clean Theme Loaded Successfully!');
});

// Optimized scroll performance
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

window.addEventListener('scroll', requestTick, { passive: true });

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
