const redis = require('redis');

const radisClient=redis.createClient({
    username: 'default',
    password: 'MOd84FImJAdliMVM5szHxKelo0DtHZGC',
    socket: {
        host: 'redis-14262.crce206.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 14262 }
})

module.exports=radisClient;