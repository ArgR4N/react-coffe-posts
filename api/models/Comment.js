const mongoose = require('mongoose')

const ForumSchema = new mongoose.Schema({
    msg:{ type:String },
    comments:{ type: Array, default:[]},
    username:{ type: String}
}); 

module.exports = mongoose.model('Forum', ForumSchema);