const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PostSchema = new mongoose.Schema({
    title:{type:String, required:true},
    text:{type:String, required:true},
    createdAt:{type:Date, default:Date.now()},
    likes:{type:Number, default:0},
    user:{type: String, ref:'users' , required:true},
    forum:{ type:String }
}); 
/*With users and forums functions
const PostSchema = new mongoose.Schema({
    title:{type:String, required:true},
    text:{type:String, required:true},
    createdAt:{type:Date, default:Date.now()},
    forumName:{type:String, required:true},
    userId:{type:String, required:true}
}); 
*/

module.exports = mongoose.model('Post', PostSchema);