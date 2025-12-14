const express=require ('express');
const app=express();
const port=1000;

const book = [
{ id: 1, name: "harry porte", outher: "Moscko" },
{ id: 2, name: "rich dad poor dad", outher: "Adam smith" },
{ id: 3, name: "Alchemist", outher: "Alcho mistty" },
{ id: 4, name: "Interstailer", outher: "Moscko" },
];


app.use(express.json())
//here we are fetching the quere to data 
app.get("/book",(req,res)=>{
    console.log(req.query);
    const book1=book.filter(info=>info.outher===req.query.outher);
    res.send(book1);
});

//changing and updation is occur

app.patch("/book",(req,res)=>{
    res.send("patch update");
    const i=parseInt(req.body.id)
    const change=book.find(info=>info.id===i);
    if(req.body.outher)
    change.outher=req.body.outher;
    if(req.body.name)
    change.name=req.body.name;
    console.log(req.body);
    
});
//you are update the book name outher name same thing do with the help of (app.get)
//let's see
app.put("/change",(req,res)=>{
    const i=parseInt(req.body.id)
    const change=book.find(info=>info.id===i);
    change.outher=req.body.outher;
    change.name=req.body.name;
    res.send("change successfully");
    res.send(book)
});
//now apply delete oporation 

app.delete("/book/:id",(req,res)=>{
    const i=parseInt(req.params.id)
    const del=book.findIndex(info=>info.id===i);
    book.splice(del,1)
    res.send("delete succesfull")
});

app.listen(port,()=>{
    console.log(`this wed run at ${port}`);
});
