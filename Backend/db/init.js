import mongoose from "mongoose";
import Product from "../models/product.model.js";

async function  connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("database connected successfully");
  } catch (error) {
    console.log(error.message);
  }
}

connectDB();

const products = [
  {
    slug: "strawberries-shake",
    description: "Sweet and juicy fresh strawberries, perfect for snacking or adding to your favorite recipes.",
    price: 3.99,
    quantity: 12,
    image: "https://i.pinimg.com/474x/21/f6/9a/21f69a5eebda5103f47978c7f43b1ba9.jpg" // image of fresh strawberries
  },

  {
    slug: "quinoa-salad",
    description: "Nutritious and delicious quinoa salad, perfect for a quick and healthy lunch.",
    price: 5.99,
    quantity: 15,
    image: "https://i.pinimg.com/236x/08/e4/4a/08e44a605fbe6c8b26b913a8233ee0f4.jpg" // image of quinoa salad
  },

  {
    slug: "spaghetti-bolognese",
    description: "Delicious and authentic spaghetti bolognese, made with love and care. Perfect for a comforting dinner.",
    price: 6.99,
    quantity: 12,
    image: "https://i.pinimg.com/236x/9c/77/3c/9c773caaecaa2b3df24aa4a523805bc2.jpg" // image of spaghetti bolognese
  },
  {
    slug: "dark-chocolate-cake",
    description: "Rich and decadent dark chocolate cake, perfect for a special occasion or indulgent treat.",
    price: 8.99,
    quantity: 15,
    image: "https://i.pinimg.com/236x/55/e2/c1/55e2c1269d23d0ae31985f3864f5e754.jpg" // image of dark chocolate cake
  },
]

products.forEach( async p => {
  try {
    const product = await Product.create(p)
    console.log(product);
  } catch (error) {
    console.log(error.message);
  } 
} )