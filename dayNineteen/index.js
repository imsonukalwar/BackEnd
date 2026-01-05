const express=require('express')
const app=express();
const port=999;
app.use(express.json());
const main=require("./database.js")
const cookieparser=require('cookie-parser');
app.use(cookieparser());

require('dotenv').config();

const userrouter=require("./routes/user.js")
const authroute=require("./routes/route.js")
app.use("/",authroute);
app.use("/",userrouter);


main()
.then(()=>{
    app.listen(port,()=>{
        console.log(`lesten at port n: ${port}`);
    })
})
.catch((err)=>{
    res.status(404).send("ERROR: " + err.message);
})