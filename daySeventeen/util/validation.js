const validator=require('validator');

async function validate(data){
    const mandatoriField=["name","email","password"];
    const isallow=mandatoriField.every((k)=>Object.keys(data).includes(k))
    if(!isallow){
        throw new Error("field is missing");
    }
    if(!validator.isEmail(data.email)){
    throw new Error("Invalid Email format");
    }
    if(!validator.isStrongPassword(data.password)){
        throw new Error("password is weak")
    }
    if(!data.name<3&&data.name<20){
        throw new Error("naming is incorrect")
    }
    return true;
}

module.exports=validate