const User=require("../models/user");

//Display SignUp Page
module.exports.displaysignuppage=(req,res)=>{
    res.render("user/signup.ejs");
}
//storing the signup info in db
module.exports.signupstoringindb=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newuser=new User({username,email});
        const registerduser=await User.register(newuser,password);
        req.login(registerduser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to WanderLust");
            res.redirect("/listings");
        })
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}
//display login page
module.exports.displayloginpage=(req,res)=>{
    res.render("user/login.ejs");
}
//after login redirecting to where the user is on the lastscreen
module.exports.afterlogin=(async(req,res)=>{
    req.flash("success","Welcome Back To Wandelust");
    let redirect=res.locals.redirectUrl || "/listings";
    res.redirect(redirect);
})
//if he is loggedin then he can loggedout
module.exports.loggedOut=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","You Are SuccessFully LoggedOut!!");
        res.redirect("/listings");
    })
}