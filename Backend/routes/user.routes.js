import { Router } from "express";
import registerUser, {getUser, loginUser, logout, search} from "../controllers/user.controller.js";
import verifyJwt from "../middlewares/verifyJwt.js";
const router = Router();

router
  .route("/register")
  .post(registerUser);

router
  .route("/search")
  .get(search);

router
  .route("/login")
  .post(loginUser);


router 
  .route("/logout")
  .post(verifyJwt, logout)

router
  .route("/getUser")
  .get(verifyJwt, getUser);

export default router;