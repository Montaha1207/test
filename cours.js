 // Display course details when "En savoir plus" is clicked
document.querySelectorAll('.btn-primary').forEach((button, index) => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const courseTitles = [
            "Web & Mobile Development",
            "Cybersecurity and Ethical Hacking",
            "Introduction to Computer Science",
            "Computer Networks",
            "Database Management Systems (DBMS)",
            "Machine Learning"
        ];

        const courseDescriptions = [
            "Learn how to build websites using HTML, CSS, JavaScript, and frameworks like React or Vue.js.",
            "Understand encryption, network security, penetration testing, and ethical hacking techniques.",
            "Explore basic programming concepts, problem-solving techniques, and algorithms.",
            "Dive into networking protocols, TCP/IP, DNS, HTTP, and cybersecurity concepts.",
            "Master relational databases, SQL, normalization, and NoSQL databases like MongoDB.",
            "Gain foundational and advanced knowledge of Machine Learning algorithms and applications."
        ];

        alert(`Course: ${courseTitles[index]}\nDescription: ${courseDescriptions[index]}`);
    });
});

// Generate a random course recommendation
document.addEventListener('DOMContentLoaded', function () {
    const courseTitles = [
        "Web & Mobile Development",
        "Cybersecurity and Ethical Hacking",
        "Introduction to Computer Science",
        "Computer Networks",
        "Database Management Systems (DBMS)",
        "Machine Learning"
    ];

    const randomIndex = Math.floor(Math.random() * courseTitles.length);
    const recommendedCourse = courseTitles[randomIndex];

    // Display the recommendation only once
    if (!sessionStorage.getItem('courseRecommended')) {
        alert(`Recommended Course: ${recommendedCourse}`);
        sessionStorage.setItem('courseRecommended', 'true');
    }
});

// Prompt the user to rate a course
document.querySelectorAll('.course-card').forEach((card, index) => {
    card.addEventListener('dblclick', function () {
        const courseTitles = [
            "Web & Mobile Development",
            "Cybersecurity and Ethical Hacking",
            "Introduction to Computer Science",
            "Computer Networks",
            "Database Management Systems (DBMS)",
            "Machine Learning"
        ];

        const rating = prompt(`Rate the course "${courseTitles[index]}" (1-5):`);
        if (rating !== null) {
            const numericRating = parseInt(rating);
            if (numericRating >= 1 && numericRating <= 5) {
                alert(`Thank you for rating "${courseTitles[index]}" with a ${numericRating}/5!`);
            } else {
                alert("Invalid rating. Please enter a number between 1 and 5.");
            }
        }
    });
});

// Use Math functions to calculate course statistics
document.querySelector('.container').addEventListener('click', function () {
    const ratings = [4.5, 4.8, 4.2, 4.7, 4.6, 4.9]; // Example ratings for each course
    const maxRating = Math.max(...ratings);
    const minRating = Math.min(...ratings);
    const averageRating = (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(2);

    console.log(`Highest Rating: ${maxRating}`);
    console.log(`Lowest Rating: ${minRating}`);
    console.log(`Average Rating: ${averageRating}`);
});

// Use string methods to manipulate course titles
document.querySelectorAll('.course-card h2').forEach((title) => {
    const originalText = title.textContent;
    const upperCaseText = originalText.toUpperCase();
    console.log(`Original: ${originalText}, Uppercase: ${upperCaseText}`);
});