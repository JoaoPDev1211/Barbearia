let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const monthYear = document.getElementById('monthYear');
const daysContainer = document.getElementById('days');
const modal = document.getElementById('modal');
const appointmentForm = document.getElementById('appointmentForm');
let appointments = {};

const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembero', 'Dezembro'
];

function showCalendar(month, year) {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();

    daysContainer.innerHTML = '';

    monthYear.textContent = `${monthNames[month]} ${year}`;

    for (let i = 0; i < firstDay; i++) {
        daysContainer.appendChild(document.createElement('div'));
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.textContent = i;
        day.dataset.date = `${year}-${month + 1}-${i}`;
        day.addEventListener('click', () => openModal(i));
        
        const appointment = appointments[day.dataset.date];
        if (appointment) {
            const appointmentDiv = document.createElement('div');
            appointmentDiv.className = 'appointment';
            appointmentDiv.textContent = `${appointment.name} - ${appointment.time}`;
            day.appendChild(appointmentDiv);
        }

        daysContainer.appendChild(day);
    }
}

function prevMonth() {
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
    showCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
    currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
    showCalendar(currentMonth, currentYear);
}

function openModal(day) {
    modal.style.display = 'block';
    appointmentForm.dataset.day = day;
}

function closeModal() {
    modal.style.display = 'none';
}

appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const time = e.target.time.value;
    const type = e.target.type.value;
    const day = appointmentForm.dataset.day;
    const date = `${currentYear}-${currentMonth + 1}-${day}`;

    appointments[date] = { name, time, type };
    console.log(`Agendamento para o dia ${day}: Nome: ${name}, Horário: ${time}, Tipo: ${type}`);
    closeModal();
    showCalendar(currentMonth, currentYear);
});

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

showCalendar(currentMonth, currentYear);

function sendWhatsAppMessage(){
    const phoneNumber = "5531994288283"; // Número de telefone no formato internacional, sem espaços, parênteses ou hifens
    const message = encodeURIComponent("Olá, gostaria de agendar um horário."); // Certifique-se de que a mensagem está corretamente codificada
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    window.open(url, '_blank');
}


