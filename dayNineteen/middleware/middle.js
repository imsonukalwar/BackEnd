const jwt=require('jsonwebtoken');
const User = require('../models/model');

const userauth=async(req,res,next)=>{
    try {
        const {token}=req.cookies;
        if(!token){
            throw new Error("token is mmimssing")
        }
        const payload=jwt.verify(token,"sonu@abc");
        const _id=payload._id;
        if(!_id){
            throw new Error("id is not in token")
        }
        const ans=await User.findById(_id);
        if(!ans){
            throw new Error("user not exixst");
        }
        req.ans=ans;
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
}

module.exports=userauth