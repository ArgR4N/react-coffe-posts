const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true},
    createdAt:{type:Date, default:Date.now()},
    savedPosts:{type:Array, default:[]}
}); 

module.exports = mongoose.model('User', UserSchema);