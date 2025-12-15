const md=(req,res,next)=>{
    const tocken = "ASDF";
    const access = "ASDF" === tocken ? 1 : 0;
    if(!access){
        res.status(403).send("not permission");
    }else{
        next();
    }
};
module.exports={md};