const mongoose =require("mongoose");
const initdata=require("./data.js");
const listing=require("../models/listing.js");
main().then((res)=>{
    console.log("succesfully connected to db")
})
.catch((err)=>{
    console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');
}
const  initdb=async()=>{
    await listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"680e61ed079688692af062d2"}));
    await listing.insertMany(initdata.data);

    console.log("data is initialized");
}

initdb();