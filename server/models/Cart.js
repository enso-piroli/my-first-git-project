let mongoose = require("mongoose")


let cartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [
          {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true, default: 1 },
          },
        ],
      },
      { timestamps: true }
    );
    
    module.exports = mongoose.model("Cart", CartSchema);
