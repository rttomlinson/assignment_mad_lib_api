const app = require("express");
const router = app.Router();
const mongoose = require("mongoose");
const models = require("../models");
const User = models.User;
const SessionIdHelper = require("../services/session.js");




router.get("/", (req, res) => {
    console.log("See if sessionId is set on req.session", req.session);
  if (req.user) {
    res.render("home");
  } else {
    res.redirect("/login");
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
    req.session.sessionId = SessionIdHelper.createSignedSessionId(user.email);
    res.redirect("/");
  });
});

module.exports = router;
