# Interactive Calendar Application

A beautiful, modern calendar application built with HTML, CSS, and JavaScript that allows you to add, view, and manage events with time details.

## Features

### 📅 Calendar View
- **Monthly Calendar Display**: Clean, responsive grid layout showing the current month
- **Navigation**: Easy month-to-month navigation with arrow buttons
- **Today Highlighting**: Current date is highlighted with a special gradient
- **Event Indicators**: Days with events show colored indicators
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### ✨ Event Management
- **Add Events**: Click "Add Event" button or click on any day to add a new event
- **Event Details**: Include title, date, start time, end time, description, and color
- **Time Validation**: Ensures end time is after start time
- **Color Coding**: Choose from 6 different colors to organize your events
- **Event Viewing**: Click on event indicators to view full event details
- **Event Deletion**: Delete events with confirmation dialog

### 🎨 Modern UI/UX
- **Beautiful Design**: Modern gradient backgrounds and glass-morphism effects
- **Smooth Animations**: Hover effects, modal transitions, and interactive feedback
- **Intuitive Interface**: Easy-to-use forms and clear visual hierarchy
- **Notifications**: Success messages when adding or deleting events
- **Accessibility**: Proper focus states and keyboard navigation

### 💾 Data Persistence
- **Local Storage**: Events are automatically saved to your browser's local storage
- **No Server Required**: Works completely offline
- **Data Persistence**: Your events remain even after closing and reopening the browser

## How to Use

### Getting Started
1. Open `index.html` in your web browser
2. The calendar will load with the current month displayed
3. Sample events are automatically added for demonstration

### Adding Events
1. Click the "Add Event" button in the header, or
2. Click on any day in the calendar
3. Fill in the event details:
   - **Title**: Name of your event
   - **Date**: Select the event date
   - **Start Time**: When the event begins
   - **End Time**: When the event ends
   - **Description**: Optional details about the event
   - **Color**: Choose a color to categorize your event
4. Click "Add Event" to save

### Managing Events
- **View Event Details**: Click on any colored event indicator in the calendar
- **Delete Events**: Open event details and click the "Delete Event" button
- **Navigate Months**: Use the arrow buttons to move between months

### Event Display
- Events appear as colored bars on calendar days
- Up to 3 events are shown per day
- If there are more than 3 events, a "+X more" indicator appears
- Hover over event indicators to see event title and time

## Technical Details

### File Structure
```
├── index.html          # Main HTML structure
├── styles.css          # Modern CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

### Technologies Used
- **HTML5**: Semantic markup and modern form elements
- **CSS3**: Flexbox, Grid, animations, and responsive design
- **JavaScript (ES6+)**: Classes, modules, and modern JavaScript features
- **Local Storage API**: For data persistence
- **Font Awesome**: For icons
- **Google Fonts**: Inter font family

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Customization

### Adding More Colors
To add more event colors, edit the color options in `index.html`:

```html
<select id="eventColor">
    <option value="#3b82f6">Blue</option>
    <option value="#ef4444">Red</option>
    <!-- Add more colors here -->
</select>
```

### Changing the Theme
Modify the CSS variables in `styles.css` to customize the color scheme:

```css
:root {
    --primary-color: #4f46e5;
    --success-color: #10b981;
    --danger-color: #ef4444;
}
```

### Adding Features
The modular JavaScript code makes it easy to add new features:
- Recurring events
- Event categories
- Export/import functionality
- Calendar sharing
- Multiple calendar views (week, day)

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to fork this project and submit pull requests for improvements!

---

**Enjoy organizing your schedule with this beautiful calendar application!** 📅✨
