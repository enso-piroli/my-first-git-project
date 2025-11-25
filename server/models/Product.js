const mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema(
    {
        tittle: { type: String, require: true, },
        description: { type: String, require: true },
        stock: { type: Number, required: true, default: 1 },
        image: { type: String, require: true },
        category: { type: String, required: true },
        price: { type: Number, require: true }
    },

    { timestamp: true }
)

module.exports = mongoose.model("Product", ProductSchema);