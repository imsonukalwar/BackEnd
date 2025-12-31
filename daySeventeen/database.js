const mongoose =require('mongoose');

async function main() {
    await mongoose.connect("mongodb://localhost:27017/login");
    console.log("Db is connected!");
}

module.exports=main