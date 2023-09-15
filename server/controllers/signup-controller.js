const hashPassword = require("../middlewares/hashPassword");
const speakeasy = require("speakeasy");
const db = require("../models");
const User = db.user;

async function registerUser(req, res, next) {
  const { firstName, email, password } = req.body;
  const secret = speakeasy.generateSecret();
  console.log(secret);
  const hashedPassword = await hashPassword(password);
  if (!hashedPassword) return next({ status: 500 });
  const alreadyExist = await User.findOne({ where: { email } });
  if (alreadyExist) {
    return res.json({ message: "User with this email already exist" });
  }
  let user = { firstName, email, password: hashedPassword };
  try {
    const createdUser = await User.create(user);
    res.status(200).send(createdUser);
    console.log(createdUser);
  } catch (error) {
    console.log(err);
  }
}

module.exports = registerUser;
