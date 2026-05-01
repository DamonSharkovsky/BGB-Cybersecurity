import authProvider from '../shared/providers/AuthProvider.js';

const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const data = await authProvider.login(email, password);
        if (data.id) {
            alert("Login successful!");
            // Store user info in localStorage if needed
            localStorage.setItem('user', JSON.stringify(data));
            window.location.href = "../home/index.html"; 
        } else {
            alert("Login failed: Unexpected response from server.");
        }
    } catch (error) {
        alert(error || "Login failed.");
    }
});


// Animate input labels on focus
document.querySelectorAll('.login-input').forEach(input => {
    input.addEventListener('focus', function() {
        this.nextElementSibling.classList.add('active');
    });
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.nextElementSibling.classList.remove('active');
        }
    });
    // Check if input has value on load (for browser autofill)
    if (input.value) {
        input.nextElementSibling.classList.add('active');
    }
});
