// Smooth scrolling for navigation links
document.querySelectorAll('.naving').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Toggle navigation bar visibility on smaller screens
const toggleButton = document.querySelector('.toggle-btn');
const navBar = document.querySelector('.nav_bar');

if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        navBar.classList.toggle('active');
    });
}

// Add hover effects to social media icons
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.style.transform = 'scale(1.2)';
        icon.style.transition = 'transform 0.3s ease';
    });
    icon.addEventListener('mouseout', () => {
        icon.style.transform = 'scale(1)';
    });
});

// Add functionality to "Enroll Now" buttons
document.querySelectorAll('.course-button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Thank you for your interest! Enrollment will open soon.');
    });
});