const express=require("express");
const app=express();
const port=1111;
app.get("/user",(req,res)=>{
    res.send("hello code ")
});
app.listen(port,()=>{
    console.log(`i'm listen at no.=${port}`);
});