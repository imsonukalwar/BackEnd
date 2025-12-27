const bcrypt =require('bcrypt')


const pas="sonu123"
async function hash() {
    const salt= await bcrypt.genSalt(10);//salt generating
    const haspas= await bcrypt.hash(pas,salt);//10 is salt round
    console.log(salt);
    
console.log(haspas);
const cmp = await bcrypt.compare(pas,haspas);
console.log(cmp);

}
hash();
