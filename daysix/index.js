const express = require("express");

const app = express();

app.use("/about", (req, res) => {
res.send({
    name: "sonu",
    age: 23,
    branch: "b-tech",
    section: "section-c",
    collage: "giet",});
});

app.use("/contact", (req, res) => {
    res.send({ contact: "bettiah", d: "west champaran", state: "bihar" });
});

app.use("/detalled", (req, res) => {
    res.send("i am your detalled page");
});

app.use("/en+d", (req, res) => {
    res.send("page is end");
});

app.listen(3000, () => {
    console.log("run at port no 3000");
});
