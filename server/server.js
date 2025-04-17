require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const MONGO_URI = "mongodb+srv://ensopirolideveloper:4YUAsTln6kbEGZPP@cluster0.ggbzazg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
