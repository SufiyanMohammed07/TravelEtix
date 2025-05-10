const listing=require("./models/listing");
const review=require("./models/review.js");
const { listingschema,reviewschema} = require("./schemajoi.js");
const expresserror = require("./public/utils/expresserror.js");

//schema validation---------------------------------------->
module.exports.validateListing = (req, res, next) => {
  let result = listingschema.validate(req.body);
  if (result.error) {
    let err = new expresserror(
      400,
      `Invalid Listing Data,${result.error.message}`
    );
    next(err);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let result = reviewschema.validate(req.body);
  if (result.error) {
    let err = new expresserror(
      400,
      `Invalid Review Data,${result.error.message}`
    );
    next(err);
  } else {
    next();
  }
};

module.exports.isLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
      req.session.redirectUrl=req.originalUrl;
        req.flash("error","You Need To Login First To Create!!")
        return res.redirect("/login");
      }
      next();
}
module.exports.saveredirect=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
}

module.exports.isOwner=async(req,res,next)=>{
  let{id}=req.params;
  let Listing=await listing.findById(id);
  if(!Listing.owner.equals(res.locals.curruser._id)){
    req.flash("error","You Are Not The Owner Of This Listing!!!");
    return res.redirect(`/listings/${id}`);
  }
  next();
  
}
module.exports.isReviewAuthor=async(req,res,next)=>{
  let{id,reviewid}=req.params;
  let Review=await review.findById(reviewid);
  if(!Review.author.equals(res.locals.curruser._id)){
    req.flash("error","You Are Not The Author Of This Review!!!");
    return res.redirect(`/listings/${id}`);
  }
  next();
  
}