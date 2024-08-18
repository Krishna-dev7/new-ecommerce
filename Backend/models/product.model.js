import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  slug: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true})


const Product = mongoose.model(Product, productSchema);
export default Product;