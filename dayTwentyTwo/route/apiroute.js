const express=require('express');
const app=express();
app.use(express.json())
const apiroute=express.Router()

const userOuth=require("../middleware/middle.js");
const user = require('../models/model.js');
const jwt=require('jsonwebtoken');


apiroute.get("/userinfo",userOuth,async(req,res)=>{
    try {
        console.log(userOuth);
        const ans=await user.findOne();
        res.send(ans);
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

apiroute.put("/update",userOuth,async(req,res)=>{
    try {
        const payload=await jwt.verify(req.cookies.token,process.env.SERVER_KEY);
        await user.findByIdAndUpdate(payload._id,req.body,{runValidators:true});
        res.send("upddate SUCSESS !")
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

apiroute.delete("/delete",userOuth,async(req,res)=>{
    try {
        const token=req.cookie.token;
        const payload=await jwt.verify(token,process.env.SERVER_KEY);
        await user.findByIdAndDelete(payload._id);
        res.clearCookie("token",token);
        res.send("delete SUCSESS !");
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

module.exports=apiroute;