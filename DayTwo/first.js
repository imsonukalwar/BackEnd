// const sum=require("./current/sum");
// const sub=require("./current/sub");
// const mul=require("./current/mul");
const {sum,sub,mul}=require("./current");//Here im not writting index.js because it is by default take from current folder 
//if index.js file not occur than code gives error
sum(3,5);
sub(8,5);
mul(4,7);
console.log("hi im first")
