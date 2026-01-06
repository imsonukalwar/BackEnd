
const radis=require('redis');
// connect radis database
const radisclient=radis.createClient({
    username: 'default',
    password: 'MOd84FImJAdliMVM5szHxKelo0DtHZGC',
    socket: {
        host: 'redis-14262.crce206.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 14262 }
});

// const connectradis=async()=>{
//     // await radisclient.connect();
//     // console.log("connected to redis");
    
// }

// connectradis();

module.exports=radisclient;