const mongoose = require('mongoose')

const ForumSchema = new mongoose.Schema({
    name:{type:String, required: true},
    comments: {type:Array, default:[]},
    description:{type:String, required: true},
    createdAt:{type:Date, default:Date.now()},
    users:{type:Array, required: true}
}); 

module.exports = mongoose.model('Forum', ForumSchema);