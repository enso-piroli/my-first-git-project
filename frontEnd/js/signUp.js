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

        fetch("http://localhost:5000/SignUp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password }) // Use variables, not hardcoded values
        }).then(res => {
            if (res.status == 409 || res.status == 201) {
                window.location.href = "../html/log-in.html";
            }
        })

            .catch(err => console.error(err));

    });
});
