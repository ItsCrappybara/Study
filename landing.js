// Simple and direct approach to ensure the sign up button works
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing landing page...');
    
    // Get all the elements we need
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');
    const authSwitchText = document.getElementById('authSwitchText');
    
    // Check if user is already logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        console.log('User already logged in, redirecting...');
        window.location.href = 'calendar.html';
        return;
    }
    
    let isLoginMode = true;
    
    // Function to switch between login and signup
    function switchAuthMode() {
        console.log('Switching auth mode, current mode:', isLoginMode);
        isLoginMode = !isLoginMode;
        
        if (isLoginMode) {
            // Switch to login mode
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
            authTitle.textContent = 'Welcome Back';
            authSubtitle.textContent = 'Sign in to access your calendar';
            authSwitchText.innerHTML = 'Don\'t have an account? <button type="button" id="switchAuthMode" class="auth-link">Sign up</button>';
        } else {
            // Switch to signup mode
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
            authTitle.textContent = 'Create Account';
            authSubtitle.textContent = 'Join us to start organizing your life';
            authSwitchText.innerHTML = 'Already have an account? <button type="button" id="switchAuthMode" class="auth-link">Sign in</button>';
        }
        
        // Re-bind the event listener to the new button
        const newSwitchButton = document.getElementById('switchAuthMode');
        if (newSwitchButton) {
            newSwitchButton.addEventListener('click', switchAuthMode);
        }
    }
    
    // Function to show notifications
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        const bgColor = type === 'success' ? '#10b981' : 
                       type === 'error' ? '#ef4444' : '#3b82f6';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 500;
            max-width: 300px;
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
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Function to toggle password visibility
    function togglePasswordVisibility(inputId, toggleBtn) {
        const input = document.getElementById(inputId);
        const icon = toggleBtn.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
    
    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Login form submitted');
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        const users = JSON.parse(localStorage.getItem('calendarUsers')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            showNotification(`Welcome back, ${user.name}!`, 'success');
            
            setTimeout(() => {
                window.location.href = 'calendar.html';
            }, 1000);
        } else {
            showNotification('Invalid email or password', 'error');
        }
    });
    
    // Handle signup form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Signup form submitted');
        
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;

        if (!name || !email || !password || !confirmPassword) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }

        if (password.length < 6) {
            showNotification('Password must be at least 6 characters long', 'error');
            return;
        }

        const users = JSON.parse(localStorage.getItem('calendarUsers')) || [];
        if (users.find(u => u.email === email)) {
            showNotification('Email already registered', 'error');
            return;
        }

        const newUser = {
            id: Date.now().toString(),
            name: name,
            email: email,
            password: password
        };

        users.push(newUser);
        localStorage.setItem('calendarUsers', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        showNotification(`Welcome, ${name}! Your account has been created.`, 'success');
        
        setTimeout(() => {
            window.location.href = 'calendar.html';
        }, 1000);
    });
    
    // Handle password toggle buttons
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    const toggleSignupPassword = document.getElementById('toggleSignupPassword');
    const toggleSignupConfirmPassword = document.getElementById('toggleSignupConfirmPassword');
    
    if (toggleLoginPassword) {
        toggleLoginPassword.addEventListener('click', () => togglePasswordVisibility('loginPassword', toggleLoginPassword));
    }
    
    if (toggleSignupPassword) {
        toggleSignupPassword.addEventListener('click', () => togglePasswordVisibility('signupPassword', toggleSignupPassword));
    }
    
    if (toggleSignupConfirmPassword) {
        toggleSignupConfirmPassword.addEventListener('click', () => togglePasswordVisibility('signupConfirmPassword', toggleSignupConfirmPassword));
    }
    
    // Bind the initial switch button
    const initialSwitchButton = document.getElementById('switchAuthMode');
    if (initialSwitchButton) {
        console.log('Initial switch button found, binding event listener');
        initialSwitchButton.addEventListener('click', switchAuthMode);
    } else {
        console.log('Initial switch button not found!');
    }
    
    console.log('Landing page initialization complete');
});
