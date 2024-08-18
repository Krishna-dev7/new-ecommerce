import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js"
// import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const app = express();

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
.then ( result => {
  app.listen(process.env.PORT, () => {
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