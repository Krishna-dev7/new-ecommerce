import {Router} from "express";
import { createCart, deleteCart, getCartItem, listCartItems, updateCart } from "../controllers/cart.controller.js";
import asyncHandler from "../utils/AsyncHandler.js";
import verifyJwt from "../middlewares/verifyJwt.js";

const router = Router();

router
  .route("/")
  .get( verifyJwt ,asyncHandler(listCartItems));

router
  .route("/")
  .post( verifyJwt ,asyncHandler(createCart));

router  
  .route(":id")
  .get(asyncHandler(getCartItem))

router
  .route(":id")
  .put(asyncHandler(updateCart))

router
  .route(":id")
  .delete(asyncHandler(deleteCart));


export default router;