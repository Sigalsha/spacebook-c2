const express = require('express');
const postsRouter = express.Router();
var Post = require('./models/postModel');
var bodyParser = require('body-parser');
postsRouter.use(bodyParser.json());
postsRouter.use(bodyParser.urlencoded({ extended: false }));
// postsRouter.use('/models/', allModels);

postsRouter.get('/posts', function (req, res) {
    Post.find({}).populate('comments').exec((err, data) => {
        if (err) throw err;
        console.log(data);
        res.send(data);
    });
})

postsRouter.post('/posts', function (req, res) {
    let postText = req.body.text;
    console.log(postText);
    let newPost = new Post({ text: postText, comments: [] });
    newPost.save((err, data) => {
        if (err) throw err;
        console.log(data + ' has been saved to db');
    });
    res.send(postText);
});

postsRouter.delete('/posts/:id', function (req, res) {
    let postId = req.params.id;
    Post.findByIdAndRemove({ _id: postId }, function (err) {
        if (err) throw err;
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
        if (err) throw err;
        console.log(post + 'before add comment');
        post.comments.push(comment);
        console.log(post + 'after add comment');
        post.save((err) => {
            console.log('done saving');
            console.log(err);
            if (err) throw err;
            console.log('Soul goodman');
            console.log(comment.text + ' has been updated in the db');
            res.send(comment);
        });    
    });
});

postsRouter.delete('/posts/:id/:idComment', function (req, res) {
    console.log(req.params)
    let postId = req.params.id;
    console.log(postId)
    let commentId = req.params.idComment;
    console.log(commentId)
    Post.findById(postId, function (err, post) {
        console.log(post);
        console.log(err);
        if (err) throw err;
        console.log('all good muderF');
        post.comments.id(commentId).remove((err)=> {
            if (err) throw err;
        });
        post.save((err) => {
            if (err) throw err;
            console.log('comment deleted');
            console.log('comment id n: ' + commentId + ' has been removed from the post');
            let clientMsg = 'The comment has been deleted';
            res.send(clientMsg);
        });
    });
});

module.exports = postsRouter;
