# Calendar Application

A modern, responsive calendar application with user authentication and event management.

## Features

### Authentication
- **Landing Page**: Single page with login form by default and easy switching to signup
- **User Registration**: Create new accounts with email and password
- **User Login**: Secure login with email/password authentication
- **User Logout**: Secure logout with automatic redirect
- **Seamless Flow**: Smooth transitions between authentication states

### Calendar Features
- **Monthly View**: Navigate between months with intuitive controls
- **Event Management**: Add, edit, and delete events
- **Event Details**: View comprehensive event information
- **Daily Schedule**: Click on any day to view scheduled events
- **Color Coding**: Organize events with different colors
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### User Experience
- **Modern UI**: Clean, modern interface with smooth animations
- **Real-time Updates**: Events update immediately across all views
- **Local Storage**: Events are saved locally per user
- **Notifications**: Success and error notifications for user feedback

## File Structure

```
├── index.html          # Landing page (login/signup)
├── calendar.html       # Main calendar page
├── script.js           # Calendar functionality
├── landing.js          # Landing page authentication
├── styles.css          # All styling
└── README.md           # This file
```

## Getting Started

1. **Open the Application**: Start with `index.html`
2. **Login or Sign Up**: 
   - Login form is shown by default
   - Click "Sign up" to switch to registration form
   - Click "Sign in" to switch back to login
3. **Access Calendar**: After authentication, you'll be redirected to the calendar
4. **Add Events**: Click "Add Event" to create your first event
5. **Navigate**: Use the arrow buttons to move between months
6. **View Schedule**: Click on any day to see scheduled events

## Authentication Flow

1. **Landing Page**: Users see login form by default
2. **Switch Mode**: Easy toggle between login and signup forms
3. **Registration**: New users can create accounts on the same page
4. **Login**: Existing users authenticate on the same page
5. **Calendar Access**: Authenticated users access the main calendar
6. **Logout**: Users can logout and are redirected back to landing page

## Technical Details

### Storage
- **User Data**: Stored in localStorage as `calendarUsers`
- **User Sessions**: Current user stored as `currentUser`
- **Events**: User-specific events stored as `calendarEvents_{userId}`

### Security
- **Password Validation**: Minimum 6 characters required
- **Email Validation**: Basic email format validation
- **User Isolation**: Each user's events are completely separate

### Browser Compatibility
- Modern browsers with ES6+ support
- LocalStorage support required
- Responsive design for all screen sizes

## Usage

### Adding Events
1. Click "Add Event" button
2. Fill in event details (title, date, time, description, color)
3. Click "Add Event" to save

### Editing Events
1. Click on an event indicator on the calendar
2. Click "Edit Event" in the details modal
3. Modify the event information
4. Click "Update Event" to save changes

### Deleting Events
1. Click on an event indicator on the calendar
2. Click "Delete Event" in the details modal
3. Confirm deletion

### Viewing Daily Schedule
1. Click on any day in the calendar
2. View all events scheduled for that day
3. Add new events directly from the schedule view

## Customization

The application uses CSS custom properties and can be easily customized by modifying the `styles.css` file. The color scheme and styling can be adjusted to match your preferences.
