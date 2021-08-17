const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{type:String, required:true},
    description:{type: String, default:''},
    password:{type:String, required:true},
    createdAt:{type:Date, default:Date.now()},
    savedPosts:{type:Array, default:[]},
    forums:{type:Array, default:[]}
}); 

module.exports = mongoose.model('User', UserSchema);