import { Router } from "express";
import { listProducts, createProduct, updateProduct, deleteProduct, getProduct } from "../controllers/product.controller.js";
import asyncHandler from "../utils/AsyncHandler.js";
import verifyJwt from "../middlewares/verifyJwt.js";
const router = Router();

router
  .route("/")
  .get(asyncHandler(listProducts));

router
  .route("/")
  .post( verifyJwt ,asyncHandler(createProduct));

router
  .route(":id")
  .get(asyncHandler(getProduct))

router
  .route(":id")
  .put(verifyJwt, asyncHandler(updateProduct))

router
  .route(":id")
  .delete(verifyJwt, asyncHandler(deleteProduct))

export default router;