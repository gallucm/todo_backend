const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  password: String,
  image: String,
  __v: { type: Number, select: false}
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, username: this.username, image: this.image }, process.env.JWTPRIVATEKEY, {
    expiresIn: 1440
   });
  return token;
};

module.exports = mongoose.model("User", userSchema);