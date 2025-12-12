const http=require ('http')

const server=http.createServer((req,res)=>{


    if(req.url==="/"){
            res.end("hello bhai log");
    }
    else if(req.url==="/contant"){
            res.end("dipu bhai")
    }
    else if(req.url==="/about"){
        res.end("how are you bhai log")
    }else{
        res.end("Error paze is not found")
    }
})

server.listen(4000,()=>{
    console.log("server runing at port number:4000");
    })