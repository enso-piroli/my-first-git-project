require('dotenv').config();
let Login = require('./models/Login')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Product = require('./models/Product');
const Cart = require('./models/Cart');
const MONGO_URI = ""

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        () => {
            console.log("succesfully created");
        }
    )
    .catch((err) => {
        console.log(err);

    })

app.get("/", (req, res) => {
    res.send("Admin Dashboard API is running...");
})


app.post("/Login", async (req, res) => {
    console.log(`POST /Login called/`);
    const { username, password } = req.body;
    try {
        // Find a user with matching username and password
        const user = await Login.findOne({ username, password });
        if (user && user._id == "688f94f9990090ded039434f") {
            res.status(200).json({ message: "Admin Login successful" });

        } else if (user) {
            res.status(200).json({
                message: "Login successful",
                userId: user._id
            });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/Login", async (req, res) => {
    console.log("GET /Login called");
    try {
        const users = await Login.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


app.post("/SignUp", async (req, res) => {
    console.log("POST /SignUp called");
    const { username, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await Login.findOne({ username });
        if (existingUser) {
            console.log("User already exists");
            return res.status(409).json({ message: "User already exists" });
        }

        // Create a new user
        const newUser = new Login({ username, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
        console.log("User registered successfully");
    } catch (err) {
        res.status(500).json({ message: "Server error" });
        console.error(err);
    }
});
app.delete("/Login/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await Login.findByIdAndDelete(userId);
        await Cart.deleteMany({ userId: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/Product", async (req, res) => {
    const { tittle, description, stock, image, category, price } = req.body;
    if (!tittle || !description || !stock || !image || !category || !price) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        // Check if the user already exists
        let product = await new Product({
            tittle,
            description,
            stock,
            image,
            category,
            price
        });
        await product.save();
        res.status(201).json({ message: "Product created successfully", product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


app.get("/Product", async (req, res) => {
    try {
        console.log("GET /Product called");
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

app.delete("/Product/:id", async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await Cart.deleteMany({ productId: productId });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/Cart", async (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    console.log("POST /Cart called with userId:", userId, "and productId:", productId);

    if (!userId || !productId) {
        return res.status(400).json({ message: "Invalid cart data" });
    }
    try {
        let cartProduct = await new Cart({
            userId: userId,
            productId: productId
        })
        await cartProduct.save();
        console.log("Cart updated:", cartProduct);
        res.status(200).json({ message: "Cart updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/Cart/CartItems", async (req, res) => {
    const userId = req.body.userId;
    console.log("POST /Cart/CartItems called with userId:", userId);
    try {
        const cartItems = await Cart.find({ userId: userId });
        console.log("Cart items fetched:", cartItems);
        res.json(cartItems);
    } catch (err) {
        console.error("Error fetching cart items:", err);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/Product/:id", async (req, res) => {
    const productId = req.params.id;
    console.log("GET /Product/:id called with productId:", productId);
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        console.log("Product fetched:", product);
        res.json(product);
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/Cart/RemoveItem", async (req, res) => {
    const { userId, productId } = req.body;
    console.log("POST /Cart/RemoveItem called with userId:", userId, "and productId:", productId);

    if (!userId || !productId) {
        return res.status(400).json({ message: "Invalid cart data" });
    }
    try {
        await Cart.findOneAndDelete({ userId: userId, productId: productId });
        console.log("Cart item removed successfully");
        res.status(200).json({ message: "Cart item removed successfully" });
    } catch (err) {
        console.error("Error removing cart item:", err);
        res.status(500).json({ message: "Server error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



