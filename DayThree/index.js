const fs=require('fs');
let a=10;
let b="hello sir";
console.log(b);

function add(){
    console.log(a+b);
}

fs.readFile("./data1.json", "utf-8", (err, data) => {
    console.log(data);
});

setTimeout(()=>{
    console.log("this is Settime out");
    
},2000);
console.log(a);
console.log(3+8);

