import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import APIResponse from "../utils/APIResponse.js";

async function verifyJwt(req, res, next) {
 try {
  const accessToken = req.cookies['access token'];
  console.log(accessToken);
  if(!accessToken) {
    return res.json(new APIResponse(400, "unauthorized request"));
  }

  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decodedToken?._id).select("-password, -refreshToken");
  if(!user) {
    res.json(new APIResponse(400, "invalid token"));
  }

  req.user = user;
  next();
 } catch (error) {
  console.log("verify jwt error :: ", error.message);
 }
}

export default verifyJwt;