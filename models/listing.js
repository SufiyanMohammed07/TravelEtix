const { required } = require("joi");
const review=require("./review.js");
const mongoose=require("mongoose");
const listingschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    // image:{
    //     type:String,
    //     filename:String,
    //     url:String,
    //     // default:"https://images.unsplash.com/photo-1741851374655-3911c1b0e95a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     // set:(v)=>v===""?"https://images.unsplash.com/photo-1741851374655-3911c1b0e95a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,
    // },
    image: {
        url:String,
        filename:String,
    },
    
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"review",
        },
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    geometry:{
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
    }
    
})
const listing=mongoose.model("listing",listingschema);
//middleware for review
listingschema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await review.deleteMany({_id:{$in:listing.reviews}});
    }
})
module.exports=listing;