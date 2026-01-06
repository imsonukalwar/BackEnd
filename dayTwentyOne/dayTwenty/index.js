const express=require('express')
const app =express();
require('dotenv').config();
const port=process.env.PORT;
app.use(express.json())
const main =require("./database");

const cookieparser=require('cookie-parser');
app.use(cookieparser());

const ratelimeter=require("./middleware/ratelimiter.js")

app.use(ratelimeter);

//for clean and clear code we are using express route
const apirouter=require("./routes/route.js")
const userroute=require("./routes/user.js")
app.use("/",userroute)
app.use("/",apirouter)

//from this line we are put the token for short limit of time
const radisclient=require("./config/radis.js")


const initialize=async()=>{
    try {
        //from this two line not sure that our db is not run with togather

        // await radisclient.connect();
        // console.log("Connected to radis!");
        // await main();
        // console.log("connected to DB! ");
        /*
        Connect to Redis and Database in parallel
        Promise.all ensures both connections complete before server starts
        */
        await Promise.all([radisclient.connect(),main()])

        app.listen(port,()=>{
    console.log(`you are listen at port : ${port}`);
})

    } catch (err) {
        console.log("ERROR: " + err.message);
    }
}

//calling
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