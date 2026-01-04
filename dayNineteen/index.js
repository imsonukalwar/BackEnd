const express=require('express')
const app=express();
const port=999;
const bcrypt=require('bcrypt')

const jwt=require('jsonwebtoken');
const cookieparser=require('cookie-parser');
app.use(cookieparser());

app.use(express.json());

const main=require("./database.js")
const User=require("./models/model.js")
const validates=require("./util/validate.js")
const userauth=require("./middleware/middle.js")

app.get("/userinfo",userauth,async(req,res)=>{
    try {
    const ans=await User.find();
    res.send(ans);
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})


app.post("/register",async(req,res)=>{
    try {
        validates(req.body);
        if(!validates(req.body)){
            throw new Error("validation field");
        }
        req.body.password=await bcrypt.hash(req.body.password,10);
        await User.create(req.body);
        res.send("post seccesfull !")
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
});


app.post("/login",async(req,res)=>{
    try {
        const user1=await User.findOne({email:req.body.email})
        
        if(user1.email != req.body.email){
            throw new Error("invalid credential");
        }
        const iscomp=await bcrypt.compare(req.body.password,user1.password)
        if(!iscomp){
            throw new Error("invalied credential");
        }
        const token=jwt.sign({emial:user1.email,_id:user1._id},"sonu@abc",{expiresIn:100})
        res.cookie("token",token);
        res.send("login sucses !!");
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})


app.put("/update",userauth,async(req,res)=>{

    try {
    const payload=jwt.verify(req.cookies.token,"amol@abc");
    await User.findByIdAndUpdate(payload._id,req.body,{runValidators:true});
    res.send("update success!")
} catch (err) {
    res.status(404).send("ERROR: " + err.message);
}
})


app.delete("/delete",userauth,async(req,res)=>{
try {
    const payload=jwt.verify(req.cookies.token,"amol@abc");
    await User.findByIdAndDelete(payload._id);
    res.clearCookie("token");
    res.send("delete succesfull")
} catch (error) {
    res.status(404).send("ERROR: "+ err.massage);
}
})

app.post("/logout",async(req,res)=>{
    try {
       // res.cookie("token","vanvjdfnjdkab");
        res.cookie("token",null,{expires:new Date(Date.now())})
        res.send("logOut secsess !")
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

main()
.then(()=>{
    app.listen(port,()=>{
        console.log(`lesten at port n: ${port}`);
    })
})
.catch((err)=>{
    res.status(404).send("ERROR: " + err.message);
})