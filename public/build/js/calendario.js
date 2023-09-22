document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // Puedes cambiar la vista inicial si lo deseas
        events: [ // Aquí defines tus citas agendadas
            {
                title: 'Cita 1',
                start: '2023-09-10 10:00', // Fecha y hora de inicio
            },
            {
                title: 'Cita 2',
                start: '2023-09-15 14:30', // Fecha y hora de inicio
            },
            {
                title: 'Cita 3',
                start: '2023-09-25 16:00', // Fecha y hora de inicio
            },
            // Agrega más citas según sea necesario
        ],
    });

    calendar.render();
});