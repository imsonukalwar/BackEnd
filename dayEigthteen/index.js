const express=require('express');
const app=express();
app.use(express.json());
require('dotenv').config();
const port =process.env.PORT;
const main = require("./database.js");
const validate = require("./util/validation.js");

const jwt=require('jsonwebtoken');
const cookieparser=require('cookie-parser');
app.use(cookieparser());
const User = require("./model/model.js");



const aouthrout=require("./routes/rout1.js")
app.use("/",aouthrout);
const userrouter=require("./routes/users.js");
app.use("/",userrouter)



app.get("/get",async(req,res)=>{
    try {
        const ans=await User.find();
        console.log(User.cookie);
        res.send(ans)

    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})


main()
.then(async()=>{
    app.listen(port,()=>{
        console.log(`you are listen at port: ${port}`);
    })
})
.catch((err)=>{
    res.status(404).send("ERROR: " + err.message);
})