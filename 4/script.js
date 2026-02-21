// Enlightenment v4 — стабильная версия, без дёрганий

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
    initModal();
    initSchedule();
});

function initModal() {
    const modal = document.getElementById('modal');
    const titleEl = document.getElementById('modal-title');
    const descEl = document.getElementById('modal-desc');
    const closeBtn = modal?.querySelector('.modal-close');

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.service;
            const info = SERVICE_INFO[id];
            if (info && modal) {
                titleEl.textContent = info.title;
                descEl.textContent = info.desc;
                modal.showModal();
            }
        });
    });

    closeBtn?.addEventListener('click', () => modal?.close());
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });
}

function initSchedule() {
    const list = document.getElementById('schedule-list');
    const tabs = document.querySelectorAll('.tab');

    function render(day) {
        const events = SCHEDULE[day] || [];
        list.innerHTML = events.map(e =>
            `<div class="item"><span class="time">${e.time}</span><span>${e.name}</span></div>`
        ).join('');
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            render(parseInt(tab.dataset.day));
        });
    });

    render(0);
}
