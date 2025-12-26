// ===================================
// DOM Elements
// ===================================
const header = document.querySelector('.header');
const backToTop = document.getElementById('backToTop');
const faqItems = document.querySelectorAll('.faq-item');
const form = document.getElementById('seminar-form');
const modal = document.getElementById('thanksModal');

// ===================================
// Header Scroll Effect
// ===================================
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add/remove shadow based on scroll
    if (currentScrollY > 0) {
        header.style.boxShadow = '0 4px 12px rgba(134, 134, 134, 0.75)';
    } else {
        header.style.boxShadow = '0 4px 4px rgba(156, 156, 156, 0.25)';
    }
    
    lastScrollY = currentScrollY;
});

// ===================================
// Back to Top Button
// ===================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// FAQ Accordion
// ===================================
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Form Submission
// ===================================
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate form
    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const course = form.querySelector('input[name="course"]:checked');
    const privacy = form.querySelector('input[name="privacy"]').checked;
    
    if (!name || !email || !course || !privacy) {
        alert('必須項目を入力してください。');
        return;
    }
    
    // Show thanks modal
    modal.classList.add('active');
    
    // Reset form
    form.reset();
});

// ===================================
// Modal Functions
// ===================================
function closeModal() {
    modal.classList.remove('active');
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .course-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animation class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===================================
// Mobile Menu Toggle (for future enhancement)
// ===================================
function createMobileMenu() {
    const nav = document.querySelector('.nav');
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Insert hamburger before nav in header
    const headerInner = document.querySelector('.header-inner');
    
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Initialize on smaller screens
if (window.innerWidth <= 768) {
    // Mobile-specific initializations can go here
}

// ===================================
// Form Input Animations
// ===================================
const inputs = document.querySelectorAll('.form-group input');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// ===================================
// Lazy Loading Images
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Console Welcome Message
// ===================================
console.log('%c🎨 DESIGN CAMPUS 1Day クリエイティブセミナー', 'color: #0FABB5; font-size: 20px; font-weight: bold;');
console.log('%cこのサイトはFigmaデザインから作成されました。', 'color: #333; font-size: 14px;');


