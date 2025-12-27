const mongoose=require('mongoose');
const{Schema}=mongoose;

const schema=new Schema({

})

const user=mongoose.model("user",schema);

module.exports=user;