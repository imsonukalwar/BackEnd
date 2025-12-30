const validator=require('validator');

async function validate(data){
const mendatori=["name","email","password"];
const isallow=mendatori.every((k)=>Object.keys(data).includes(k))
if(!isallow){
    throw new Error ("field is missing !!");
}
if(!validator.isEmail(data.email)){
    throw new Error ("using invalid email")
}
if(!validator.isStrongPassword(data.password)){
    throw new Error("password is weak")
}
if(!data.name<=3 && data.name<=20){
    throw new Error("namming sequence is wrong")
}
return true;
}

module.exports=validate;