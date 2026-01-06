const mongoose=require('mongoose');
const {Schema}=mongoose;

const user=new Schema({
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
},{timestamps:true})

const User=mongoose.model("user",user);

module.exports=User;
