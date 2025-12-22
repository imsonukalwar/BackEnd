const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
name: String,
age: Number,
Gender: String,
city: String,
House_n: Number
});

const User = mongoose.model("user", userSchema);

module.exports = User;
