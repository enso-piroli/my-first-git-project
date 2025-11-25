const logOut = document.getElementById("log-out");
const productContainer = document.getElementsByClassName("products-show");
const userId = localStorage.getItem("userId") || null;

console.log("User ID:", userId);
logOut.addEventListener("click", function () {
    window.location.href = "../html/log-in.html";
});


fetch("http://localhost:5000/Product", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
})
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            let productId = element._id;
            let productSpan = document.createElement("span");
            let tittle = document.createElement("h2");
            let image = document.createElement("img");
            let price = document.createElement("h4");
            let category = document.createElement("h4");
            let stock = document.createElement("h4");
            let description = document.createElement("p");
            let addToCartButton = document.createElement("button");
            addToCartButton.textContent = "Add to Cart";
            addToCartButton.classList.add("add-to-cart-btn");
            addToCartButton.addEventListener("click", function () {
                fetch("http://localhost:5000/Cart", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ productId, userId })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message === "Cart updated successfully") {
                            alert("Item added to cart!");
                            console.log("Item added to cart:", data);
                        }
                    })
                    .catch(error => {
                        console.error("Error adding item to cart:", error);
                    });
            });

            tittle.textContent = element.tittle;
            image.src = element.image;
            price.textContent = "$" + element.price;
            description.textContent = element.description;
            category.textContent = "Category: " + element.category;
            stock.textContent = "Stock: " + element.stock;
            productSpan.appendChild(tittle);
            productSpan.appendChild(image);
            productSpan.appendChild(price);
            productSpan.appendChild(description);
            productSpan.appendChild(category);
            productSpan.appendChild(stock);
            productSpan.appendChild(addToCartButton);
            productContainer[0].appendChild(productSpan);
        });
    });

let iphoneCategorySelector = document.getElementById("iphone-category");


iphoneCategorySelector.addEventListener("click", function () {
    for (let i = 0; i < productContainer[0].children.length; i++) {
        let product = productContainer[0].children[i];
        if (product.children[4].textContent !== "Category: iphone") {
            product.style.display = "none";
        } else {
            product.style.display = "block";
        }
    }
}
)

let ipadCategorySelector = document.getElementById("ipad-category");
ipadCategorySelector.addEventListener("click", function () {
    for (let i = 0; i < productContainer[0].children.length; i++) {
        let product = productContainer[0].children[i];
        if (product.children[4].textContent !== "Category: ipad") {
            product.style.display = "none";
        } else {
            product.style.display = "block";
        }
    }
}
)


let appleWatchCategorySelector = document.getElementById("apple-watch-category");
appleWatchCategorySelector.addEventListener("click", function () {
    for (let i = 0; i < productContainer[0].children.length; i++) {
        let product = productContainer[0].children[i];
        if (product.children[4].textContent !== "Category: apple-watch") {
            product.style.display = "none";
        } else {
            product.style.display = "block";
        }
    }
}
)

let macCategorySelector = document.getElementById("mac-category");
macCategorySelector.addEventListener("click", function () {
    for (let i = 0; i < productContainer[0].children.length; i++) {
        let product = productContainer[0].children[i];
        if (product.children[4].textContent !== "Category: mac") {
            product.style.display = "none";
        } else {
            product.style.display = "block";
        }
    }
}
)

let earpodsCategorySelector = document.getElementById("earpods-category");
earpodsCategorySelector.addEventListener("click", function () {
    for (let i = 0; i < productContainer[0].children.length; i++) {
        let product = productContainer[0].children[i];
        if (product.children[4].textContent !== "Category: earpods") {
            product.style.display = "none";
        } else {
            product.style.display = "block";
        }
    }
}
)

let allCategorySelector = document.getElementById("all-category");
allCategorySelector.addEventListener("click", function () {
    for (let i = 0; i < productContainer[0].children.length; i++) {
        let product = productContainer[0].children[i];
        product.style.display = "block";
    }
}
)




