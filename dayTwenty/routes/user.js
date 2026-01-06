const express=require('express');
const app=express();
const userroute=express.Router();

const validate=require("../util/validate.js")
const User=require("../model/models.js")
const bcrypt=require('bcrypt');
const cookieparser=require('cookie-parser');
app.use(cookieparser());
const jwt = require('jsonwebtoken');

app.use(cookieparser());
app.use(express.json());
require('dotenv').config();

const radisclient=require("../config/radis.js")
const userOuth=require("../middleware/middle.js")



userroute.post("/register",async(req,res)=>{
    try {
        await validate(req.body);
        if(!validate){
            return res.status(404).send("ERROR: " + err.message);
        }
        req.body.password=await bcrypt.hash(req.body.password,10);
        await User.create(req.body);
        res.send("register succesfull !")
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

userroute.post("/login3",async (req,res)=>{
    try {
        const user1=await User.findOne({email:req.body.email});
        if(req.body.email!=user1.email){
            throw new Error ("invalied credential")
        }
        const iscomp=await bcrypt.compare(req.body.password,user1.password)
        if(!iscomp){
            throw new Error ("invalied credential")
        }
        const token=jwt.sign({_id:user1._id,name:user1.name},process.env.SERVER_KEY,{expiresIn:1000})
        res.cookie("token", token);
        res.send("login sucsesfull !")
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
});


//yaha ham redis me token ko rakhenge

userroute.post("/logout3",userOuth,async(req,res)=>{
    try {
        // here we are insert token inside the radis database
        const {token}=req.cookies;
                const payload=jwt.decode(token);
        await radisclient.set(`token:${token}`,"token");
        // await radisclient.expire(`token:${token}`,1000)//this line state i will expire the token after at the fixed time
        await radisclient.expireAt(`token:${token}`,payload.exp)//this line expire token from cretion time to expires time
        res.cookie("token",null,{expires:new Date(Date.now())});
        res.send("logout sucsess !!")
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

module.exports=userroute;