
const router=require("express").Router();
const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

router.post("/register",async(req,res)=>{
try{

const {name,email,password}=req.body;

const exists=await User.findOne({email});

if(exists){
return res.status(400).json({message:"User Already Exists"});
}

const hashed=await bcrypt.hash(password,10);

await User.create({
name,
email,
password:hashed
});

res.json({message:"Registered Successfully"});

}catch(err){
res.status(500).json({message:err.message});
}
});

router.post("/login",async(req,res)=>{
try{

const {email,password}=req.body;

const user=await User.findOne({email});

if(!user){
return res.status(400).json({message:"Invalid Credentials"});
}

const match=await bcrypt.compare(password,user.password);

if(!match){
return res.status(400).json({message:"Invalid Credentials"});
}

const token=jwt.sign(
{id:user._id},
process.env.JWT_SECRET,
{expiresIn:"7d"}
);

res.json({token});

}catch(err){
res.status(500).json({message:err.message});
}
});

module.exports=router;
