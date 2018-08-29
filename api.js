const express = require('express');
const postsRouter = express.Router();
var allModels = require('./models/postModel');
var bodyParser = require('body-parser');
postsRouter.use(bodyParser.json());
postsRouter.use(bodyParser.urlencoded({ extended: false }));
// postsRouter.use('/models/', allModels);

postsRouter.get('/posts', function (req, res) {
    allModels.Post.find({}).populate('comments').exec((err, data) => {
        if (err) throw err;
        console.log(data);
        res.send(data);
    });
})

postsRouter.post('/posts', function (req, res) {
    let postText = req.body.text;
    console.log(postText);
    let newPost = new allModels.Post({ text: postText, comments: [] });
    newPost.save((err, data) => {
        if (err) throw err;
        console.log(data + ' has been saved to db');
    });
    res.send(postText);
});

postsRouter.delete('/posts/:id', function (req, res) {
    let postId = req.params.id;
    allModels.Post.findByIdAndRemove({ _id: postId }, function (err) {
        if (err) throw err;
        console.log('post id n: ' + postId + ' has been removed');
        let clientMsg = 'The post has been deleted';
        res.send(clientMsg);
    });
});

postsRouter.post('/posts/:id/comments', function (req, res) {
    let postId = req.params.id;
    let comment = new allModels.Comment({ text: req.body.text, user: req.body.user });
    allModels.Post.findByIdAndUpdate({ _id: postId }, { comments: [comment] }, function (err, post) {
        if (err) throw err;
        post.save((err) => {
            if (err) throw err;
            console.log(comment.text + ' has been updated in the db');
            res.send(comment);
        });
    });
});

postsRouter.delete('/posts/:id/:idComment', function (req, res) {
    let postId = req.params.id;
    let commentId = postId.idComment;
    allModels.Post.findByIdAndUpdate({ _id: postId }, function (err, post) {
        if (err) throw err;
        post.comments.id({_commentId}).remove();
        post.save((err) => {
            if (err) throw err;
            console.log('comment id n: ' + commentId + ' has been removed from the post');
            let clientMsg = 'The comment has been deleted';
            res.send(clientMsg);
        });
    });
});

    // person.save(function(err) {
    //     if (err) throw err;
    //     else console.log('Person successfully updated!');
    //   });
    // Person.findOneAndUpdate({ age: 25 }, { firstName: 'Paul' }, function(err, person) {
    //     if (err) throw err;
    //     else console.log(person);
    //   });

    module.exports = postsRouter;
// On the server create a GET route 
// (called /posts) and have it return all the posts (and their comments)