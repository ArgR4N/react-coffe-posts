const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PostSchema = new mongoose.Schema({
    title:{type:String, required:true},
    text:{type:String, required:true},
    createdAt:{type:Date, default:Date.now()},
    likes:{type:Number, default:0},
    user:{type: String, ref:'User' , required:true},
    forum:{ type:String },
    comments:{ type:Array, default:[] },
    icon: { type:String }
}); 

module.exports = mongoose.model('Post', PostSchema);