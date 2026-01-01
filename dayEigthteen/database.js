const mongoose=require('mongoose');

async function main(){
    mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("DB is Connected");
}

module.exports=main