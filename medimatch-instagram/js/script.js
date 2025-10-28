// ========================================
// FAQ Accordion Functionality
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// ========================================
// Smooth Scroll for CTA Buttons
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('a[href^="#"]');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's an external link
            if (href === '#privacy' || href === '#company') {
                e.preventDefault();
                alert('このリンクは実装予定です。');
                return;
            }

            // Handle internal navigation
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// ========================================
// Scroll Animation (Fade in on scroll)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add fade-in animation to sections
    const sections = document.querySelectorAll('.value-block, .faq-item, .counselor-section, .trust-section');

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// ========================================
// LINE Link Handler (Optional)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const lineButtons = document.querySelectorAll('a[href*="line.me"]');

    lineButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track click event (for analytics if needed)
            console.log('LINE button clicked');
        });
    });
});

// ========================================
// Mobile Menu Toggle (if needed in future)
// ========================================
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// ========================================
// Form Validation (if contact form is added)
// ========================================
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const email = form.querySelector('input[type="email"]');
    const name = form.querySelector('input[type="text"]');

    if (name && !name.value.trim()) {
        alert('お名前を入力してください。');
        return false;
    }

    if (email && !validateEmail(email.value)) {
        alert('有効なメールアドレスを入力してください。');
        return false;
    }

    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========================================
// Utility: Debounce Function
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// Window Resize Handler
// ========================================
let windowWidth = window.innerWidth;

window.addEventListener('resize', debounce(function() {
    const newWidth = window.innerWidth;

    // Only reload if crossing mobile/desktop breakpoint
    if ((windowWidth <= 768 && newWidth > 768) || (windowWidth > 768 && newWidth <= 768)) {
        windowWidth = newWidth;
        console.log('Viewport changed:', newWidth);
    }
}, 250));

// ========================================
// Console Log (Remove in production)
// ========================================
console.log('MediMatch Instagram LP - Initialized');
console.log('Version: 1.0.0');
