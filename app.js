const express = require('express');
const app = express();

////
//Body Parser
////
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));


////
//Session
////
const expressSession = require("express-session");
app.use(
  expressSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
  })
);



////
//Flash Msgs
////
const flash = require("flash");
app.use(flash());

// ----------------------------------------
// Method Override
// ----------------------------------------
app.use((req, res, next) => {
  let method;
  if (req.query._method) {
    method = req.query._method;
    delete req.query._method;
    for (let key in req.query) {
      req.body[key] = decodeURIComponent(req.query[key]);
    }
  } else if (typeof req.body === 'object' && req.body._method) {
    method = req.body._method;
    delete req.body._method;
  }

  if (method) {
    method = method.toUpperCase();
    req.method = method;
  }

  next();
});



// ----------------------------------------
// Mongoose
// ----------------------------------------
const mongoose = require('mongoose');
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require('./mongo')().then(() => next());
  }
});

// ----------------------------------------
// Public
// ----------------------------------------
app.use(express.static(`${ __dirname }/public`));


// ----------------------------------------
// Referrer
// ----------------------------------------
app.use((req, res, next) => {
  req.session.backUrl = req.header('Referer') || '/';
  next();
});




////
//Authentication
////
// ----------------------------------------
// Services
// ----------------------------------------
const authService = require('./services/auth');
const User = require('./models').User;

app.use(authService({
  findUserByEmail: (email) => {
    return User.findOne({ email: email });
  },
  findUserByToken: (token) => {
    return User.findOne({ token: token });
  },
  validateUserPassword: (user, password) => {
    return user.validatePassword(password);
  }
}));



// ----------------------------------------
// Routes
// ----------------------------------------
const apiRouter = require("./routers/api");
const usersRouter = require('./routers/users');
app.use("/api/v1", apiRouter);
app.use('/', usersRouter);

////
//Handlebars
////
const h = require('./helpers/index');
const hbs = require("express-handlebars");
app.engine(
  "hbs",
  hbs({
    defaultLayout: "application",
    partialsDir: "views/partials",
    extname: ".hbs",
    helpers: h.registered
  })
);
app.set("view engine", "hbs");


// ----------------------------------------
// Server
// ----------------------------------------
const port = process.env.PORT ||
  process.argv[2] ||
  3000;
const host = 'localhost';


let args;
process.env.NODE_ENV === 'production' ?
  args = [port] :
  args = [port];

args.push(() => {
  console.log(`Listening: http://${ host }:${ port }\n`);
});


// If we're running this file directly
// start up the server
if (require.main === module) {
  app.listen.apply(app, args);
}



// ----------------------------------------
// Error Handling
// ----------------------------------------
app.use('/api', (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.stack) {
    err = err.stack;
  }
  res.status(500).json({ error: err });
});


app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.stack) {
    err = err.stack;
  }
  res.status(500).render('errors/500', { error: err });
});


module.exports = app;
