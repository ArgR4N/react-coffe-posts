const mongoose = require('mongoose')

const ForumSchema = new mongoose.Schema({
    name:{type:String, required: true},
    createdAt:{type:Date, default:Date.now()},
    description:{type:String, required: true},
    users:{type:Array, default:[]}
}); 

module.exports = mongoose.model('Forum', ForumSchema);