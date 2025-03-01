function navigate(page) {
    const content = document.getElementById("content");
    
    if (page === "home") {
        content.innerHTML = "<h2>Welcome! Click Register to sign up.</h2>";
    } else if (page === "register") {
        content.innerHTML = `
            <h2>Register</h2>
            <form id="registrationForm">
                <label for="username">Username:</label>
                <input type="text" id="username"><br>

                <label for="email">Email:</label>
                <input type="email" id="email"><br>

                <label for="password">Password:</label>
                <input type="password" id="password" onkeyup="checkPasswordStrength()">
                <div id="password-strength"></div><br>

                <button type="submit">Register</button>
            </form>
        `;
        document.getElementById("registrationForm").addEventListener("submit", validateForm);
    }
}

function checkPasswordStrength() {
    const password = document.getElementById("password").value;
    const strengthText = document.getElementById("password-strength");

    if (password.length < 6) {
        strengthText.innerHTML = "<span style='color:red;'>Weak</span>";
    } else if (password.match(/[A-Z]/) && password.match(/[0-9]/)) {
        strengthText.innerHTML = "<span style='color:green;'>Strong</span>";
    } else {
        strengthText.innerHTML = "<span style='color:orange;'>Medium</span>";
    }
}

function validateForm(event) {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !email || !password) {
        alert("All fields are required!");
        return false;
    }

    if (!email.match(/^\S+@\S+\.\S+$/)) {
        alert("Invalid email address!");
        return false;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long!");
        return false;
    }

    alert("Registration Successful!");
}
