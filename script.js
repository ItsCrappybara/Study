class Calendar {
    constructor() {
        // Initialize with current date
        this.currentDate = new Date();
        this.events = JSON.parse(localStorage.getItem('calendarEvents')) || [];
        this.selectedDate = null;
        this.selectedEvent = null;
        this.editingEvent = null;
        this.isSubmitting = false; // Add flag to prevent double submission
        
        this.initializeElements();
        this.bindEvents();
        this.renderCalendar();
    }

    initializeElements() {
        this.calendarElement = document.getElementById('calendar');
        this.currentMonthElement = document.getElementById('currentMonth');
        this.prevMonthBtn = document.getElementById('prevMonth');
        this.nextMonthBtn = document.getElementById('nextMonth');
        this.addEventBtn = document.getElementById('addEventBtn');
        this.eventModal = document.getElementById('eventModal');
        this.eventDetailsModal = document.getElementById('eventDetailsModal');
        this.scheduleModal = document.getElementById('scheduleModal');
        this.eventForm = document.getElementById('eventForm');
        this.cancelEventBtn = document.getElementById('cancelEvent');
        this.closeDetailsBtn = document.getElementById('closeDetails');
        this.closeScheduleBtn = document.getElementById('closeSchedule');
        this.editEventBtn = document.getElementById('editEvent');
        this.deleteEventBtn = document.getElementById('deleteEvent');
        this.eventDetailsContent = document.getElementById('eventDetailsContent');
        this.eventDetailsTitle = document.getElementById('eventDetailsTitle');
        this.scheduleEvents = document.getElementById('scheduleEvents');
        this.scheduleEmpty = document.getElementById('scheduleEmpty');
        this.scheduleDate = document.getElementById('scheduleDate');
        this.scheduleDay = document.getElementById('scheduleDay');
        this.addEventToScheduleBtn = document.getElementById('addEventToSchedule');
        this.addFirstEventBtn = document.getElementById('addFirstEvent');
    }

    bindEvents() {
        this.prevMonthBtn.addEventListener('click', () => this.navigateMonth(-1));
        this.nextMonthBtn.addEventListener('click', () => this.navigateMonth(1));
        this.addEventBtn.addEventListener('click', () => this.openEventModal());
        this.cancelEventBtn.addEventListener('click', () => this.closeEventModal());
        this.closeDetailsBtn.addEventListener('click', () => this.closeEventDetailsModal());
        this.closeScheduleBtn.addEventListener('click', () => this.closeScheduleModal());
        this.editEventBtn.addEventListener('click', () => this.editSelectedEvent());
        this.deleteEventBtn.addEventListener('click', () => this.deleteSelectedEvent());
        this.addEventToScheduleBtn.addEventListener('click', () => this.addEventFromSchedule());
        this.addFirstEventBtn.addEventListener('click', () => this.addEventFromSchedule());
        
        this.eventForm.addEventListener('submit', (e) => this.handleEventSubmit(e));
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.eventModal) this.closeEventModal();
            if (e.target === this.eventDetailsModal) this.closeEventDetailsModal();
            if (e.target === this.scheduleModal) this.closeScheduleModal();
        });

        // Set default date to today when opening event modal
        this.addEventBtn.addEventListener('click', () => {
            const today = new Date();
            document.getElementById('eventDate').value = this.getLocalDateString(today);
        });
    }

    navigateMonth(direction) {
        this.currentDate.setMonth(this.currentDate.getMonth() + direction);
        this.renderCalendar();
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Update header
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        this.currentMonthElement.textContent = `${monthNames[month]} ${year}`;

        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        // Clear calendar
        this.calendarElement.innerHTML = '';

        // Generate calendar days
        for (let i = 0; i < 42; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const dayElement = this.createDayElement(currentDate, year, month);
            this.calendarElement.appendChild(dayElement);
        }
    }

    createDayElement(date, currentYear, currentMonth) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        const dayNumber = date.getDate();
        const isCurrentMonth = date.getMonth() === currentMonth;
        const isToday = this.isToday(date);
        const dayEvents = this.getEventsForDate(date);
        
        if (!isCurrentMonth) {
            dayElement.classList.add('other-month');
        }
        
        if (isToday) {
            dayElement.classList.add('today');
        }
        
        if (dayEvents.length > 0) {
            dayElement.classList.add('has-events');
        }

        dayElement.innerHTML = `
            <div class="day-number">${dayNumber}</div>
            <div class="events-container">
                ${dayEvents.slice(0, 3).map(event => `
                    <div class="event-indicator" 
                         style="background-color: ${event.color}"
                         title="${event.title} - ${event.startTime}">
                        ${event.title}
                    </div>
                `).join('')}
                ${dayEvents.length > 3 ? `<div class="event-indicator" style="background-color: #6b7280">+${dayEvents.length - 3} more</div>` : ''}
            </div>
        `;

        // Add click event for day
        dayElement.addEventListener('click', () => {
            if (isCurrentMonth) {
                this.selectDate(date);
            }
        });

        // Add click event for event indicators
        const eventIndicators = dayElement.querySelectorAll('.event-indicator');
        eventIndicators.forEach((indicator, index) => {
            if (index < dayEvents.length) {
                indicator.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showEventDetails(dayEvents[index]);
                });
            }
        });

        return dayElement;
    }

    isToday(date) {
        const today = new Date();
        const isToday = date.toDateString() === today.toDateString();
        return isToday;
    }

    getLocalDateString(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        return dateString;
    }

    getEventsForDate(date) {
        const dateString = this.getLocalDateString(date);
        return this.events.filter(event => event.date === dateString);
    }

    selectDate(date) {
        this.selectedDate = date;
        this.openScheduleModal(date);
    }

    openEventModalWithDate(date) {
        this.selectedDate = date;
        this.eventModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        const dateInput = document.getElementById('eventDate');
        dateInput.value = this.getLocalDateString(date);
    }

    openEventModal() {
        this.eventModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Only set default date to today if no date is selected and no date was passed from schedule
        const dateInput = document.getElementById('eventDate');
        if (!dateInput.value && !this.selectedDate) {
            const today = new Date();
            dateInput.value = this.getLocalDateString(today);
        }
    }

    closeEventModal() {
        this.eventModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.eventForm.reset();
        
        // Reset form button text and clear editing state
        const submitBtn = document.querySelector('#eventForm button[type="submit"]');
        submitBtn.textContent = 'Add Event';
        this.editingEvent = null;
        this.selectedDate = null; // Reset selected date when closing event modal
    }

    openEventDetailsModal() {
        this.eventDetailsModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeEventDetailsModal() {
        this.eventDetailsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.selectedEvent = null;
    }

    openScheduleModal(date) {
        this.selectedDate = date;
        this.renderSchedule(date);
        this.scheduleModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeScheduleModal() {
        this.scheduleModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Don't reset selectedDate here as it's needed for addEventFromSchedule
    }

    renderSchedule(date) {
        const events = this.getEventsForDate(date);
        const sortedEvents = events.sort((a, b) => a.startTime.localeCompare(b.startTime));
        
        // Update date display
        const dateString = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        this.scheduleDate.textContent = dateString;
        this.scheduleDay.textContent = date.toLocaleDateString('en-US', { weekday: 'long' });
        
        if (sortedEvents.length === 0) {
            this.scheduleEvents.style.display = 'none';
            this.scheduleEmpty.style.display = 'flex';
        } else {
            this.scheduleEvents.style.display = 'block';
            this.scheduleEmpty.style.display = 'none';
            
            this.scheduleEvents.innerHTML = sortedEvents.map(event => `
                <div class="schedule-event" data-event-id="${event.id}">
                    <div class="event-time">
                        <span class="start-time">${this.formatTime(event.startTime)}</span>
                        <span class="end-time">${this.formatTime(event.endTime)}</span>
                    </div>
                    <div class="event-info">
                        <div class="event-title" style="color: ${event.color}">${event.title}</div>
                        ${event.description ? `<div class="event-description">${event.description}</div>` : ''}
                    </div>
                    <div class="event-actions">
                        <button class="edit-event-btn" title="Edit Event">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-event-btn" title="Delete Event">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
            
            // Add event listeners to schedule event buttons
            this.scheduleEvents.querySelectorAll('.edit-event-btn').forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    this.editEventFromSchedule(sortedEvents[index]);
                });
            });
            
            this.scheduleEvents.querySelectorAll('.delete-event-btn').forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    this.deleteEventFromSchedule(sortedEvents[index]);
                });
            });
        }
    }

    addEventFromSchedule() {
        const selectedDate = this.selectedDate; // Store the date before closing modal
        this.closeScheduleModal();
        if (selectedDate) {
            this.openEventModalWithDate(selectedDate);
        } else {
            this.openEventModal();
        }
    }

    editEventFromSchedule(event) {
        this.closeScheduleModal();
        this.populateEventForm(event);
        this.openEventModal();
    }

    deleteEventFromSchedule(event) {
        if (confirm('Are you sure you want to delete this event?')) {
            this.events = this.events.filter(e => e.id !== event.id);
            this.saveEvents();
            this.renderCalendar();
            this.renderSchedule(this.selectedDate);
            this.showNotification('Event deleted successfully!', 'success');
        }
    }

    handleEventSubmit(e) {
        e.preventDefault();
        
        // Prevent double submission
        if (this.isSubmitting) {
            return;
        }
        this.isSubmitting = true;
        
        // Get form values directly from elements BEFORE any potential form reset
        const title = document.getElementById('eventTitle').value.trim();
        const date = document.getElementById('eventDate').value;
        const startTime = document.getElementById('eventStartTime').value;
        const endTime = document.getElementById('eventEndTime').value;
        const description = document.getElementById('eventDescription').value.trim();
        const color = document.getElementById('eventColor').value;

        const eventData = {
            title: title,
            date: date,
            startTime: startTime,
            endTime: endTime,
            description: description,
            color: color
        };

        // Validate required fields
        if (!title) {
            this.isSubmitting = false;
            alert('Please enter an event title');
            document.getElementById('eventTitle').focus();
            return;
        }
        if (!date) {
            this.isSubmitting = false;
            alert('Please select a date');
            document.getElementById('eventDate').focus();
            return;
        }
        if (!startTime) {
            this.isSubmitting = false;
            alert('Please select a start time');
            document.getElementById('eventStartTime').focus();
            return;
        }
        if (!endTime) {
            this.isSubmitting = false;
            alert('Please select an end time');
            document.getElementById('eventEndTime').focus();
            return;
        }

        // Validate end time is after start time
        if (startTime >= endTime) {
            this.isSubmitting = false;
            alert(`End time (${endTime}) must be after start time (${startTime})`);
            document.getElementById('eventEndTime').focus();
            return;
        }

        if (this.editingEvent) {
            // Update existing event
            eventData.id = this.editingEvent.id;
            const index = this.events.findIndex(event => event.id === this.editingEvent.id);
            if (index !== -1) {
                this.events[index] = eventData;
            }
            this.editingEvent = null;
            this.showNotification('Event updated successfully!', 'success');
        } else {
            // Add new event
            eventData.id = Date.now().toString();
            this.events.push(eventData);
            this.showNotification('Event added successfully!', 'success');
        }

        this.saveEvents();
        this.renderCalendar();
        this.closeEventModal();
        
        // Refresh schedule modal if it's open
        if (this.scheduleModal.style.display === 'block' && this.selectedDate) {
            this.renderSchedule(this.selectedDate);
        }
        
        // Reset submission flag
        this.isSubmitting = false;
    }

    showEventDetails(event) {
        this.selectedEvent = event;
        this.eventDetailsTitle.textContent = event.title;
        
        const startTime = this.formatTime(event.startTime);
        const endTime = this.formatTime(event.endTime);
        const date = new Date(event.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        this.eventDetailsContent.innerHTML = `
            <div class="event-detail">
                <label>Date:</label>
                <span>${date}</span>
            </div>
            <div class="event-detail">
                <label>Time:</label>
                <span>${startTime} - ${endTime}</span>
            </div>
            ${event.description ? `
                <div class="event-detail">
                    <label>Description:</label>
                    <span>${event.description}</span>
                </div>
            ` : ''}
            <div class="event-detail">
                <label>Color:</label>
                <span style="display: inline-block; width: 20px; height: 20px; background-color: ${event.color}; border-radius: 4px; margin-left: 10px;"></span>
            </div>
        `;

        this.openEventDetailsModal();
    }

    editSelectedEvent() {
        if (this.selectedEvent) {
            this.populateEventForm(this.selectedEvent);
            this.closeEventDetailsModal();
            this.openEventModal();
        }
    }

    populateEventForm(event) {
        document.getElementById('eventTitle').value = event.title;
        document.getElementById('eventDate').value = event.date;
        document.getElementById('eventStartTime').value = event.startTime;
        document.getElementById('eventEndTime').value = event.endTime;
        document.getElementById('eventDescription').value = event.description || '';
        document.getElementById('eventColor').value = event.color;
        
        // Change form submit button text
        const submitBtn = document.querySelector('#eventForm button[type="submit"]');
        submitBtn.textContent = 'Update Event';
        
        // Store the event being edited
        this.editingEvent = event;
    }

    deleteSelectedEvent() {
        if (this.selectedEvent) {
            if (confirm('Are you sure you want to delete this event?')) {
                this.events = this.events.filter(event => event.id !== this.selectedEvent.id);
                this.saveEvents();
                this.renderCalendar();
                this.closeEventDetailsModal();
                this.showNotification('Event deleted successfully!', 'success');
            }
        }
    }

    formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    }

    saveEvents() {
        localStorage.setItem('calendarEvents', JSON.stringify(this.events));
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const calendar = new Calendar();
    
    // Add sample events if no events exist
    if (calendar.events.length === 0) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const sampleEvents = [
            {
                id: '1',
                title: 'Team Meeting',
                date: calendar.getLocalDateString(today),
                startTime: '10:00',
                endTime: '11:00',
                description: 'Weekly team sync meeting',
                color: '#3b82f6'
            },
            {
                id: '2',
                title: 'Lunch with Client',
                date: calendar.getLocalDateString(tomorrow),
                startTime: '12:30',
                endTime: '14:00',
                description: 'Discuss project requirements',
                color: '#10b981'
            },
            {
                id: '3',
                title: 'Gym Session',
                date: calendar.getLocalDateString(today),
                startTime: '18:00',
                endTime: '19:30',
                description: 'Cardio and strength training',
                color: '#ef4444'
            }
        ];
        
        calendar.events = sampleEvents;
        calendar.saveEvents();
        calendar.renderCalendar();
    }
});