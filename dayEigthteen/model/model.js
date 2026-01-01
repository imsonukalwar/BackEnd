const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt')

const {Schema}=mongoose;

const user=new Schema({//{yaha pe jo user bana hai wo ek class hai} to hame pata hai ki class ke ander
//  variable and method bhi hota hai jisse ham class ke object se access kartey hai aab hai issi ko adhar banakar 
//method create karenge
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
},{timestamps: true});



user.methods.getjwt =function(){
    const ans=jwt.sign({_id:this._id,email:this.email},"sonu@123",{expiresIn:1000})//yaha user1 to pata nahi to ham yaha {this keyword}
    //ka use karenge current class ke method ko invoke karne ke lia
    return ans;
}

user.methods.verifypassword = async function (upassword){
    const ans=await bcrypt.compare(upassword,this.password);
    return ans;
}



const User=mongoose.model("user",user);

module.exports=User;