const express=require('express');
const bcrypt=require('bcrypt');
const app=express();
const port=1250;

const main=require("./database.js");
const user=require("./models/model.js");

// API validation
const validate=require("./util/api_validation.js")

app.use(express.json());


app.get("/user",async(req,res)=>{
    try{
        const ans=await user.find();
        res.send(ans);
    }catch(err){
        res.status(404).send("ERROR: " + err.message);
    }
})


app.get("/user/:id",async(req,res)=>{
    try{
        const ans=await user.findyId((req.params.id));
        res.send(ans);
    }catch(err){
        res.status(404).send("ERROR: " + err.message);
    }
})


app.delete("/delete/:id",async(req,res)=>{
    try{
        validate(req.body);

        await user.findByIdAndDelete((req.params.id))
        res.send("Deleted !")
    }catch(err){
        res.status(404).send("ERROR: " + err.message);
    }
})

app.post("/post",async(req,res)=>{
    try{
        if (!validate(req.body)) {
        return res.status(400).send("Invalid data");
}
req.body.password = await bcrypt.hash(req.body.password, 10);
await user.create(req.body);
        res.send("USer register succesfully !")
    }
    catch(err){
        res.status(404).send("ERROR: " + err.message);
    }
});


app.put("/update",async(req,res)=>{
//     {
//     "_id": "694ebf8315c8324d3a1c6b9d",
//     "age":19,
//     "email":"kavyarani@gamil.com"
// }
// req.body==({"_id": "694ebf8315c8324d3a1c6b9d","age":19,"email":"kavyarani@gamil.com"})
// but we need to saparete id and data that's why using or doing destructring===const{_id,...update}=req.body
    try{
        const{_id,...update}=req.body
        await user.findByIdAndUpdate(_id,update,{"runValidators":true});//{"runValidators":true} this is check validation before update
        res.send("Update successful !")
    }catch(err){
        res.status(404).send("ERROR: " + err.message);
    }
});

app.post("/login",async(req,res)=>{
    try{
        
        // const {password,email}=req.body;
        const user1=await user.findOne({email:req.body.email});
        if(!(req.body.email===user1.email))
            throw new console.Error("invalid credential");
            const isallow=await bcrypt.compare((req.body.password),(user1.password))
            if(!isallow)
                throw new Error("invalid cradential");
            res.send("login succesfully");
    }catch(err){
        res.status(404).send("ERROR: " + err.message);
    }
})



main()
.then(async()=>{
    console.log("connected to DB !");
    app.listen(port,(req,res)=>{
        console.log("listening at port no:"+port);
        
    })
})
.catch((err)=>{
    res.status(404).send("ERROR: " + err.message);
    
})
