import { Router } from "express";
import registerUser, {getUser, loginUser, logout} from "../controllers/user.controller.js";
import verifyJwt from "../middlewares/verifyJwt.js";
const router = Router();

router
  .route("/register")
  .post(registerUser);

router
  .route("/search")
  .get(getUser);

router
  .route("/login")
  .post(loginUser);


router 
  .route("/logout")
  .get(verifyJwt, logout)

export default router;