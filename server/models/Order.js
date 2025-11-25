const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productName: { type: String, required: true },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        priceAtPurchase: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    paymentMethod: [
      {
        cardNumber: String, required: true,
        cardHolderName: String, required: true,
        expirationDate: String, required: true,
        cvv: String, required: true

      }

    ]

  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
