const jwt=require('jsonwebtoken');
const User = require("../model/models.js");
const radisclient=require("../config/radis.js")

// Authentication middleware
const userOuth=async(req,res,next)=>{
try {
    const token=req.cookies.token;
    
if(!token){
    throw new Error("token is expire !");
}
// // Verify the token using secret key
const payload=jwt.verify(token,process.env.SERVER_KEY);
// Find user in database using ID from token
const ans=await User.findById(payload._id);
if(!ans){
    throw new Error("user is not exist !")
}
 // Check if token is blocked (blacklisted) in Redis
const isbloked=await radisclient.exists(`token:${token}`);
console.log(isbloked);
// If token is found in Redis, it is invalid
if(isbloked)
    throw new Error("invalied token")

// Attach user data to request object
req.ans=ans;
next();
} catch (err) {
    res.status(404).send("ERROR: " + err.message);
}
}
module.exports=userOuth;

