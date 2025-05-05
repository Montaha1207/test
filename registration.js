// Validate the registration form on submission
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission for validation

    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validate first name
    if (firstName === '') {
        alert('First name is required.');
        return;
    }

    // Validate last name
    if (lastName === '') {
        alert('Last name is required.');
        return;
    }

    // Validate email
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validate password length
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    // Confirm password
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // Display a confirmation dialog
    const isConfirmed = confirm('Do you want to submit the form?');
    if (isConfirmed) {
        alert('Registration successful!');
        this.submit();
    }
});

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add focus and blur effects to input fields
document.querySelectorAll('.input').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Use string methods to manipulate input values
document.querySelectorAll('.input').forEach(input => {
    input.addEventListener('blur', () => {
        const value = input.value.trim();
        if (value) {
            console.log(`Original: ${value}`);
            console.log(`Uppercase: ${value.toUpperCase()}`);
            console.log(`Lowercase: ${value.toLowerCase()}`);
        }
    });
});

// Prompt the user to confirm their email
document.getElementById('email').addEventListener('blur', function () {
    const email = this.value.trim();
    if (email) {
        const confirmation = prompt(`You entered: ${email}. Is this correct? (yes/no)`);
        if (confirmation && confirmation.toLowerCase() !== 'yes') {
            alert('Please correct your email.');
            this.focus();
        }
    }
});


// Generate a random password suggestion (only once)
let passwordSuggested = false; // Flag to track if the suggestion has been shown

document.getElementById('password').addEventListener('focus', function () {
    if (!passwordSuggested) {
        const randomPassword = generateRandomPassword(8);
        alert(`Suggested Password: ${randomPassword}`);
        passwordSuggested = true; // Set the flag to true after showing the suggestion
    }
});

function generateRandomPassword(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars.charAt(randomIndex);
    }
    return password;
}