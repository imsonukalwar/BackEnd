const express=require('express');
const cors = require("cors");
const main=require("./aichat.js");

const app=express();
const port=1122;
app.use(
  cors({
    origin: "http://127.0.0.1:5500/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
app.use(express.json());

const chattingHistory={};
//we will install our user chat history here 
//key:value pair
//key :id;
// value:array
app.post("/chat",async(req,res)=>{
    try {
        const {id,msg}=req.body;
        if(!chattingHistory[id]){
            chattingHistory[id]=[];
        }
        //extract user history
        const history=chattingHistory[id];
        //aray of history
        //history+current :array
        const promptMassage=[...history,{
            role:'user',
            parts:[{text:msg}]
        }]
        const ans=await main(promptMassage);
        history.push({ role: 'user', parts: [{ text: msg }] });
        history.push({ role: 'model', parts: [{ text: ans }] });
        res.send({ reply: ans });
    } catch (err) {
        res.status(500).send("ERROR: " + err.message);
    }
})
app.listen(port,()=>{
    console.log("listen at port:"+port);
    
})