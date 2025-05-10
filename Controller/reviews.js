const listing=require("../models/listing");
const review=require("../models/review");

//created review we need to post  review route
module.exports.createdreview=async (req, res) => {
    let { id } = req.params;
    let Listing = await listing.findById(id);
    let newreview = new review(req.body.review);
    newreview.author=req.user._id;
    Listing.reviews.push(newreview);
    await newreview.save();
    await Listing.save();
    req.flash("success","New Review Is Created");

    res.redirect(`/listings/${id}`);
}

//delete review route   i.e deleting comments by the owner who created review--------------------->
module.exports.deletereview=async (req, res) => {
    let { id, reviewid } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await review.findByIdAndDelete(reviewid);
    req.flash("success","Review Is Deleted");
    res.redirect(`/listings/${id}`);
}

//edit the review if he is created the review eg:if he is the author then he can edit
module.exports.editreview=async (req, res) => {
  let { id, reviewid } = req.params;
  let Listing = await listing.findById(id);
  let reviewdata = await review.findById(reviewid);
  let passcomment = reviewdata.comment;
  let passrating = reviewdata.rating;
  res.render("editview.ejs", { reviewdata, passcomment, passrating, Listing });
}

//patch the review and updateing the review
module.exports.patchthereview=async (req, res) => {
    let { id, reviewid } = req.params;
    let totaldata = req.body.listing;
    req.flash("success","Review Is Updated");
    await review.findByIdAndUpdate(reviewid, totaldata);
    res.redirect(`/listings/${id}`);
}
