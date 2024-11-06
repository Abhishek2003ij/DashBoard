// Chart.js code for the Training & Progress section
document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('trainingChart').getContext('2d');
    const trainingChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Performance Score',
                data: [78, 82, 85, 90],
                borderColor: '#1a73e8',
                backgroundColor: 'rgba(26, 115, 232, 0.2)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    min: 70,
                    max: 100
                }
            }
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const eventForm = document.getElementById('eventForm');
    const eventList = document.querySelector('.event-calendar ul');
    let editEvent = null;

    eventForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('eventTitle').value;
        const date = document.getElementById('eventDate').value;

        if (editEvent) {
            // Update the existing event
            editEvent.innerHTML = `<i class="fas fa-calendar-day"></i> ${title} - ${date} <button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>`;
            editEvent = null;
            document.getElementById('cancelEdit').style.display = 'none';
        } else {
            // Add new event
            const eventItem = document.createElement('li');
            eventItem.innerHTML = `<i class="fas fa-calendar-day"></i> ${title} - ${date} <button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>`;
            eventList.appendChild(eventItem);
        }

        // Clear form
        eventForm.reset();
    });

    eventList.addEventListener('click', function (e) {
        if (e.target.classList.contains('edit-btn')) {
            // Edit event
            editEvent = e.target.parentElement;
            const [title, date] = editEvent.textContent.split(' - ');
            document.getElementById('eventTitle').value = title.trim();
            document.getElementById('eventDate').value = date.trim().split(' ')[0];
            document.getElementById('cancelEdit').style.display = 'inline';
        } else if (e.target.classList.contains('delete-btn')) {
            // Delete event
            e.target.parentElement.remove();
        }
    });

    document.getElementById('cancelEdit').addEventListener('click', function () {
        editEvent = null;
        eventForm.reset();
        this.style.display = 'none';
    });
});
function searchEvents() {
    const input = document.getElementById('searchInput').value.toLowerCase().trim();
    const events = document.querySelectorAll('.event-calendar ul li');

    events.forEach(event => {
        if (event.textContent.toLowerCase().includes(input)) {
            event.style.display = '';  // Show matching events
        } else {
            event.style.display = 'none';  // Hide non-matching events
        }
    });
}


