/**
 * R-fitness Návsí - Modern Professional JavaScript
 * Enhanced functionality with performance optimizations
 */

class FitnessWebsite {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
    this.initializeComponents();
    this.setupAnimations();
    this.handlePageLoad();
  }

  bindEvents() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
    } else {
      this.onDOMReady();
    }
  }

  onDOMReady() {
    this.setupNavigation();
    this.setupThemeToggle();
    this.setupMobileMenu();
    this.setupScrollEffects();
    this.setupContactForm();
    this.setupPricingToggle();
    this.setupCursorFollower();
    this.setupStatsAnimation();
    this.setupAOSAnimations();
    this.setupPerformanceOptimizations();
  }

  initializeComponents() {
    // Initialize all major components
    this.navbar = document.getElementById('mainNav');
    this.loadingScreen = document.getElementById('loadingScreen');
    this.backToTopBtn = document.getElementById('backToTop');
    this.mobileToggle = document.getElementById('mobileToggle');
    this.navMenu = document.getElementById('navMenu');
    this.themeToggle = document.getElementById('themeToggle');
    this.cursorFollower = document.querySelector('.cursor-follower');
    
    // State management
    this.state = {
      isScrolling: false,
      currentSection: 'home',
      theme: localStorage.getItem('theme') || 'dark',
      mobileMenuOpen: false,
      lastScrollY: 0,
      isLoading: true
    };
  }

  handlePageLoad() {
    // Simulate loading with progress
    let progress = 0;
    const progressBar = document.querySelector('.loading-bar');
    
    const loadingInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
        setTimeout(() => {
          this.hideLoadingScreen();
        }, 500);
      }
      if (progressBar) {
        progressBar.style.width = progress + '%';
      }
    }, 100);
  }

  hideLoadingScreen() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.add('hidden');
      this.state.isLoading = false;
      
      // Trigger entrance animations
      setTimeout(() => {
        this.triggerEntranceAnimations();
      }, 300);
    }
  }

  triggerEntranceAnimations() {
    // Animate hero elements with stagger
    const heroElements = document.querySelectorAll('.hero-badge, .title-line, .hero-description, .hero-actions, .hero-stats');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.animation = `fadeInUp 0.8s ease ${index * 0.1}s both`;
      }, index * 100);
    });
  }

  // Navigation System
  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          this.scrollToSection(targetSection);
          this.setActiveNavLink(link);
          this.closeMobileMenu();
        }
      });
    });

    // Intersection Observer for active navigation
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-80px 0px -80px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          this.state.currentSection = sectionId;
          this.updateActiveNavLink(sectionId);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  scrollToSection(target) {
    const headerHeight = this.navbar ? this.navbar.offsetHeight : 80;
    const targetPosition = target.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  setActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    activeLink.classList.add('active');
  }

  updateActiveNavLink(sectionId) {
    const navLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (navLink) {
      this.setActiveNavLink(navLink);
    }
  }

  // Theme System
  setupThemeToggle() {
    if (!this.themeToggle) return;

    // Apply saved theme
    document.documentElement.setAttribute('data-theme', this.state.theme);
    this.updateThemeIcon();

    this.themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });
  }

  toggleTheme() {
    this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.state.theme);
    localStorage.setItem('theme', this.state.theme);
    
    // Add rotation animation
    this.themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      this.themeToggle.style.transform = '';
      this.updateThemeIcon();
    }, 300);
  }

  updateThemeIcon() {
    const themeIcon = this.themeToggle.querySelector('.theme-icon');
    if (themeIcon) {
      themeIcon.textContent = this.state.theme === 'dark' ? '☀️' : '🌙';
    }
  }

  // Mobile Menu
  setupMobileMenu() {
    if (!this.mobileToggle || !this.navMenu) return;

    this.mobileToggle.addEventListener('click', () => {
      this.toggleMobileMenu();
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.state.mobileMenuOpen && 
          !this.navMenu.contains(e.target) && 
          !this.mobileToggle.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.state.mobileMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    this.state.mobileMenuOpen = !this.state.mobileMenuOpen;
    this.navMenu.classList.toggle('active', this.state.mobileMenuOpen);
    this.mobileToggle.classList.toggle('active', this.state.mobileMenuOpen);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = this.state.mobileMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu() {
    this.state.mobileMenuOpen = false;
    this.navMenu.classList.remove('active');
    this.mobileToggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Scroll Effects
  setupScrollEffects() {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollEffects();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call
    this.updateScrollEffects();
  }

  updateScrollEffects() {
    const scrollY = window.scrollY;
