
'use strict';

// ==========================================
// 1. MOBILE NAVIGATION MENU
// ==========================================

const menuButton = document.getElementById('menuButton');
const navLinks = document.getElementById('navLinks');

function closeMenu() {
    if (!navLinks || !menuButton) return;

    navLinks.classList.remove('open');

    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    menuButton.textContent = '☰';
}

if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');

        menuButton.setAttribute('aria-expanded', String(isOpen));
        menuButton.setAttribute(
            'aria-label',
            isOpen ? 'Close navigation' : 'Open navigation'
        );

        menuButton.textContent = isOpen ? '✕' : '☰';
    });

    // Close menu after clicking navigation links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// Close menu using Escape key
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeMenu();
    }
});

// Close menu when clicking outside navigation
document.addEventListener('click', event => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    if (!target.closest('.nav')) {
        closeMenu();
    }
});


// ==========================================
// 2. AUTOMATIC COPYRIGHT YEAR
// ==========================================

const yearElement = document.getElementById('year');

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ==========================================
// 3. SMOOTH NAVIGATION SCROLLING
// ==========================================

const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
);

function scrollBehavior() {
    return reducedMotion.matches ? 'instant' : 'smooth';
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
        const href = link.getAttribute('href');

        if (!href || href === '#') return;

        const target = document.getElementById(
            decodeURIComponent(href.slice(1))
        );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: scrollBehavior(),
            block: 'start'
        });

        // Update URL without page reload
        history.pushState(null, '', href);
    });
});


// ==========================================
// 4. MOBILE SCROLL TO TOP BUTTON
// ==========================================

const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    let ticking = false;

    function updateScrollButton() {
        const isMobile = window.innerWidth < 500;
        const hasScrolled = window.scrollY > 1500;

        const shouldShow = isMobile && hasScrolled;

        // Update only when visibility changes
        if (
            scrollToTopBtn.classList.contains('visible') !==
            shouldShow
        ) {
            scrollToTopBtn.classList.toggle(
                'visible',
                shouldShow
            );
        }
    }

    function requestScrollUpdate() {
        if (ticking) return;

        ticking = true;

        requestAnimationFrame(() => {
            updateScrollButton();
            ticking = false;
        });
    }

    // Passive listener for better scrolling performance
    window.addEventListener('scroll', requestScrollUpdate, {
        passive: true
    });

    window.addEventListener('resize', requestScrollUpdate);

    // Smoothly return to top
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: scrollBehavior()
        });
    });

    // Check initial position on page load
    updateScrollButton();
}
