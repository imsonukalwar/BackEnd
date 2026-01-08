const express=require('express')
const app=express();
app.use(express.json())
const jwt =require('jsonwebtoken')
const cookieparser=require('cookie-parser')
app.use(cookieparser());
const user=require("../models/model.js")
const radisclient=require("../config/radis.js")


const userOuth=async(req,res,next)=>{
    try {
        
        const token=req.cookies.token;
        if(!token){
        throw new Error("token is expire");
        }
        const payload=await jwt.verify(token,process.env.SERVER_KEY);
        const id=payload._id;
        const ans=await user.findById(id);
        if(!ans){
        throw new Error("user is not exist in your DB")
        }
        
        const isbloked=await radisclient.exists(`token:${token}`);
        console.log(isbloked);
        //If token is found in Redis, it is invalid
        if(isbloked)
        throw new Error("invalied token")
        
        res.ans=ans;
        next();
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
}


module.exports=userOuth;