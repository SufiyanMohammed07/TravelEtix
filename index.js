if (process.env.NODE_ENV != "Production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const ejsMate = require("ejs-mate");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const listing = require("./models/listing.js");
const review = require("./models/review.js");
const asyncwrap = require("./public/utils/wrapasync.js");
const expresserror = require("./public/utils/expresserror.js");
const wrapasync = require("./public/utils/wrapasync.js");
const { listingschema, reviewschema } = require("./schemajoi.js");
const Routerlistings = require("./routes/listing.js");
const Routerreviews = require("./routes/review.js");
const Routeruser = require("./routes/user.js");
const { send } = require("process");
const port = process.env.PORT || 8080;

let dbAtlasurl = process.env.ATLAS_URL;

//-mongodb connections Establishment---------------------
main()
  .then((res) => {
    console.log("succesfully connected to db");
  })
  .catch((err) => {
    console.log("ERROR IN CONNECTION DB",err);
  });

async function main() {
  await mongoose.connect(dbAtlasurl);
}
app.get("/", (req, res) => {
  console.log("working...");
  res.send("this is root path it is working");
});
// -----------------------------------------------------------Establishment completed

// --------------------------------------------------
const store = MongoStore.create({
  mongoUrl: dbAtlasurl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});
store.on("error", () => {
  console.log("ERROR in mongo-seesion store");
});

const sessionoptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 3 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionoptions));
console.log("ATLAS_URL from .env:", process.env.ATLAS_URL);


app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curruser = req.user;
  next();
});


app.use("/listings", Routerlistings);
app.use("/listings/:id", Routerreviews);
app.use("/", Routeruser);

app.use((err, req, res, next) => {
  let { statuscode = 500, message = "Something Went Wrong" } = err;
  res.status(statuscode).send(message);
});

app.listen(port,'0.0.0.0', () => {
  console.log("server is listeneing on", port);
});
