const mongoose=require('mongoose');
const {Schema}=mongoose;

const userSchema=new Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:20,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true,
        mutable:true,
    },
    password:{
        type:String,
        require:true
    }
},{Timestamp:true})

const User=new mongoose.model("user",userSchema);
module.exports=User;