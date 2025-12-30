const express=require('express');
const bcrypt=require('bcrypt');
const app=express();
const port=133;

const jwt=require('jsonwebtoken');
// const token=jwt.sign({_id:req.body._id,email:req.body.email},"sonu@123");
//here payload>>>{_id:req.body._id,email:req.body.email} server key>>>>"sonu@123"

const cookieparser=require('cookie-parser');
app.use(cookieparser());

const main=require("./database.js");
const User=require("./models/model.js");
const validate=require("./util/validation.js")

app.use(express.json());

//find perticular person
app.get("/user",async(req,res)=>{
    try {
        const payload=await jwt.verify(req.cookies.token,"sonu@123")
        const result=await User.findById(payload._id);
        console.log(result);
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

app.get("/get",async(req,res)=>{
    try{
        validate(req.body);
        const ans=await User.find();
        // console.log(req.cookies);
        //let first you verify you give the token that user is real or not 
        //let's verify the userthen give the tocken
        const payload=jwt.verify(req.cookies.token,"sonu@123")//this line return payload
        console.log(payload);//this line generate   iat: 1767071187>>>means aapka token kiss samay generate hua hai
        res.send(ans)
    }catch(err){
        res.status(404).send("ERROR: " + err.message);
    }
});

app.post("/post",async(req,res)=>{
    try {
        if(!validate(req.body)){
            return res.status(400).send("Invalid data");//yaha return iss lia likha q agar mera data invalid hota to wohi se 
            //back ho jata agar return nahi likhu to invallid data rahega aur aage kacide bhi run ho jayega jo ham kabhi nahi chahenge

        }
        req.body.password=await bcrypt.hash(req.body.password,10)
        await User.create(req.body)
        res.send("post succesfull !");
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

app.put("/update",async (req,res)=>{
    try {
        const {_id,...update}=req.body;
        await User.findByIdAndUpdate(_id,update,{runValidators:true});
        res.send("update succesful !!")
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

app.post("/login",async (req,res)=>{
    try {
        const user1=await User.findOne({email:req.body.email});
        if(user1.email !== req.body.email){
            throw new Error("invalid credential");
        }
        const possible=await bcrypt.compare(req.body.password,user1.password);
        if(!possible){
        throw new Error("invalid credential");
        }
        const token=jwt.sign({_id:user1._id,email:user1.email},"sonu@123",{expiresIn:10})//here we are pass payload,server:key,token expiry date
        //if you not write this >>{expiresIn:10} your token will not be expire
        res.cookie("token", token);
        res.send("login success !!")
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

app.delete("/delete/:id",async (req,res)=>{
    try {
        await User.findByIdAndDelete(req.body.id);
        res.send("delete succesful !!")
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

main()
.then(async()=>{
    console.log("connected to db !");
    app.listen(port,()=>{
        console.log("your web listen at n.",port);
    })
}).catch((err)=>{
    res.status(404).send("ERROR: " + err.message);
})
