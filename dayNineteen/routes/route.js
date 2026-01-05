const express=require('express');
const app=express();
app.use(express.json());
const authroute=express.Router();
const userauth=require("../middleware/middle.js");
const User=require("../models/model.js");
const jwt=require('jsonwebtoken');
const cookieparser=require('cookie-parser');
app.use(cookieparser());

require('dotenv').config();


authroute.get("/userinfo",userauth,async(req,res)=>{
    try {
        
    const ans=await User.findOne();
    res.send(req.ans);
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

authroute.put("/update",userauth,async(req,res)=>{

    try {
    const payload=jwt.verify(req.cookies.token,process.env.SERVER_KEY);
    await User.findByIdAndUpdate(payload._id,req.body,{runValidators:true});
    res.send("update success!")
} catch (err) {
    res.status(404).send("ERROR: " + err.message);
}
})

authroute.delete("/delete",userauth,async(req,res)=>{
try {
    const payload=jwt.verify(req.cookies.token,process.env.SERVER_KEY);
    console.log(payload);
    
    await User.findByIdAndDelete(payload._id);
    res.clearCookie("token");
} catch (error) {
    res.status(404).send("ERROR: "+ err.massage);
}
})

module.exports=authroute;