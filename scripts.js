let events = [];
let editIndex = null;

document.getElementById('eventForm').addEventListener('submit', addEvent);

function addEvent(e) {
    e.preventDefault(); // Prevent form submission

    const eventTitle = document.getElementById('eventTitle').value;
    const eventDate = document.getElementById('eventDate').value;

    if (editIndex !== null) {
        // Editing existing event
        events[editIndex] = { title: eventTitle, date: eventDate };
        editIndex = null;
        document.getElementById('cancelEdit').style.display = 'none';
    } else {
        // Adding new event
        events.push({ title: eventTitle, date: eventDate });
    }

    document.getElementById('eventForm').reset();
    renderEventList();
}

function renderEventList(filteredEvents = events) {
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = ''; // Clear previous list items

    filteredEvents.forEach((event, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <i class="fas fa-calendar-day"></i> ${event.title} - ${event.date}
            <button onclick="editEvent(${index})">Edit</button>
            <button onclick="deleteEvent(${index})">Delete</button>
        `;
        eventList.appendChild(li);
    });
}

function editEvent(index) {
    editIndex = index;
    const event = events[index];
    document.getElementById('eventTitle').value = event.title;
    document.getElementById('eventDate').value = event.date;
    document.getElementById('cancelEdit').style.display = 'inline-block';
}

function deleteEvent(index) {
    events.splice(index, 1);
    renderEventList();
}

function cancelEdit() {
    editIndex = null;
    document.getElementById('eventForm').reset();
    document.getElementById('cancelEdit').style.display = 'none';
}

function searchEvents() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredEvents = events.filter(event => event.title.toLowerCase().includes(query));
    renderEventList(filteredEvents);
}

function toggleMode() {
    const mode = document.getElementById('mode').value;
    if (mode === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    }
}

// Wait for the DOM to load before running any scripts
document.addEventListener('DOMContentLoaded', function () {
    const eventForm = document.getElementById('eventForm');
    const eventTitle = document.getElementById('eventTitle');
    const eventDate = document.getElementById('eventDate');
    const eventList = document.getElementById('eventList');
    const cancelEditBtn = document.getElementById('cancelEdit');

    // Render the initial event list if there are events
    renderEventList();

    // Event listener for form submission
    eventForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        
        const title = eventTitle.value.trim();
        const date = eventDate.value;

        if (title && date) {
            // Create a new list item for the event
            const li = document.createElement('li');
            li.innerHTML = `<strong>${title}</strong> on <em>${new Date(date).toLocaleDateString()}</em>`;
            
            // Append the new event to the event list
            eventList.appendChild(li);

            // Clear the form fields
            eventTitle.value = '';
            eventDate.value = '';

            // Hide the "Cancel Edit" button
            cancelEditBtn.style.display = 'none';
        }
    });

    // Cancel edit (if applicable, this part could be expanded for editing events)
    cancelEditBtn.addEventListener('click', function () {
        eventTitle.value = '';
        eventDate.value = '';
        cancelEditBtn.style.display = 'none';
    });
});
