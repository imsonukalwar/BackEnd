
const validate=require('validator');

async function validates(data) {
    const mandatory=["name","email","password"];
    const isallow=mandatory.every((k)=>Object.keys(data).includes(k));
    if(!isallow){
        throw new Error("missing field");
    }
    if(!validate.isEmail(data.email)){
        throw new Error("invalidate email");
    }
    if(!validate.isStrongPassword(data.password)){
        throw new Error("weak password");
    }
    if(!data.name.length>=3&&data.name.length<=20){
        throw new Error("naming is incorrect sequence");
    }
    return true;
}

module.exports=validates;