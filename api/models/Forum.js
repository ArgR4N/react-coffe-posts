const mongoose = require('mongoose')

const ForumSchema = new mongoose.Schema({
    createdAt:{type:Date, default:Date.now()},
    forumName:{type:String, unique:true}
}); 

module.exports = mongoose.model('Forum', ForumSchema);