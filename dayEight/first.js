const express=require("express");
const app=express();
const port=1050;

//all are app.use(Rout,RH,[RH,RH],RH){Rh=>rout handler}
app.get("/user",[(req,res,next)=>{
    next();
    res.send("this is my fist response");
    // res.send("this is my second responce");//when you want to send two respoce it never print second sespoce,at a time you will send only one responce 
    //because of TCP connection 
    
},(req,res,next)=>{
    next();
    res.send("this is my second responce");
    
},
//above in this function you can't send multiple responce if you want to run second responce you must cumment out first responce
//And also you hsve to send parameter in first in (next) and call this next in your first function body
//like this method you can run multiple method using next parameter
//this is called rout handler
(req,res)=>{
    res.send("this is my third responce");
    
}],
(req,res,next)=>{
    next();
    res.send("this is my fourth responce");
    
});

// app.get("/user",(req,res)=>{
//     res.send("get info")
// });
app.use("/user",(req,res,next)=>{
    console.log(`${Date.now()} ${req.method} ${req.url}`);
    // it can do all type of outhorizatiom
    next();
})
app.post("/user",(req,res)=>{
    // console.log(`${Date.now()} ${req.method} ${req.url}`);
    res.send("post info")
});
app.delete("/user",(req,res)=>{
    // console.log(`${Date.now()} ${req.method} ${req.url}`);
    res.send("delete info")
});

app.listen(port,()=>{
    console.log(`your wed telecast on port n. ${port}`);
    
});
// these all are rought handler as your comfortability you can store inside the array or not
//Midlware which is between the excution code/respoce fisrt is middleware 
//mw=>mw=>mw=>request handler or mw=>request handler it's any form as you want