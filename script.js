
const menuButton = document.getElementById('menuButton'),
    navLinks = document.getElementById('navLinks');

function closeMenu() {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
    menuButton.setAttribute('aria-label', 'Open navigation')
}

menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');

    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuButton.textContent = open ? '✕' : '☰'
});

navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', closeMenu)
);

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu()
});

document.addEventListener('click', e => {
    if (!e.target.closest('.nav')) closeMenu()
});

document.getElementById('year').textContent = new Date().getFullYear();


// for smooth scrolling

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));

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
        history.pushState(null, '', this.getAttribute('href'));
    });
});
