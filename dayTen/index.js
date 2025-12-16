const express=require("express");
const app=express();
const port=4050;
app.get("/user",(req,res)=>{
    res.send("this is get info !")
});

app.get("/dummy",(req,res)=>{
        // JSON.parse('"jeson":" data"');//do you know why it's give error because of wrong json format 
        //if you want to access then write right json format
    // res.send('{"get access VALID JSON"}');
    // throw new Error('DENIE !');
    // res.send("hello coder")}
    // catch(err){
    //     res.send("Acess Denie !"+err)}
    // throw new Error('ACCES DENIE !')
    // res.send("print this line");//this line will never be print first resolve the error than execute the responce
    try{
        throw new Error('ACCES DENIE !')
    res.send("print this line");
    }catch(err){
        res.send("your "+err);
    }
});

app.listen(port,()=>{
    console.log(`your web run at port n,=${port}`);
})