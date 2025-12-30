const mongoose=require('mongoose');

//write connection function

async function main() {
    await mongoose.connect("mongodb://localhost:27017/github");
    console.log("DB cinnnected !");
    
}
module.exports=main;