const express = require('express');
const postsRouter = express.Router();
var Post = require('./models/postModel');

postsRouter.use('/models/', Post);

postsRouter.get('/posts', function(req, res){
    Post.find({}).populate('comments').exec((err, data)=>{
        if (err) throw err;
        console.log(data);
        res.send(data);
    });
})

postsRouter.post('/', function(req, res){
    console.log(req.body);
    let newPost = new Post({text: req.body, comments: []});
    // newPost.comments.push({text: 'some text from req.body??', user: 'adminRules'});
    newPost.save((err, data)=> {
  if (err) throw err;
  console.log(data + ' has been saved to db');
    });
});

module.exports = postsRouter;
// On the server create a GET route 
// (called /posts) and have it return all the posts (and their comments)