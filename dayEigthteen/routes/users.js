const express=require('express');
const { models } = require('mongoose');
const userrouter=express.Router();
const Userauth=require("../middleware/middle.js")
const User = require("../model/model.js");




userrouter.get("/uinfo",Userauth,async(req,res)=>{
try {
   const user= await User.findOne(req.result);
    res.send(user);//we are combine req to result
    
} catch (err) {
    res.status(404).send("ERROR: " + err.message);
}
})

userrouter.put("/update",Userauth,async(req,res)=>{
    try {
    const payload=jwt.verify(req.cookies.token,process.env.SERVER_KEY);
    console.log(payload._id); 
    await User.findByIdAndUpdate(payload._id,req.body,{runValidators:true});
    res.send("update success!")
} catch (err) {
    res.status(404).send("ERROR: " + err.message);
}
})


userrouter.delete("/delete",Userauth,async(req,res)=>{
try {
    const payload=jwt.verify(req.cookies.token,"sonu@123");
    await User.findByIdAndDelete(payload._id);
    res.clearCookie("token");
    res.send("delete succesfull")
} catch (error) {
    res.status(404).send("ERROR: "+ err.massage);
}
})

module.exports=userrouter;