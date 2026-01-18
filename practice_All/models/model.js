const mongoose=require('mongoose')
const {Schema}=mongoose;

const User=new Schema({
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
},{timestamps :true})

const user=mongoose.model("user",User);

module.exports=user;
