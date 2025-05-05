// Add event listener to the login button
document.querySelector('.button1').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent form submission for validation

    const username = document.querySelector('.input-field[type="text"]').value.trim();
    const password = document.querySelector('.input-field[type="password"]').value;

    // Validate username
    if (username === '') {
        alert('Username is required.');
        return;
    }

    // Validate password
    if (password === '') {
        alert('Password is required.');
        return;
    }

    // Simulate successful login
    alert('Login successful!');
});

// Add focus and blur effects to input fields
document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Add event listener to the "Forgot Password" button
document.querySelector('.button3').addEventListener('click', function () {
    alert('Password recovery is not implemented yet.');
});

// Add event listener to the "Sign Up" button
document.querySelector('.button2').addEventListener('click', function (e) {
    e.preventDefault();
    alert('Redirecting to the Sign-Up page...');
    // Simulate redirection
    window.location.href = 'registration.html'; // Update with the actual sign-up page URL
});