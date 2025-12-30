const mongoose=require('mongoose');
const {Schema}=mongoose;

const userSchema=new Schema(
{
    name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
        age:{
        type:Number,
        min:12,
        max:75
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        mutable:true,
    },
    password:{
        type:String,
        required:true
    }
},{timeseries:true});

const User =mongoose.model("User",userSchema);

module.exports=User;