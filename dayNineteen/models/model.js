const mongoose=require('mongoose');
const {Schema}=mongoose;

const user=new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        isLowercase:true,
        unique:true,
        trim:true,
        mutable:true,
    },
    password:{
        type:String,
        require:true,
    }
},{timestamps : true})

const User=mongoose.model("user",user);

module.exports=User;
