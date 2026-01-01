const Router = require('node-router');
const Userauth=require("../middleware/middle.js")
const express=require('express');
const aouthrout=express.Router();
const bcrypt=require('bcrypt');
const User = require("../model/model.js");



aouthrout.post("/login2",async(req,res)=>{
    try {
        const user1=await User.findOne({email:req.body.email})

        
        if (!user1) {
            throw new Error("User not found / Invalid email");
        }
        if(req.body.email!==user1.email){
            throw new Error("invalid credential");
        }
       // const ispas=await bcrypt.compare(req.body.password,user1.password) isko bhi model me method banakar saparete karenge
    
        const ispas=await user1.verifypassword(req.body.password);
        console.log(ispas);
        
        if(!ispas){
            throw new Error("invalied credential");
        }

        //const token =jwt.sign({_id:user1._id,email:user1.email},"sonu@123",{expiresIn:1000})//isee ek function me wrap karenge 
        //jiska method midel me create kiya gya hai

        const token=user1.getjwt();

        res.cookie("token",token);
        res.send("login sucsess !")
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

aouthrout.post("/post",async(req,res)=>{
    try {
        validate(req.body);
        if(!validate(req.body)){
            throw new Error("some field is missing ")
        }
        req.body.password=await bcrypt.hash(req.body.password,10);
        await User.create(req.body);
        res.send("post sucsesfull !")
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

module.exports=aouthrout;