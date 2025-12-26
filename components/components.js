/**
 * DESIGN CAMPUS コンポーネントライブラリ
 * Figmaデザインから抽出したコンポーネントのJavaScript
 */

// ===================================
// Header Component
// ===================================
class DCHeader {
    constructor(element) {
        this.header = element;
        this.menuBtn = element.querySelector('.dc-header__menu-btn');
        this.nav = element.querySelector('.dc-header__nav');
        this.lastScrollY = 0;
        
        this.init();
    }

    init() {
        // Mobile menu toggle
        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', () => this.toggleMenu());
        }

        // Scroll effects
        window.addEventListener('scroll', () => this.handleScroll());

        // Close menu on nav link click
        const navLinks = this.nav?.querySelectorAll('a');
        navLinks?.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!this.header.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.menuBtn.classList.toggle('active');
        this.nav.classList.toggle('active');
    }

    closeMenu() {
        this.menuBtn?.classList.remove('active');
        this.nav?.classList.remove('active');
    }

    handleScroll() {
        const currentScrollY = window.scrollY;

        // Enhanced shadow on scroll
        if (currentScrollY > 10) {
            this.header.style.boxShadow = '0px 4px 12px rgba(134, 134, 134, 0.75)';
        } else {
            this.header.style.boxShadow = '0px 4px 4px rgba(156, 156, 156, 0.25)';
        }

        this.lastScrollY = currentScrollY;
    }
}

// ===================================
// Card Component
// ===================================
class DCCard {
    constructor(element) {
        this.card = element;
        this.init();
    }

    init() {
        // Add hover effects via JS for more complex interactions
        this.card.addEventListener('mouseenter', () => this.onMouseEnter());
        this.card.addEventListener('mouseleave', () => this.onMouseLeave());
    }

    onMouseEnter() {
        // Additional hover effects can be added here
    }

    onMouseLeave() {
        // Reset effects
    }
}

// ===================================
// Button Component
// ===================================
class DCButton {
    constructor(element) {
        this.button = element;
        this.init();
    }

    init() {
        // Ripple effect on click
        this.button.addEventListener('click', (e) => this.createRipple(e));
    }

    createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        // Ensure button has relative positioning
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        
        button.appendChild(ripple);

        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }
}

// ===================================
// Smooth Scroll
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.dc-header')?.offsetHeight || 82;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Intersection Observer for Animations
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('dc-animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards
    document.querySelectorAll('.dc-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Add animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .dc-animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(animationStyles);

// ===================================
// Initialize Components
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Header
    const header = document.querySelector('.dc-header');
    if (header) {
        new DCHeader(header);
    }

    // Initialize Cards
    document.querySelectorAll('.dc-card').forEach(card => {
        new DCCard(card);
    });

    // Initialize Buttons
    document.querySelectorAll('.dc-btn').forEach(button => {
        new DCButton(button);
    });

    // Initialize smooth scroll
    initSmoothScroll();

    // Initialize scroll animations
    initScrollAnimations();

    // Console message
    console.log('%c🎨 DESIGN CAMPUS Component Library', 'color: #0FABB5; font-size: 16px; font-weight: bold;');
    console.log('%cHeader, Card, Footer コンポーネントが読み込まれました', 'color: #333; font-size: 12px;');
});

// ===================================
// Export for module usage
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DCHeader, DCCard, DCButton };
}

