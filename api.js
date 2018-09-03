const express = require('express');
const postsRouter = express.Router();
var Post = require('./models/postModel');
var bodyParser = require('body-parser');
postsRouter.use(bodyParser.json());
postsRouter.use(bodyParser.urlencoded({ extended: false }));

postsRouter.get('/posts', function (req, res) {
    Post.find().exec((err, posts)=> {
        if (err) {
          console.log(err);
        }
        console.log(posts);
        res.send(posts);
    });
    // Post.find({}).populate('comments').exec((err, data) => {
    //     if (err) throw err;
    //     console.log(data);
    //     res.send(data);
    // });
})

postsRouter.post('/posts', function (req, res) {
    let {text} = req.body;
    let newPost = new Post({ text: text, comments: [] });
    newPost.save((err, data) => {
        if (err) {
            console.log(err);
        }
        console.log(data + ' has been saved to db');
        res.send(text);
    });
    
});

postsRouter.delete('/posts/:id', function (req, res) {
    let {id} = req.params;
    Post.findByIdAndRemove({ _id: id }, function (err) {
        if (err) {
            console.log(err);
        }
        console.log('post id n: ' + id + ' has been removed');
        let clientMsg = 'The post has been deleted';
        res.send(clientMsg);
    });
});

postsRouter.post('/posts/:id/comments', function (req, res) {
    let {id} = req.params;
    let comment ={ text: req.body.text, user: req.body.user };
    Post.findById(id, function (err, post) {
        if (err) {
            console.log(err);
        }
        post.comments.push(comment);
        Post.findByIdAndUpdate(id, post, function(err, comment){
            if (err) {
                console.log(err);
            }
            console.log(comment.text + ' has been updated in the db');
            res.send(comment);
        });
        // post.save((err) => {
        //     if (err) throw err;
        //     console.log(comment.text + ' has been updated in the db');
        //     res.send(comment);
        // });    
    });
});

postsRouter.delete('/posts/:id/:idComment', function (req, res) {
    let {}
    let postId = req.params.id;
    let commentId = req.params.idComment;
    Post.findById(postId, function (err, post) {
        if (err) throw err;
        post.comments.id(commentId).remove((err)=> {
            if (err) throw err;
        });
        post.save((err) => {
            if (err) throw err;
            console.log('comment id n: ' + commentId + ' has been removed from the post');
            let clientMsg = 'The comment has been deleted';
            res.send(clientMsg);
        });
    });
});

module.exports = postsRouter;
