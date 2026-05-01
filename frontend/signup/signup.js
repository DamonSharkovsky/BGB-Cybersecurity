import authProvider from '../shared/providers/AuthProvider.js';

// Set max date for DOB (at least 13 years old)
const dobInput = document.getElementById("dob");
if (dobInput) {
    const today = new Date();
    const maxDob = new Date(
        today.getFullYear() - 13,
        today.getMonth(),
        today.getDate()
    );
    dobInput.max = maxDob.toISOString().split("T")[0];
}

const form = document.getElementById("signupForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Clear previous errors
  const errorEls = form.querySelectorAll(".error-message");
  errorEls.forEach((el) => el.remove());

  let valid = true;

  const password = form.password.value.trim();
  const confirmPassword = form.confirm_password.value.trim();
  
  if (password.length < 8) {
    showError(form.password, "Password must be at least 8 characters.");
    valid = false;
  }
  if (password !== confirmPassword) {
    showError(form.confirm_password, "Passwords do not match.");
    valid = false;
  }

  if (!form.checkValidity()) {
    valid = false;
    form.reportValidity();
  }

  if (valid) {
    const formData = {
      name: form.name.value.trim(),
      surname: form.surname.value.trim(),
      email: form.email.value.trim(),
      phone: "0000000000", // Defaulting as phone input is commented out in HTML
      password: password,
      dob: form.dob.value,
      gender: form.gender.value,
    };

    try {
        await authProvider.signup(formData);
        alert("Sign up successful! You can now log in.");
        form.reset();
        window.location.href = "login.html";
    } catch (error) {
        alert("Signup failed: " + (error || "Unknown error"));
    }
  }
});

function showError(input, message) {
  if (
    input.nextElementSibling &&
    input.nextElementSibling.classList.contains("error-message")
  ) {
    return;
  }
  const error = document.createElement("div");
  error.className = "error-message";
  error.style.color = "red";
  error.style.fontSize = "0.85rem";
  error.style.marginTop = "-24px";
  error.style.marginBottom = "12px";
  error.textContent = message;
  input.parentNode.insertBefore(error, input.nextSibling);
}
