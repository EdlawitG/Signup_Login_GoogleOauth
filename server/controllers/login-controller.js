const bcrypt = require("bcryptjs");
const generateToken = require("../middlewares/generateToken");
const db = require("../models");
const User = db.user;
async function login(req, res, next) {
  const { email, password } = req.body;

  const userWithEmail = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log(err);
    }
  );
  const hasCorrectCredential = await bcrypt.compare(
    password,
    userWithEmail.password
  );
  if (!userWithEmail) {
    return res.json({ message: "Email or Password doesn't match!" });
  } else if (!hasCorrectCredential) {
    return next({ status: 400, errors: ["Invalid email or password"] });
  }

  const jwttoken = await generateToken({
    id: userWithEmail.id,
    email: userWithEmail.email,
  });
  res.json({ message: "welcome Back!", token: jwttoken });
}
module.exports = login;
