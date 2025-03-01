<?php
session_start(); // Session start karna zaroori hai

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);

    // Basic validation
    if (empty($name) || empty($email) || empty($password)) {
        die("Error: All fields are required!");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Error: Invalid email format!");
    }

    if (strlen($password) < 6) {
        die("Error: Password must be at least 6 characters long!");
    }

    // Data store in session (temporary storage)
    $_SESSION["user_data"] = [
        "name" => $name,
        "email" => $email
    ];

    echo "Registration successful! Data stored temporarily.";
} else {
    echo "Invalid request!";
}
?>
