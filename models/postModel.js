var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let commentSchema = new Schema({
    text: String,
    user: String
}, { usePushEach: true });


let postSchema = new Schema({
    text: String,
    comments: [commentSchema]
}, { usePushEach: true });

let Post = mongoose.model('post', postSchema)
// let Comment = mongoose.model('comment', commentSchema)
module.exports = Post;
 

