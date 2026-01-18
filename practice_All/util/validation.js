const validator=require('validator');

const validate=(data)=>{
    const mandatory=["name","email","password"];
    const isallow=mandatory.every((k)=>Object.keys(data).includes(k));
    if(!isallow){
        throw new Error(`misssing data`);
    }
    if(!validator.isEmail(data.email)){
        throw new Error(`please write email in correct way`);
    }
    if(!validator.isStrongPassword(data.password)){
        throw new Error(`weak password`);
    }
    if(!data.name.length>=3&&data.name.length<=20){
        throw new Error(`write name in correct way`);
    }
    return true;
}
console.log(validate);

module.exports=validate;
