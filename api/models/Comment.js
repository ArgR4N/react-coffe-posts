const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    msg:{ type:String },
    comments:{ type: Array, default:[]},
    user:{ type: mongoose.Schema.Types.ObjectId, ref:'Post' },
    xd:{ type: mongoose.Schema.Types.ObjectId, ref:'Post' }
}); 

module.exports = mongoose.model('Comment', CommentSchema);