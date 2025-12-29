const mongoose=require('mongoose');
const {Schema}=mongoose;

const userSchema=new Schema({
    firstname:{
        type:String,
        required :true,
        minLength:3,
        maxLength:20,
    },
    lastname:{
        type:String
    },
    age:{
        type:Number,
        min:12,
        max:75
    },
    Gender:{
        type:String,
        // enum:["male","female","others"],
        validate(value){
            if(!["male","female","others"].includes(value))
                throw new Error("Invalied gender");
        },
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
    },
    photo:{
        type:String
    },
},{timestamps:true});
const user =mongoose.model("user",userSchema);

module.exports=user;