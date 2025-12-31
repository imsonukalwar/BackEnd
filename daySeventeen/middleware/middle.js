

const jwt=require('jsonwebtoken');
const cookieparser=require('cookie-parser');
const User = require('../models/nodel');

const  userauth=async(req,res,next)=>{
    try {
        const {token}=req.cookies;
    if(!token){
        throw new Error("token is't availavble");
    }
    const payload=jwt.verify(token,"amol@abc");
    const {_id}=payload;
    if(!_id){
        throw new Error("id is missing")
    }
    const result= await User.findById(_id)
    if(!result){
        throw new Error("user dio't exixt");
    }
    req.result=result;//we are combine req to result
    next();
    } catch (err) {
        res.status(404).send("ERROR "+ err.massage);
    }

}
module.exports=userauth;