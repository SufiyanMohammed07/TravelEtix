const express=require("express");
const router=express.Router();
const asyncwrap = require("../public/utils/wrapasync.js");
const expresserror = require("../public/utils/expresserror.js");
const listing = require("../models/listing.js");
const wrapasync = require("../public/utils/wrapasync.js");
const {isLoggedin,isOwner,validateListing}=require("../middleware.js");
const listingcontroller=require("../Controller/listing.js");
const flash=require("connect-flash");
const multer  = require('multer')
const {storage}=require("../Cloud.js")
const upload = multer({ storage });

//implementing router.route technique


router.route("/")
//1.indexRoute 2.create route
.get(wrapasync(listingcontroller.index))
.post(isLoggedin,validateListing,upload.single('listing[imgupload]'),wrapasync(listingcontroller.createnewlisting));


router.get("/new", isLoggedin,listingcontroller.renedrnewform);

router.route("/:id")
//1.show route    2.edit route down is available this is patchupdate route 3.destroy route
.get(wrapasync(listingcontroller.viewwholepage))
.patch(isLoggedin,isOwner,upload.single('listing[imgupload]'),validateListing,wrapasync(listingcontroller.patchtherendereditpage))
.delete(isLoggedin,isOwner,wrapasync(listingcontroller.deletelisting));


//edit route---------------------------->
router.get("/:id/edit",isLoggedin,isOwner,wrapasync(listingcontroller.rendereditListingPage));

module.exports=router;