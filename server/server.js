const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const app = express();
require("dotenv").config();
const UserRouter = require("./routes/userRouter");
require("./middlewares/passport.js");
require("./middlewares/googleAuth");
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello Backend");
});
app.use("/api/v1", UserRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
