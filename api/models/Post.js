const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title:{type:String, required:true},
    text:{type:String, required:true},
    createdAt:{type:Date, default:Date.now()},
    likes:{type:Number, default:0}
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