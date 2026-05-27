
const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
name:String,
description:String
},{timestamps:true});

module.exports=mongoose.model("Product",productSchema);
