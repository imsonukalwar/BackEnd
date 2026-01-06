const validator=require('validator');

async function validate(data){
    //mendatory field which is nessesary to write in user input box
    const mandatory=["name","email","password"];
    //from this line we are ensure that value of mandatory field is equal of data value
    const isallow= mandatory.every((k)=>Object.keys(data).includes(k))
    if(!isallow){
        throw new Error("field is missing");
    }
    //from this line we are check email is in the valied format
    if(! validator.isEmail(data.email)){
        throw new Error("email is not fetching")
    }
    //from this line we are check password is strong or weak
    if(! validator.isStrongPassword(data.password)){
        throw new Error("weak password !")
    }
    // we are checking name is in the valied range
    if(!data.name.length >= 3 && data.name.length <= 20){
        throw new Error("naming is in wrong sequience")
    }
    //if all is not negative than retun true
    return true;
}

module.exports=validate;