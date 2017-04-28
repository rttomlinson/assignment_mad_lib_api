const app = require("express");
const router = app.Router();
const mongoose = require("mongoose");
const models = require("../models");
const User = models.User;

router.get("/", (req, res) => {
  if (req.user) {
    res.render("home");
  } else {
    redirect("/login");
  }
});

router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  console.log(req.body);
  let {fname, lname, email, password} = req.body.user;
  User.create({
    fname,
    lname,
    email,
    password
  }).then(user => {
    console.log(user);
    res.redirect("/");
  });
});

module.exports = router;
