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
        //we are validating user ,that user is write their information in valied format
        await validate(req.body);
        if(!validate){
            return res.status(404).send("ERROR: " + err.message);
        }
        //here we are encrypt the passwor in hash form ,to send in database
        req.body.password=await bcrypt.hash(req.body.password,10);
        await User.create(req.body);//user post (regiter )
        res.send("register succesfull !")
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

userroute.post("/login3",async (req,res)=>{
    try {
        // we are random puting user detailles in user1
        const user1=await User.findOne({email:req.body.email});
        //from this line we are checking DB email is equal to user input email
        //if both is same go to further line
        if(req.body.email!=user1.email){
            throw new Error ("invalied credential")
        }
        //same thing we are comare user input password is equal is DB password
        const iscomp=await bcrypt.compare(req.body.password,user1.password)
        if(!iscomp){
            throw new Error ("invalied credential")
        }
        //here we are creating new token 
        const token=jwt.sign({_id:user1._id,name:user1.name},process.env.SERVER_KEY,{expiresIn:1000})
        //“Server is saving the token inside the user’s browser as a cookie.”
        //“Server is sending a cookie named token to the browser, and its value is token.”
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
        const {token}=req.cookies;//destructing to find the value of token
        //this line decode the token, {because token was encrypted  with the help of hash}
                const payload=jwt.decode(token);
                //“Store a value in Redis where the key is token:<actualToken> and the value is the string "token".”
                await radisclient.set(`token:${token}`,"token");
        //this line state i will expire the token after at the fixed time
        // await radisclient.expire(`token:${token}`,1000)
        //“Redis ko bolo ki token:<token> wali key ko payload.exp ke time par automatically delete kar dena.”
        await radisclient.expireAt(`token:${token}`,payload.exp)//this line expire token from cretion time to expires time
        //“Browser me jo token naam ki cookie hai, usse abhi ke abhi expire kar do (delete kar do).”
        res.cookie("token",null,{expires:new Date(Date.now())});
        res.send("logout sucsess !!")
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

module.exports=userroute;