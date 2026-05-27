
const router=require("express").Router();
const Product=require("../models/Product");
const auth=require("../middleware/authMiddleware");

router.get("/",auth,async(req,res)=>{
const products=await Product.find().sort({createdAt:-1});
res.json(products);
});

router.post("/",auth,async(req,res)=>{
const product=await Product.create(req.body);
res.json(product);
});

router.put("/:id",auth,async(req,res)=>{
const updated=await Product.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
);

res.json(updated);
});

router.delete("/:id",auth,async(req,res)=>{
await Product.findByIdAndDelete(req.params.id);
res.json({message:"Deleted"});
});

module.exports=router;
