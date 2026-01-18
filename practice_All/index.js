const express=require('express')
const app=express();
app.use(express.json());
require('dotenv').config();
const port=process.env.PORT;
app.use(express.json());

const main=require("./database")
// const user=require("./models/model.js");
const cookieparser=require('cookie-parser')
app.use(cookieparser());//this line is important to take action by middleware


const radisClient=require("./config/radis.js");

const ratelimiter=require("./middleware/ratelimiter.js")
app.use(ratelimiter);

const userroute=require("./route/user.js");
app.use("/",userroute);
const apiroute=require("./route/apiroute.js")
app.use("/",apiroute);


const initialize=async()=>{
    try {
        await Promise.all([radisClient.connect(),main()])
        console.log("DB is connect!");
        app.listen(port,(req,res)=>{
        console.log("listening at port:"+port);
    })
    } catch (err) {
        console.log("ERROR: " + err.message);
    }
}
initialize();

// main()
// .then(async()=>{
//     console.log("connected to DB !");
//     app.listen(port,(req,res)=>{
//         console.log("listening at port:"+port);
//     })
// })
// .catch((err)=>{
//     console.log("ERROR: " + err.message);
// })
