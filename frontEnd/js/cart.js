
let cartItemsContainer = document.getElementsByClassName("cart-items-container")[0];
let cartTotal = document.getElementsByClassName("cart-total")[0];
let cartSummary = document.getElementsByClassName("cart-summary")[0];
let totalCounter = document.getElementsByClassName("total-amount")[0];
let checkoutButton = document.getElementById("checkout");
let itemIdArray = [];
let invoiceTotal = 0;

document.addEventListener("DOMContentLoaded", function () {
    console.log(itemIdArray);
    fetch("http://localhost:5000/Cart/CartItems", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: localStorage.getItem("userId") })
    }).then(response => response.json()).then(cartItems => {
        cartItems.forEach(item => {
            itemIdArray.push(item.productId);
        });
    }).then(() => {
        itemIdArray.forEach(id => {
            fetch(`http://localhost:5000/Product/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => response.json()).then(product => {
                invoiceTotal += product.price;
                totalCounter.textContent = "Total: $" + invoiceTotal;
                let checkOutSection = document.createElement("div");
                checkOutSection.classList.add("cart-checkout-section");
                checkOutSection.innerHTML = `
                <div class="cart-checkout-item">
                    <h3 class="cart-item-title">Tittle: ${product.tittle}</h2>
                    <h3 class="cart-item-category">Category: ${product.category}</h3>
                    <h3 class="cart-item-price">Price: ${product.price}$</h3>
                </div>
                `;
                cartSummary.appendChild(checkOutSection);

                let cartRow = document.createElement("div");
                cartRow.classList.add("cart-row");
                cartRow.innerHTML = `
                <div class="cart-item">
                    <h2 class="cart-item-title">Tittle: ${product.tittle}</h2>
                     <img class="cart-item-image" src="${product.image}" width="100" height="100">
                    <p class="cart-item-description">Description: ${product.description}</p>
                    <h3 class="cart-item-category">Category: ${product.category}</h3>
                    <h3 class="cart-item-price">Price: ${product.price}$</h3>
                </div>
                `;
                let removeButton = document.createElement("button");
                removeButton.classList.add("remove-btn");
                removeButton.textContent = "Remove";
                removeButton.addEventListener("click", function () {
                    fetch("http://localhost:5000/Cart/RemoveItem", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ userId: localStorage.getItem("userId"), productId: product._id })
                    }).then(response => response.json()).then(data => {
                        if (data.message === "Cart item removed successfully") {
                            alert("Item removed from cart.");
                            cartItemsContainer.removeChild(cartRow);
                            invoiceTotal -= product.price;
                            totalCounter.textContent = "Total: $" + invoiceTotal;
                        } else {
                            alert("Failed to remove item from cart.");
                        }
                    });
                });
                cartRow.appendChild(removeButton);
                cartItemsContainer.appendChild(cartRow);
            });
        });
    });

});

checkoutButton.addEventListener("click", function () {
    
});





