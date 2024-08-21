import User from "../models/user.model.js";
import APIResponse from "../utils/APIResponse.js";

async function generateAccessAndRefreshToken(userId) {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});

    return {accessToken, refreshToken};
  } catch (error) {
    console.log("generation error :: " + error.message);
  }
}

async function registerUser(req, res) {
  const {username, fullName, email, password} = req.body;

  const userExist = await User.findOne({ $or: [{username}, {email}] })
  if (userExist) {
    console.log("user already exist");
    res.json({msg: "user already exist"});
    return;
  }

  const user = User.create({
    username,
    fullName,
    email,
    password
  })

  const isUserCreated = await User.findById(user._id);
  if (isUserCreated) {
    console.log("User created successfully");
  }

  res
  .status(200)
  .json({user});
}

async function search(req, res) {
  const { email, username } = req.query;
  const userExist = await User.find({ $or: [{username}, {email}] });
  console.log(userExist);
  res.json(userExist);
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.json(new APIResponse(400, 'email and password are required'));
    }

    const existingUser = await User.findOne({email});
    if (!existingUser) {
      console.log("existed user: ", existingUser);
      return res.json(new APIResponse(400, "user doesn't exist"));
    }

    const verifiedUser = await existingUser.comparePassword(password);
    if(!verifiedUser) {
      console.log("verified User: ", verifiedUser);
      res.json(new APIResponse(400, "invalid password"));
    }
    console.log("verifiedUser: ", verifiedUser);

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(existingUser._id);
    const options = {
      httpOnly: true,
      secure: true,
    }

    res
      .status(200)
      .cookie("access token", accessToken, options)
      .cookie("refresh token", refreshToken, options)
      .json(new APIResponse(
        200,
        "logedin successfully",
        { user: existingUser, accessToken, refreshToken }
      ))

  } catch (error) {
    console.log(error.message);
  }
}

async function logout(req, res) {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: {
      refreshToken: 1
    } },
    { new: true }
  )

  const options = {
    httpOnly: true,
    secure: true
  }

  res
    .status(200)
    .clearCookie("access token", options)
    .clearCookie("refresh token", options)
    .json(new APIResponse(200, "logout successfully"));
}

async function getUser(req, res) {
  try {
    const user = req.user ?? false;
    if(user) {
      return res.json(user);
    }

    res.json({user: false});
  } catch (error) {
    console.log(error.message);
  }
}

export default registerUser;
export {
  getUser,
  search,
  loginUser,
  logout
};