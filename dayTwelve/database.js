// const mongoose=require('mongoose');
// // const {Schema}=mongoose;
// async function main() {
//     await mongoose.connect("mongodb://localhost:27017/Bording");
//     // const userSchema=new Schema({
//     //     name:String,
//     //     age:Number,
//     //     Gender:String,
//     //     city:String,
//     //     House_n:Number
//     // });
//     //=============create your model===means create your collection(crete your table)
//     //=============Actually we are creting a class
//     // const user=mongoose.model("user",userSchema);
// //================here we are create object and ducument
// // const user1=new user({name:"sonu kalwar",age:23,Gender:"male",city:"bengluru",House_n:234})
// // await user1.save();
// // //================this line do work above of two lines (you can write upper two lines or this single line)
// // await user.create({name:"mohan shingh",age:24,city:"hydrabad",House_n:455});
// // //another form to write this
// // await user.insertMany([{name:"nitish",age:24,city:"odisha",House_n:434}]);
// // //===============FIND DOCUMENT BY PARTICULAR FIELD===================
// // const ans= await user.find({name:"sonu"});
// // console.log(ans);

// }
// module.exports=main;



const mongoose = require("mongoose");

async function main() {
await mongoose.connect("mongodb://localhost:27017/Bording");
console.log("MongoDB Connected");
}

module.exports = main;
