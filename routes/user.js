const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapasync = require("../public/utils/wrapasync.js");
const passport=require("passport");
const { saveredirect } = require("../middleware.js");
const usercontroller=require("../Controller/users.js");

//implementing router.route technique

//1.display signup page 2.storing the signup info in db
router.route("/signup")
.get(usercontroller.displaysignuppage)
.post(wrapasync(usercontroller.signupstoringindb));


//1.display login page 2.after login redirecting to where the user is on the lastscreen
router.route("/login")
.get(usercontroller.displayloginpage)
.post(saveredirect,passport.authenticate('local', { failureRedirect: '/login',failureFlash:true }),usercontroller.afterlogin);

//if he is loggedin then he can loggedout
router.get("/logout",usercontroller.loggedOut);

module.exports=router;