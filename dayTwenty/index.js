const express=require('express')
const app =express();
require('dotenv').config();
const port=process.env.PORT;
app.use(express.json())
const main =require("./database");

const cookieparser=require('cookie-parser');
app.use(cookieparser());


const apirouter=require("./routes/route.js")
const userroute=require("./routes/user.js")
app.use("/",userroute)
app.use("/",apirouter)
const radisclient=require("./config/radis.js")


const initialize=async()=>{
    try {
        // await radisclient.connect();
        // console.log("Connected to radis!");

        // await main();
        // console.log("connected to DB! ");

        await Promise.all([radisclient.connect(),main()])

        app.listen(port,()=>{
    console.log(`you are listen at port : ${port}`);
})

    } catch (err) {
        console.log("ERROR: " + err.message);
    }
}


initialize();



// main()
// .then(async()=>{
// app.listen(port,()=>{
//     console.log(`you are listen at port : ${port}`);
// })
// })
// .catch(()=>{
//     try {
        
//     } catch (err) {
//         res.status(404).send("ERROR: " + err.message);
//     }
// })