import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quantity: {
    type: Number,
    min: 1,
  }
}, {timestamps: true});


const Cart = mongoose.model("Cart", cartSchema);

export default Cart;