const app = require("express")();

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
//Body Parser
////
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

////
//Flash Msgs
////
const flash = require("flash");
app.use(flash());

////
//Mongoose
////
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/assignment_mad_lib_api");


////
//Authentication
////

//we can to see if they have a sessionId on req.session.sessionId
// const authenticateUser = require("./services/auth");
// app.use(authenticateUser)



////
//Routers
////
const indexRouter = require("./routers/index");
app.use("/", indexRouter);

////
//Handlebars
////
const hbs = require("express-handlebars");
app.engine(
  "hbs",
  hbs({
    defaultLayout: "application",
    partialsDir: "views/partials",
    extname: ".hbs"
  })
);
app.set("view engine", "hbs");





////
//Server Listen
////
const hostname = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;
app.listen(port);
