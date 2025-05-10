const mongoose = require("mongoose");
const reviewschema=new mongoose.Schema({
    comment:String,
    rating:{
        type:Number,
        min:0,
        max:5
    },
    created_At:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})
const review=mongoose.model("review",reviewschema);
module.exports=review;