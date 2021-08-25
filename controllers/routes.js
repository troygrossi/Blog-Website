const router = require("express").Router();
// Navigation Routes
router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});
module.exports = router;
