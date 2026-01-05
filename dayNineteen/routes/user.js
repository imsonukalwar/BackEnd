const express=require('express');
const app=express();
const userrouter=express.Router();
const bcrypt=require('bcrypt');
const User=require("../models/model.js");
const validates=require("../util/validate.js")
const jwt=require('jsonwebtoken');
const cookieparser=require('cookie-parser');
app.use(cookieparser());
app.use(express.json());
require('dotenv').config();


userrouter.post("/register",async(req,res)=>{
    try {
        validates(req.body);
        if(!validates(req.body)){
            throw new Error("validation field");
        }
        req.body.password=await bcrypt.hash(req.body.password,10);
        await User.create(req.body);
        res.send("post seccesfull !")
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
});


userrouter.post("/login",async(req,res)=>{
    try {
        const user1=await User.findOne({email:req.body.email})
        
        if(user1.email != req.body.email){
            throw new Error("invalid credential");
        }
        const iscomp=await bcrypt.compare(req.body.password,user1.password)
        if(!iscomp){
            throw new Error("invalied credential");
        }
        const token=jwt.sign({emial:user1.email,_id:user1._id},process.env.SERVER_KEY,{expiresIn:1000})
        res.cookie("token",token);
        res.send("login sucses !!");
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})


userrouter.post("/logout",async(req,res)=>{
    try {
       // res.cookie("token","vanvjdfnjdkab");
        res.cookie("token",null,{expires:new Date(Date.now())})
        res.send("logOut secsess !")
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

module.exports=userrouter;