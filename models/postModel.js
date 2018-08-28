var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//design the two schema below and use sub docs 
//to define the relationship between posts and comments


let commentSchema = new Schema({
    text: String,
    user: String
});


let postSchema = new Schema({
    text: String,
    comments: [commentSchema]
});

let Post = mongoose.model('post', postSchema)

module.exports = Post; 

//'aPost' is a single post document (that has be created or found)
// aPost.comments.push({ username: "Bob", text: "Great Post!" })
// aPost.save(function(err, data){...})

//to retrieve a comment that has a specific _id from aPost
// var aComment = aPost.comments.id(_id);

// //to remove a comment with a specific _id from aPost
// aPost.comments.id(_id).remove();