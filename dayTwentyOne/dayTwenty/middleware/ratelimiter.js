
const radisclient = require("../config/radis.js");


const ratelimeter = async (req, res, next) => {
try {
    //req.body se ip address le rahe hai
    const ip = req.ip;
    // Redis me IP ke against request count increase kar rahe hain
    const number_of_req = await radisclient.incr(ip);
    if (number_of_req > 60) {
    throw new Error("user req limited exided");
    }
    // // Agar ye IP ki pehli request hai
    // if (number_of_req == 1) {
    //   // Redis key ke liye expiry set kar rahe hain (1 hour)
    // radisclient.expire(3600);
    // }
    if (number_of_req == 1) {
    radisclient.expire(ip, 3600);
}
    next();
} catch (err) {
    res.send("ERROR: " + err);
}
};
module.exports = ratelimeter;
