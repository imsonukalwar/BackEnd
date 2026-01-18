const radis=require('redis');
const radisClient=require("../config/radis.js")

const ratelimiter=async(req,res,next)=>{
    try {
        const ip=req.ip;
        const number_of_req=await radisClient.incr(ip);
        if(number_of_req>60){
            throw new Error("request time limit exide !")
        }
        if(number_of_req==1){
            radisClient.expire(ip,3600);
        }
        next();
    } catch (err) {
        res.send("user is not exist in your DB")
    }
}

module.exports=ratelimiter;