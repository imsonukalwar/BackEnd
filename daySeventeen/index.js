const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const port = 990;
app.use(express.json());

const main = require("./database.js");
const User = require("./models/nodel.js");
const validate = require("./util/validation.js");
const userauth=require("./middleware/middle.js")

const jwt=require('jsonwebtoken');
const cookieparser=require('cookie-parser');
app.use(cookieparser());


app.get("/User", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
    console.log(User.cookie);
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});


app.get("/uinfo",userauth,async(req,res)=>{
  try {
    const payload=jwt.verify(req.cookies.token,"amol@abc")//verify in other way
    // const {token}=req.cookies;
    // if(!token){
    //   throw new Error("token dos't exist");
    // }
    // const payload=jwt.verify(token,"amol@abc");
    // const {_id}=payload;
    // if(!_id){
    //   throw new Error("id is missing !")
    // }
    // const result=await User.findById(_id)
    // if(!result){
    //   throw new Error("user not exist");
    // }
    res.send(req.result);//we are combine req to result
    //ye comment line bar bar use hai so mai iska middleware bana raha hu
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
})


app.post("/post", async (req, res) => {
try {
    validate(req.body);
    if (!validate(req.body)) {
    return res.status(400).send("Invalid data");
    }
      req.body.password = await bcrypt.hash(req.body.password, 10);
    await User.create(req.body);
    res.send("post succesful !");
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
})


app.post("/login",async(req,res)=>{
  try {
    const user1=await User.findOne({email:req.body.email})
    if(req.body.email!==user1.email){
      throw new Error("invalid credential");
    }
    const ispass=await bcrypt.compare(req.body.password,user1.password)
    if(!ispass){
      throw new Error("invalid credential");
    }
    const token=jwt.sign({_id:user1._id,name:user1.name},"amol@abc",{expiresIn:100})
    res.cookie("token",token);
    res.send("loglin success !")
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


main()
  .then(() => {
    app.listen(port, (req, res) => {
      try {
        console.log(`you are listen at post: ${port}`);
      } catch (err) {
        res.status(404).send("ERROR: " + err.message);
      }
    });
  })
  .catch();
