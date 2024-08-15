import { Router } from "express";
import registerUser, {getUser} from "../controllers/user.controller.js";
const router = Router();

router
.route("/register")
.post(registerUser)

router
.route("/user")
.get(getUser)

export default router;