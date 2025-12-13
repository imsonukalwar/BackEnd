const express = require("express");
const app = express();
const port = 2000;

const bookStore = [
{ id: 1, name: "harry porte", outher: "Mecky sinha" },
{ id: 2, name: "rich dad poor dad", outher: "Adam smith" },
{ id: 3, name: "Alchemist", outher: "Alcho mistty" },
{ id: 4, name: "Interstailer", outher: "Moscko" },
];

app.use(express.json());
//hre if you use app.use =(get method ,post method ,put method ,fatch method ,delete method     )
app.get("/BookStore", (req, res) => {
res.send(bookStore);
});

app.post("/BookStore", (req, res) => {
bookStore.push(req.body);
console.log(req.body);
res.send("post succesfully !node");
});

app.get("/BookStore/:id", (req, res) => {
const id = parseInt(req.params.id);
const findBook = bookStore.find((info) => info.id === id);
if (!findBook)
    {
    res.status(404).send("You entered an invalid ID");
}
else
    {
    res.send(findBook);
}
});

// app.get('/user',(req ,res) => {
//     res.send("this is userr HOME PAGE");
// });
// app.post("/user",(req,res)=>{
//     console.log(typeof req.body.age);//this line state age value farm it is numbber or string
//     res.send("your data save sucsessfully");
// });
app.listen(port, () => {
  console.log(`Our website host at HTTPS//localhost:${port}`);
});

//app.use match root if /about loolk he not want to look ahead tha's why it is send all data in a one time
//here if you write (aap.get),(app.put),(app.fetch),(app.delete) this is match full root id tha's mean fater / he read till end what user want
