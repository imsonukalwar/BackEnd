const validator=require('validator');


function validate(data){
    const IsmandatoryField=["firstname","email","age","password"];
    const allow=IsmandatoryField.every((k)=>Object.keys(data).includes(k));
    if(!allow)
        throw new Error("Fields missing")
    if(!validator.isEmail(data.email))
        throw new Error("invalid email");
    if(!validator.isStrongPassword(data.password))
        throw new Error("Weak password !");
    if(data.firstmname>=3 && data.firstmname<=20)
        throw new Error("naming formate is wrong ! reediet firstname");
    return true;
    }

module.exports =validate;