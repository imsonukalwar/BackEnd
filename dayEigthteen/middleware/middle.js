
const jwt=require('jsonwebtoken');
const User = require('../model/model');


const Userauth=async(req,res,next)=>{
    try {
        const {token}=req.cookies;
        // console.log(token);
        
    if(!token){
        throw new Error("token is expire");
    }
    const payload=jwt.verify(token,"sonu@123");
    const _id=payload._id;
    console.log(_id);
    if(!_id){
        throw new Error("id is missing!")
    }
    
    const result=User.findById(_id);
    console.log(result);
    
    if(!result){
        throw new Error("User not exist");
    }
    res.result=result;
    console.log("User is Authenticate");
    next();
    } catch (err) {
        res.status(404).send("ERROR: "+ err.massage)
    }
    
}
module.exports=Userauth;


//yaha pe 3 chije ho rahi hai
// (1)>> sabse pahle ye pata karna ki aapka token expire to nahi hua hai
//(2)>> agar token expire nahi hua hai to uss token ko varify karenge ki wo token user ka hi hai ya kissi aur ka
//(3)>>last me ye check karenge ki jise ham dhund rahe hai wo user hai aapke DB me hai bhi ya nahi