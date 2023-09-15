const express = require("express");
const registerUser = require("../controllers/signup-controller");
const login = require("../controllers/login-controller");
const passport = require("passport");
const Client_URL = "http://localhost:5173/signup"
const {
  CallBack,
  IsLoggedIn,
  Failure,
  LogOut,
  LoggedUser,
} = require("../controllers/googleOauth-controller");
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", login);
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send("this is for only logged in users");
  }
);

router.get(
  "/googleOauth",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect:Client_URL,
    failureRedirect: "/api/v1/failure",
  }),
  CallBack
);
router.get("/google", IsLoggedIn, LoggedUser);
router.get("/failure", Failure);
router.get("/logout", LogOut);




module.exports = router;
