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
},{timestamps:true});//{timestamps:true} this line state to your DB when your user crete update and delete their acount

//==========={this all things we are doing it is called schema level validation }========

const user =mongoose.model("user",userSchema);//whatever you put in the veriabke ,you just export it

module.exports=user;