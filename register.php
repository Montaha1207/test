<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Database connection details
$servername = "localhost";
$username = "root"; // Change if using another DB user
$password = "";     // Change if your DB has a password
$dbname = "register";

// Function to log errors to a file
function logError($message) {
    $logFile = 'db_errors.log';
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$timestamp] $message\n", FILE_APPEND);
}

// Create connection with improved error handling
try {
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        logError("Connection failed: " . $conn->connect_error);
        die("Database connection failed. Please contact the administrator.");
    }
} catch (Exception $e) {
    logError("Connection exception: " . $e->getMessage());
    die("Database connection failed. Please contact the administrator.");
}

// Verify if the 'users' table exists, create if it doesn't
$tableCheck = $conn->query("SHOW TABLES LIKE 'users'");
if ($tableCheck->num_rows == 0) {
    $createTable = "CREATE TABLE users (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    if (!$conn->query($createTable)) {
        logError("Table creation failed: " . $conn->error);
        die("Database setup failed. Please contact the administrator.");
    }
}

// Process form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data with improved sanitization
    $first_name = trim(htmlspecialchars($_POST['first_name'] ?? ''));
    $last_name = trim(htmlspecialchars($_POST['last_name'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';
    $referrer = isset($_POST['referrer']) ? $_POST['referrer'] : 'home2.html';

    // Validate required fields
    if (empty($first_name) || empty($last_name) || empty($email) || empty($password) || empty($confirm_password)) {
        die("All fields are required.");
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format.");
    }

    // Check if passwords match
    if ($password !== $confirm_password) {
        die("Passwords do not match.");
    }

    // Check if email already exists
    $checkEmail = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $checkEmail->bind_param("s", $email);
    $checkEmail->execute();
    $result = $checkEmail->get_result();
    if ($result->num_rows > 0) {
        die("Email already registered. Please use a different email.");
    }
    $checkEmail->close();

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    try {
        // Prepare SQL statement
        $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
        if (!$stmt) {
            logError("Prepare failed: " . $conn->error);
            die("Registration system error. Please try again later.");
        }
        
        $stmt->bind_param("ssss", $first_name, $last_name, $email, $hashed_password);

        // Execute and redirect or show error
        if ($stmt->execute()) {
            // Redirect to the referring page
            header("Location: $referrer");
            exit();
        } else {
            logError("Execute failed: " . $stmt->error);
            die("Failed to register user: " . $stmt->error);
        }
    } catch (Exception $e) {
        logError("Insert exception: " . $e->getMessage());
        die("Registration failed. Please try again later.");
    } finally {
        if (isset($stmt)) {
            $stmt->close();
        }
    }
} else {
    // If not POST request, redirect to the registration form
    header("Location: register.html");
    exit();
}

$conn->close();
?>