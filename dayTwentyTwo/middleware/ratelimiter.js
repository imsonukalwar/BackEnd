const radis=require('redis');
const radisClient=require("../config/radis.js")

//total time means 60 minute
const windowSize=3600;
const max_req=12;
const ratelimiter=async(req,res,next)=>{
    try {
        // const number_of_req=await radisClient.incr(ip);
        // if(number_of_req>60){
        //     throw new Error("request time limit exide !")
        // }
        // if(number_of_req==1){
        //     radisClient.expire(ip,3600);
        // }
        // next();
        const key=`IP:${req.ip}`;
        const current_time=Math.floor(Date.now()/1000);//1000 se divide isss lia q ki time mujhe milisecond me chahiye
        const windowTime=current_time-windowSize;//is line ka matlab {current_time} - {1 hour(windowSize)} 
        // isme mera wo time period nikal jayega jisse ham delete karna chahtey hai
        /*{
            thoda value lekar samajhtey hai 
            current_time=2:10 nim  AUR  windowSize=1 h, hai 
            2:10-1h==1:10min
            iska matlab starting time se lekar 1:10 min tak ke sare req ko delete kar do
        }*/
        await radisClient.zRemRangeByScore(key,0,windowTime);//matlab starting(0) se lekar windowTime tak ko hata do
        const num_of_req= await radisClient.zCard(key)//ye line batayega ki aapke pass num. of req kitni hai
        console.log(num_of_req);
        
        if(num_of_req>max_req){
            res.send("num. of req is excedes");
        }
        //ye line bache hua req ko radis me add karta hai
        await radisClient.zAdd(key,[{score:current_time,value:`${current_time}:${Math.random()}`}])
        //if(number_of_req==1) iss line ko iske under nahi likhenge q ki client apne last time pe sarri req bhej dega
        //isske collision hone ka dar rahta hai
        await radisClient.expire(key,windowSize)
        next();
    } catch (err) {
        res.send("user is not exist in your DB")
    }
}

module.exports=ratelimiter;