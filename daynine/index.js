const express = require("express");
const {md}=require("./middleware/midl.js");
const app = express();
const port = 2026;

const foodItem = [
{ id: 1, menue: "pizza", prise: 450, catogari: "non-veg" },
{ id: 2, menue: "chicken", prise: 350, catogari: "non-veg" },
{ id: 3, menue: "burger", prise: 150, catogari: "veg" },
{ id: 4, menue: "momo", prise: 80, catogari: "non-veg" },
{ id: 5, menue: "paneet chilli", prise: 550, catogari: "veg" },
{ id: 6, menue: "choumin", prise: 150, catogari: "non-veg" },
{ id: 7, menue: "pasta", prise: 450, catogari: "veg" },
{ id: 8, menue: "masroom", prise: 650, catogari: "veg" },
{ id: 9, menue: "chickeb curry", prise: 750, catogari: "non-veg" },
{ id: 10, menue: "butter nan", prise: 50, catogari: "veg" },
{ id: 11, menue: "plane nan", prise: 45, catogari: "veg" },
{ id: 12, menue: "roti", prise: 25, catogari: "veg" },
{ id: 13, menue: "chorma", prise: 350, catogari: "non-veg" },
{ id: 14, menue: "mutton", prise: 850, catogari: "non-veg" },
{ id: 15, menue: "mutton kabab", prise: 950, catogari: "non-veg" },
{ id: 16, menue: "masala dosa", prise: 70, catogari: "veg" },
];

app.use(express.json());
const userCart = [];

//authenticate admin here so no need to write in everywhere
// // REMOVE=>>>if(!access){
//         res.status(403).send("not permission");
//     }else{ >>><<<<<these line from all place
// app.use("/admin",(req,res,next)=>{
//     const tocken = "ASDF";
//     const access = "ASDF" === tocken ? 1 : 0;
//     if(access){
//     next();
//     }else{
//         res.status(403).send("not permission");
//     }
// });

app.use("/admin",md);

app.get("/food", (req, res) => {
res.status(201).send(foodItem);
});

app.post("/admin", (req, res) => {
  //add food item into the menue
  //here outhentication is occur to conform that is admin or not
  //aoutentication =>verification ,aouthorization=>what power you have
    foodItem.push(req.body);
    res.status(201).send("post successfully");
});

app.delete("/admine/:id", (req, res) => {
    const ID = parseInt(req.params.id);
    const del = foodItem.find((info) => info.id === ID);
    if (!ID) {
    res.send("intem not exixst in menue");
    } else {
    foodItem.splice(del, 1);
    res.send("delete successfull");}
});

app.put("/admin",(req,res)=>{
    const ID = parseInt(req.body.id);
    const del = foodItem.find((info) => info.id === ID);
    if(del){
        del.menue=req.body.menue;
        del.prise=req.body.prise;
    }
    res.send("update succesfully")
});

app.listen(port, () => {
console.log(`your website run at port no.${port}`);
});
