const express = require('express');
const postsRouter = express.Router();
var Post = require('./models/postModel');
var bodyParser = require('body-parser');
postsRouter.use(bodyParser.json());
postsRouter.use(bodyParser.urlencoded({ extended: false }));

postsRouter.get('/posts', function (req, res) {
    Post.find({}).populate('comments').exec((err, data) => {
        if (err){
            console.log(err);
        }
        console.log(data);
        res.send(data);
    });
})


postsRouter.post('/posts', function (req, res) {
    let postText = req.body.text;
    let newPost = new Post({ text: postText, comments: [] });
    newPost.save((err, data) => {
        if (err){
            console.log(err);
        }
        console.log(data + ' has been saved to db');
        res.send(postText);
    });

});

postsRouter.delete('/posts/:id', function (req, res) {
    let postId = req.params.id;
    Post.findByIdAndRemove({ _id: postId }, function (err) {
        if (err){
            console.log(err);
        }
        console.log('post id n: ' + postId + ' has been removed');
        let clientMsg = 'The post has been deleted';
        res.send(clientMsg);
    });
});

postsRouter.post('/posts/:id/comments', function (req, res) {
    let postId = req.params.id;
    console.log(postId);
    let comment ={ text: req.body.text, user: req.body.user };
    console.log(comment);
    Post.findById(postId, function (err, post) {
        if (err){
            console.log(err);
        }
        post.comments.push(comment);
        post.save((err) => {;
            if (err){
                console.log(err);
            }
            console.log(comment.text + ' has been updated in the db');
            res.send(comment);
        });    
    });
});

postsRouter.delete('/posts/:id/:idComment', function (req, res) {
    console.log(req.params)
    let postId = req.params.id;
    let commentId = req.params.idComment;
    Post.findById(postId, function (err, post) {
        if (err){
            console.log(err);
        }
        post.comments.id(commentId).remove((err)=> {
            if (err){
                console.log(err);
            }
        });
        post.save((err) => {
            if (err){
                console.log(err);
            }
            console.log('comment deleted');
            console.log('comment id n: ' + commentId + ' has been removed from the post');
            let clientMsg = 'The comment has been deleted';
            res.send(clientMsg);
        });
    });
});

module.exports = postsRouter;
