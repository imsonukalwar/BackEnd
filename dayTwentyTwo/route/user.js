const express=require('express');
const userroute=express.Router();
const  validate=require("../util/validation.js");
const user=require("../models/model.js");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const cookieparser=require('cookie-parser')
const app=express();
app.use(express.json());
app.use(cookieparser());

const userOuth=require("../middleware/middle.js")
const radisClient=require("../config/radis.js")

userroute.post("/register",async(req,res)=>{
    try {
        validate(req.body);
        req.body.password=await bcrypt.hash(req.body.password,10);
        await user.create(req.body);
        res.send("register succesfull !")
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

userroute.post("/loginR",async(req,res)=>{
    try {
        const user1=await user.findOne({email:req.body.email})
        if(!user1){
            throw new Error("user not exixt")
        }
        if(req.body.email!=user1.email){
            throw new Error("invalied credential")
        }
        const iscomp=await bcrypt.compare(req.body.password,user1.password);
        if(!iscomp){
            throw new Error("invalied credential")
        }
        const token=jwt.sign({_id:user1._id,email:user1.email},process.env.SERVER_KEY,{expiresIn:"1h"})
        res.cookie("token",token);
        res.send("login SUCSESS !")
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
    
})

userroute.post("/logout",userOuth,async(req,res)=>{
    try {
        const token=req.cookies.token;
        await radisClient.set("token:",token);
        const payload=jwt.decode(token);
        await radisClient.expireAt(token,payload.exp);
        res.cookie("token",null,{expires:new Date(Date.now())})
        res.send("logout SUCSESS !")
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})




module.exports=userroute
