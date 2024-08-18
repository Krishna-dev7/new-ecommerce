import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  
}, {timestamps: true});


const Cart = mongoose.model("Cart", cartSchema);