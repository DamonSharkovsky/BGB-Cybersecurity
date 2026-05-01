const login = document.querySelector(".login-form");

login.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    url = "http://localhost:5000/login";
    options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            if (data.user_id) {
                alert("Login successful!");
                window.location.href = "index.html"; // redirect
            } else {
                alert(data.error || "Login failed.");
            }
        });
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
});