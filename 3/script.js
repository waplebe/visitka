// Enlightenment v3 — Интерактивная версия с фотографиями

const SCHEDULE = {
    0: [{ time: '09:00', name: 'Kundalini Yoga' }, { time: '18:00', name: 'Медитация' }],
    1: [{ time: '10:00', name: 'SOMA практика' }, { time: '19:00', name: 'Ceremony Online' }],
    2: [{ time: '09:00', name: 'Kundalini Yoga' }, { time: '17:00', name: 'Mentoring' }],
    3: [{ time: '11:00', name: 'Medicina Sagrada' }, { time: '18:00', name: 'SOMAYA' }],
    4: [{ time: '09:00', name: 'Kundalini Yoga' }, { time: '19:00', name: 'Mentoring Online' }],
    5: [{ time: '10:00', name: 'Церемония' }, { time: '15:00', name: 'Интеграция' }],
    6: [{ time: '11:00', name: 'Медитация' }, { time: '17:00', name: 'Практика тишины' }]
};

const SERVICE_INFO = {
    somaya: { title: 'SOMAYA', desc: 'Древняя практика пробуждения внутренней энергии. Работа с телом, дыханием и сознанием для глубокой трансформации.' },
    medicina: { title: 'Medicina Sagrada', desc: 'Работа с священными растениями в традиции. Церемонии проводятся с соблюдением древних практик и в безопасном пространстве.' },
    'ceremony-online': { title: 'Ceremony Online', desc: 'Церемонии и практики в онлайн-формате. Подходит для тех, кто не может приехать лично.' },
    soma: { title: 'SOMA', desc: 'Практики единения тела и духа. Движение, дыхание и осознанность.' },
    kundalini: { title: 'Kundalini Yoga', desc: 'Пробуждение энергии кундалини через крийи, мантры и медитации. Йога осознания.' },
    mentoring: { title: 'Mentoring', desc: 'Индивидуальное сопровождение на пути практики. Персональные сессии очно.' },
    'mentoring-online': { title: 'Mentoring Online', desc: 'Менторство в онлайн-формате. Регулярные сессии и поддержка на расстоянии.' }
};

document.addEventListener('DOMContentLoaded', () => {
    initServiceModal();
    initSchedule();
    initAccordion();
    initCopy();
    initQR();
    initScrollAnimations();
});

function initServiceModal() {
    const modal = document.getElementById('service-modal');
    const cards = document.querySelectorAll('.service-card.interactive');
    const titleEl = document.getElementById('modal-title');
    const descEl = document.getElementById('modal-desc');
    const closeBtn = modal?.querySelector('.modal-close');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const service = card.dataset.service;
            const info = SERVICE_INFO[service];
            if (info && modal) {
                titleEl.textContent = info.title;
                descEl.textContent = info.desc;
                modal.classList.add('active');
            }
        });
    });

    closeBtn?.addEventListener('click', () => modal?.classList.remove('active'));
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
}

function initSchedule() {
    const days = document.querySelectorAll('.day-btn');
    const content = document.getElementById('schedule-content');

    function renderDay(dayIndex) {
        const events = SCHEDULE[dayIndex] || [];
        content.innerHTML = events.length
            ? events.map(e => `<div class="schedule-event"><span class="time">${e.time}</span><span>${e.name}</span></div>`).join('')
            : '<p style="text-align:center;opacity:0.7">Нет занятий</p>';
    }

    days.forEach(btn => {
        btn.addEventListener('click', () => {
            days.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderDay(parseInt(btn.dataset.day));
        });
    });

    renderDay(0);
}

function initAccordion() {
    document.querySelectorAll('.accordion-item').forEach(item => {
        const btn = item.querySelector('.accordion-btn');
        btn?.addEventListener('click', () => {
            item.classList.toggle('open');
        });
    });
}

function initCopy() {
    const copyBtn = document.querySelector('.copy-btn');
    copyBtn?.addEventListener('click', () => {
        const id = copyBtn.dataset.copy;
        const input = document.getElementById(id);
        if (input) {
            input.select();
            navigator.clipboard?.writeText(input.value).then(() => {
                copyBtn.textContent = 'Скопировано!';
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.textContent = 'Копировать';
                    copyBtn.classList.remove('copied');
                }, 2000);
            });
        }
    });
}

function initQR() {
    const container = document.getElementById('qr-container');
    const contactUrl = 'https://wa.me/79001234567';

    if (container) {
        const img = document.createElement('img');
        img.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(contactUrl)}`;
        img.alt = 'QR код';
        img.style.cssText = 'display:block;margin:1rem auto;background:white;padding:8px;border-radius:12px;';
        container.appendChild(img);
    }
}

function initScrollAnimations() {
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
}
