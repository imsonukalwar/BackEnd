const jwt=require('jsonwebtoken');
const User = require("../model/models.js");
const radisclient=require("../config/radis.js")

const userOuth=async(req,res,next)=>{
try {
    const token=req.cookies.token;
    
if(!token){
    throw new Error("token is expire !");
}

const payload=jwt.verify(token,process.env.SERVER_KEY);
const ans=await User.findById(payload._id);
if(!ans){
    throw new Error("user is not exist !")
}

const isbloked=await radisclient.exists(`token:${token}`);
console.log(isbloked);
if(isbloked)
    throw new Error("invalied token")


req.ans=ans;
next();
} catch (err) {
    res.status(404).send("ERROR: " + err.message);
}
}
module.exports=userOuth;

