const express = require("express");
const router = express.Router({mergeParams:true});
const review = require("../models/review.js");
const expresserror = require("../public/utils/expresserror.js");
const wrapasync = require("../public/utils/wrapasync.js");
const listing = require("../models/listing.js");
const asyncwrap = require("../public/utils/wrapasync.js");
const {validateReview,isLoggedin,isReviewAuthor}=require("../middleware.js");
const reviewcontroller=require("../Controller/reviews.js");

//post review route
router.post("/review",isLoggedin,validateReview,wrapasync(reviewcontroller.createdreview));

//delete review route--------------------->
router.delete("/review/:reviewid",isLoggedin,isReviewAuthor,wrapasync(reviewcontroller.deletereview));
//edit the review
router.get("/edit/:reviewid",isLoggedin,isReviewAuthor,wrapasync(reviewcontroller.editreview));
//patch the review
router.patch("/:reviewid",isLoggedin,isReviewAuthor,wrapasync(reviewcontroller.patchthereview));

module.exports = router;
