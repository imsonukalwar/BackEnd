const express=require('express');
const apirouter=express.Router();
const app=express();
app.use(express.json());
const cookieparser=require('cookie-parser');
app.use(cookieparser())
const userOuth=require("../middleware/middle.js")
const User=require("../model/models.js")
const jwt = require('jsonwebtoken');
require('dotenv').config();


apirouter.get("/userinfo",userOuth,async(req,res)=>{
    try {
        console.log(userOuth);
    const ans=await User.findOne();
    res.send(ans);
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

apirouter.put("/update",userOuth,async(req,res)=>{

    try {
    const payload=jwt.verify(req.cookies.token,process.env.SERVER_KEY);
    await User.findByIdAndUpdate(payload._id,req.body,{runValidators:true});
    res.send("update success!")
} catch (err) {
    res.status(404).send("ERROR: " + err.message);
}
})

apirouter.delete("/delete",userOuth,async(req,res)=>{
try {
    const payload=jwt.verify(req.cookies.token,process.env.SERVER_KEY);
    console.log(payload);
    
    await User.findByIdAndDelete(payload._id);
    res.clearCookie("token");
} catch (error) {
    res.status(404).send("ERROR: "+ err.massage);
}
})

module.exports=apirouter;