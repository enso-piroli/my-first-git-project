let users = document.getElementById("users");
let products = document.getElementById("products");
let userList = document.getElementById("user-list");
let productList = document.getElementById("products-list");
let usersContainer = document.getElementById("users-container");
let productsContainer = document.getElementById("products-container");
let productButton = document.getElementById("product-submit");



const tittleInput = document.getElementById("product-tittle");
const descriptionInput = document.getElementById("product-description");
const stockInput = document.getElementById("product-stock");
const imageInput = document.getElementById("product-image");
const categoryInput = document.getElementById("product-category");
const priceInput = document.getElementById("product-price");
const logOut = document.getElementById("log-out")

logOut.addEventListener("click", function () {
    window.location.href = "../html/log-in.html";
})

users.addEventListener("click", function () {
    usersContainer.style.display = "flex";
    productsContainer.style.display = "none";


    fetch("http://localhost:5000/Login", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(response => response.json())
        .then(data => {
            userList.innerHTML = ""; // Clear existing list items
            data.forEach(user => {
                const tr = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.classList.add("delete-btn")
                deleteBtn.addEventListener("click", function () {
                    fetch(`http://localhost:5000/Login/${user._id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    })
                        .then(response => {
                            if (response.ok) {
                                tr.remove(); // Remove the row from the table
                            } else {
                                console.error("Failed to delete user");
                            }
                        })
                        .catch(error => console.error("Error deleting user:", error));
                });
                td1.textContent = user.username;
                td2.textContent = user.password;
                td3.appendChild(deleteBtn);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                userList.appendChild(tr);
                console.log(user);
            });
        })
        .catch(error => console.error("Error fetching Login details:", error));
});
fetch("http://localhost:5000/Product", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
    .then(response => response.json())
    .then(data => { // Clear existing list items
        data.forEach(product => {
            const div = document.createElement("div");
            div.classList.add("product-item");
            const tittle = document.createElement("h3");
            const description = document.createElement("p");
            const stock = document.createElement("p");
            const image = document.createElement("p");
            const category = document.createElement("p");
            const price = document.createElement("p");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-btn");
            deleteButton.addEventListener("click", function () {
                fetch(`http://localhost:5000/Product/${product._id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                    .then(response => {
                        if (response.ok) {
                            div.remove(); // Remove the product item from the list
                        } else {
                            console.error("Failed to delete product");
                        }
                    })
                    .catch(error => console.error("Error deleting product:", error));
            });

            tittle.textContent = `Tittle: ${product.tittle}`;
            description.textContent = `Description: ${product.description}`;
            stock.textContent = `Stock: ${product.stock}`;
            image.textContent = `Image: ${product.image}`;
            category.textContent = `Category: ${product.category}`;
            price.textContent = `Price: $${product.price}`;
            div.appendChild(tittle);
            div.appendChild(description);
            div.appendChild(stock);
            div.appendChild(image);
            div.appendChild(category);
            div.appendChild(price);
            div.appendChild(deleteButton);
            productList.appendChild(div);
            console.log(product.tittle + " this is test on fetching  " + product.description + "   " +
                product.stock + "   " + product.category + "   " + product.image
            )
        });
    })
    .catch(error => console.error("Error fetching product details:", error));



products.addEventListener("click", function () {
    usersContainer.style.display = "none";
    productsContainer.style.display = "flex";


});

productButton.addEventListener("click", function (event) {

    event.preventDefault(); // Prevent default form behavior (in case it's inside a form)

    let array = [
        tittleInput.value.trim(),
        descriptionInput.value.trim(),
        stockInput.value.trim(),
        imageInput.value.trim(),
        categoryInput.value.trim(),
        priceInput.value.trim()
    ]
    console.log(array);
    fetch("http://localhost:5000/Product", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tittle: array[0],
            description: array[1],
            stock: array[2],
            image: array[3],
            category: array[4],
            price: array[5]
        })
    })
        .then(response => console.log(response.json()))
        .then(data => {
            console.log("Product added:", data);
            // Optionally, you can clear the input fields after submission
            tittleInput.value = "";
            descriptionInput.value = "";
            stockInput.value = "";
            imageInput.value = "";
            categoryInput.value = "";
            priceInput.value = "";
        })
        .catch(error => console.error("Error adding product:", error));

})

// You can now use these trimmed values for further processing or API calls



