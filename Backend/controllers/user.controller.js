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

export default registerUser;
export {
  getUser
};