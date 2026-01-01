const validator=require('validator');

async function validate(data) {
    const mandatory=["name","email","password"];
    const isallow=mandatory.every((k)=>Object.keys(data).includes(k));
    if(!isallow){
        throw new Error("field is missing");
    }
    if(!validator.isEmail(data.email)){
        throw new Error("invalied email");
    }
    if(!validator.isStrongPassword(data.password)){
        throw new Error("password is weak");
    }
    if(!data.name.length>=3&&data.name.length<=20){
        throw new Error("naming is unsequience");
    }
    return true;
}

module.exports=validate;