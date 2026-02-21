// Enlightenment — плавная прокрутка и анимации

document.addEventListener('DOMContentLoaded', () => {
    // QR fallback: показать текст если картинка не загрузилась
    const qrImg = document.getElementById('qr-img');
    const qrFallback = document.getElementById('qr-fallback');
    if (qrImg && qrFallback) {
        qrFallback.style.display = 'none';
        qrImg.onerror = () => {
            qrImg.style.display = 'none';
            qrFallback.style.display = 'flex';
        };
    }

    // Плавное появление секций при скролле
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
