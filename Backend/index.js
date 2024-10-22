import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import cookieParser from "cookie-parser";
import APIResponse from "./utils/APIResponse.js";
const app = express();

import cors from "cors"
app.use(cors({
  origin: "http://localhost:5173/",
  credentials: true
}));

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "ecommerce"
    });
    console.log("Mongodb connected successfully");

  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

connectDB()
.then ( () => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("server started listening at port: ", process.env.PORT);
  });
})
.catch ( error => {
  console.log("ConnectDb error: " + error.message);
})


// middlewares
// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

// defining routes
app.get("/api/home", (req, res) => {
  res.json({
    greet: "Hello! welcome"
  })
})

// authService
app.use("/api/users", userRouter);
// cartService
app.use("/api/carts", cartRouter);
// productService
app.use("/api/products", productRouter);
// orderService
app.use("/api/orders", orderRouter);


app.use((err, req, res, next) => {
  console.log("error middleware: ", err.message);
  res.json(new APIResponse(err.status, err.message));
  next(err);
} )