const listing=require("../models/listing");
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const maptoken=process.env.MAP_TOKEN;
const geocodingClient = mbxgeocoding({ accessToken: maptoken });
//index route
module.exports.index=(async (req, res) => {
      let alldata = await listing.find({});
      res.render("index.ejs", { alldata });
    });
//render index
module.exports.renedrnewform=(req, res) => {
    res.render("new.ejs");
  };
//show route---------------------------------->
module.exports.viewwholepage=async (req, res) => {
      let { id } = req.params;
      let Listing = await listing.findById(id)
      .populate({
        path:"reviews",
        populate:{path:"author",},}).populate("owner");
      if(!Listing){
        req.flash("error","Listing You Requested For Does Not Exist!!");
        res.redirect("/listings");
      }
      res.render("show.ejs", { Listing });
}
//create route
module.exports.createnewlisting=async (req, res, next) => {
  let resopnse=await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
  })
    .send();
  let url=req.file.path;
  let filename=req.file.filename;
    const newlistings = new listing(req.body.listing);
    newlistings.owner=req.user._id;
    newlistings.image={url,filename};
    newlistings.geometry=resopnse.body.features[0].geometry;
    await newlistings.save();
    console.log(newlistings.geometry);
    req.flash("success","New Listing Is Created");
    res.redirect("/listings");
}
//edit route---------------------------->
module.exports.rendereditListingPage= async (req, res, next) => {
    let { id } = req.params;
    let data = await listing.findById(id);
    if(!data){
      req.flash("error","Listing You Requested For Does Not Exist!!");
      res.redirect("/listings");
    }
    let originalimageurl=data.image.url;
    originalimageurl=originalimageurl.replace("/upload","/upload/w_250");
    res.render("edit.ejs", { data,originalimageurl });
}
//update route
module.exports.patchtherendereditpage=async (req, res) => {
    let { id } = req.params;
    let all = await listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file!=="undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    all.image={url,filename};
    await all.save();
    }
    req.flash("success"," Listing Is Updated");
    res.redirect(`/listings/${id}`);
}
//destroy route
module.exports.deletelisting= async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","Listing Is Deleted");
    res.redirect("/listings");
  }

