// Set max date for DOB (at least 13 years old)
const dobInput = document.getElementById("dob");
const today = new Date();
const maxDob = new Date(
  today.getFullYear() - 13,
  today.getMonth(),
  today.getDate()
);
dobInput.max = maxDob.toISOString().split("T")[0];

// Initialize intl-tel-input
// Initialize intl-tel-input without geoIpLookup
const phoneInput = document.querySelector("#phone");
const iti = window.intlTelInput(phoneInput, {
  initialCountry: "us", // or any default country code like 'gb', 'ca', etc.
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
});

// Form validation
const form = document.getElementById("signupForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Clear previous errors
  const errorEls = form.querySelectorAll(".error-message");
  errorEls.forEach((el) => el.remove());

  let valid = true;

  // Check phone number validity
  if (!iti.isValidNumber()) {
    showError(phoneInput, "Please enter a valid phone number.");
    valid = false;
  }

  // Passwords match
  const password = form.password.value.trim();
  const confirmPassword = form.confirm_password.value.trim();
  if (password.length < 6) {
    showError(form.password, "Password must be at least 6 characters.");
    valid = false;
  }
  if (password !== confirmPassword) {
    showError(form.confirm_password, "Passwords do not match.");
    valid = false;
  }

  // Check all required inputs (basic HTML5 validity is good)
  if (!form.checkValidity()) {
    valid = false;
    form.reportValidity();
  }

  // Terms checkbox
  if (!form.terms.checked) {
    showError(form.terms, "You must accept the terms.");
    valid = false;
  }

  if (valid) {
    // Gather form data
    const formData = {
      name: form.name.value.trim(),
      surname: form.surname.value.trim(),
      email: form.email.value.trim(),
      phone: iti.getNumber(),
      password: password,
      dob: form.dob.value,
      gender: form.gender.value,
      terms: form.terms.checked,
    };

    // For demo, just log it
    backUpData(formData);
    console.log("Form submitted:", formData);

    alert("Sign up successful! Check console for submitted data.");
    form.reset();
    iti.reset();
  }
});

function showError(input, message) {
  if (
    input.nextElementSibling &&
    input.nextElementSibling.classList.contains("error-message")
  ) {
    return; // already showing error
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

function backUpData(formData) {
    url = "";
}
