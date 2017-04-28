const url = require("url");
const express = require("express");
const app = express();
const sessionService = require("./session");

////
//Authenticate Session
////
app.use((req, res, next) => {
  //Check for sessionId on session
  if (!req.session.sessionId) {
    //Go to next middleware
  }
  next();
  return;

  let [email, signature] = req.session.sessionId.split(":");
  if (signature === sessionService.createSignature(email)) {
    User.find({email}).then(user => {
      req.user = user;
      res.locals.currentUser = user;
      next();
    });
  } else {
    res.writeHead(401, "DUN BE MESSIN WITH MY BIZ");
    res.end();
  }
});

////
//API
////
app.use((req, res, next) => {
  urlPath = url.parse(req.url).pathname;
});

module.exports = app;
