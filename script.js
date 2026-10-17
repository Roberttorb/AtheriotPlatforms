
const menuButton = document.getElementById('menuButton');
const navLinks = document.getElementById('navLinks');

function closeMenu() {
    if (!navLinks || !menuButton) return;

    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
    menuButton.setAttribute('aria-label', 'Open navigation');
}

if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');

        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        menuButton.textContent = open ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', closeMenu)
    );
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
});

document.addEventListener('click', e => {
    const target = e.target;

    if (!(target instanceof Element)) return;
    if (!target.closest('.nav')) closeMenu();
});

const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// for smooth scrolling

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (!href || href === '#') return;

        const target = document.querySelector(href);

        if (!target) return;

        e.preventDefault();

        const start = window.scrollY;
        const end = target.getBoundingClientRect().top + start;
        const distance = end - start;
        const duration = 250;
        const startTime = performance.now();

        function animate(time) {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easing = 1 - Math.pow(1 - progress, 3);

            window.scrollTo(0, start + distance * easing);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
        history.pushState(null, '', href);
    });
});

const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    function updateScrollButton() {
        const isMobile = window.innerWidth < 500;
        const hasScrolled = window.scrollY > 1500;

        scrollToTopBtn.classList.toggle(
            'visible',
            isMobile && hasScrolled
        );
    }

    window.addEventListener('scroll', updateScrollButton, {
        passive: true
    });

    window.addEventListener('resize', updateScrollButton);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    updateScrollButton();
}