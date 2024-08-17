import User from "../models/user.model.js";

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

async function getUser(req, res) {
  const { email, username } = req.query;
  const userExist = await User.find({ $or: [{username}, {email}] });
  console.log(userExist);
  res.json(userExist);
}

// Todo:
// get credentials
// match with our database
// generate access and refresh token

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email && password) {
      res.json(new APIResponse(400, 'email and password are required'));
    }

    const existedUser = await User.findOne({email});
    if (!existedUser) {
      res.json(new APIResponse(400, "user doesn't exist"));
    }

    const verifiedUser = await existedUser.comparePassword(password);
    if(!verifiedUser) {
      res.json(new APIResponse(400, "invalid password"));
    }

    

  } catch (error) {
    
  }
}

export default registerUser;
export {
  getUser
};