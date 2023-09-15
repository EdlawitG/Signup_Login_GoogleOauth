function IsLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
function LoggedUser(req, res) {
  const name = req.user.displayName;
  res.status(200).send(`Salam  ${name}`);
}
function CallBack(req, res) {
  // Successful authentication, redirect or respond with a success message
  console.log("Successful authentication");
  res.send("loggedin");
}
function Failure(req, res) {
  res.send("something is wrong...");
}

function LogOut(req, res) {
  req.session.destroy();
  res.send("See you again Bye");
}
module.exports = { IsLoggedIn, CallBack, Failure, LogOut,LoggedUser };
