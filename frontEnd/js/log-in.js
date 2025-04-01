document.addEventListener("DOMContentLoaded", function () {
    // Select the button and inputs
    const submitButton = document.querySelector(".submit-btn");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    // Add event listener for button click
    submitButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default form behavior (in case it's inside a form)

        // Get the values from input fields
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Log values to console (for testing)
        console.log("Username:", username);
        console.log("Password:", password);

        // Simple validation (check if fields are empty)
        if (username === "" || password === "") {
            alert("Please fill in both fields.");
            return;
        }

        // Simulate login authentication (Replace this with backend validation)
        if (username === "user" && password === "1234") {
            alert("Login successful!");
            window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
            alert("Invalid username or password.");
        }
    });
});
