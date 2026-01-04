const mongoose=require('mongoose');

async function main() {
    await mongoose.connect("mongodb://localhost:27017/login_logout");
    console.log("DB is connedcted !");
    
}

module.exports=main;