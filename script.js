const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");
const togglePassword = document.getElementById("togglePassword");

const fields = [
    "studentId",
    "fullName",
    "email",
    "phone",
    "dob",
    "gender",
    "program",
    "yearLevel",
    "password",
    "confirmPassword",
    "address"
];

function showError(field, message) {
    field.classList.add("error");
    field.nextElementSibling.textContent = message;
}

function clearError(field) {
    field.classList.remove("error");
    field.nextElementSibling.textContent = "";
}

function validateField(field) {
    const value = field.value.trim();
    field.value = value;

    clearError(field);

    if (value === "") {
        showError(field, field.dataset.label ||
            field.id + " is required.");
        return false;
    }

    if (field.id === "email") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(value)) {
            showError(field, "Please enter a valid email address.");
            return false;
        }
    }

    if (field.id === "phone") {
        const phonePattern = /^09\d{9}$/;

        if (!phonePattern.test(value)) {
            showError(field, "Enter an 11-digit number starting with 09.");
            return false;
        }
    }

    if (field.id === "dob") {
        const birthDate = new Date(value + "T00:00:00");
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (birthDate > today) {
            showError(field, "Date of birth cannot be in the future.");
            return false;
        }
    }

    if (field.id === "password" && value.length < 8) {
        showError(field, "Password must be at least 8 characters.");
        return false;
    }

    if (field.id === "confirmPassword") {
        const password = document.getElementById("password").value;

        if (value !== password) {
            showError(field, "Passwords do not match.");
            return false;
        }
    }

    return true;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let isValid = true;

    fields.forEach(function(id) {
        const field = document.getElementById(id);

        if (!validateField(field)) {
            isValid = false;
        }
    });

    const agreement = document.getElementById("agreement");
    const agreementError = document.getElementById("agreementError");

    if (!agreement.checked) {
        agreementError.textContent =
            "You must agree to the terms and conditions.";
        isValid = false;
    } else {
        agreementError.textContent = "";
    }

    if (isValid) {
        successMessage.textContent =
            "Registration successful!";
        successMessage.classList.add("success");
    } else {
        successMessage.textContent = "";
        successMessage.classList.remove("success");
    }
});

fields.forEach(function(id) {
    const field = document.getElementById(id);

    field.addEventListener("input", function() {
        validateField(field);

        if (id === "password") {
            validateField(document.getElementById("confirmPassword"));
        }

        successMessage.textContent = "";
    });

    field.addEventListener("change", function() {
        validateField(field);
    });
});

togglePassword.addEventListener("click", function() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    const show = password.type === "password";

    password.setAttribute("type", show ? "text" : "password");
    confirmPassword.setAttribute("type", show ? "text" : "password");

    togglePassword.dataset.visible = String(show);

    togglePassword.classList.toggle("showing", show);

    togglePassword.textContent =
        show ? "Hide Passwords" : "Show Passwords";
});

form.addEventListener("reset", function() {
    setTimeout(function() {
        fields.forEach(function(id) {
            clearError(document.getElementById(id));
        });

        document.getElementById("agreementError").textContent = "";
        successMessage.textContent = "";
        successMessage.classList.remove("success");

        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");

        password.setAttribute("type", "password");
        confirmPassword.setAttribute("type", "password");

        togglePassword.dataset.visible = "false";
        togglePassword.classList.remove("showing");
        togglePassword.textContent = "Show Passwords";
    }, 0);
});

