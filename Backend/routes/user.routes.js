import { Router } from "express";
import registerUser, {getUser} from "../controllers/user.controller.js";
const router = Router();

router
.route("/register")
.post(registerUser)

router
.route("/search")
.get(getUser)

router
.route("/verify")
.post()

export default router;