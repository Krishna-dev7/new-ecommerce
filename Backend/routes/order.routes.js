import { Router } from "express";
import asyncHandler from "../utils/AsyncHandler.js";
import { createOrder, listOrders } from "../controllers/order.controller.js";
import verifyJwt from "../middlewares/verifyJwt.js";
const router = Router();

router
    .route("/")
    .post(verifyJwt, asyncHandler(createOrder));

router
    .route("/")
    .get(verifyJwt, asyncHandler(listOrders));

export default router;