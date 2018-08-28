const express = require('express');
const postsRouter = express.Router();
var Post = require('./models/postModel');

// import Post from './models/postModel.js';

postsRouter.use('/models/', Post);

postsRouter.get('/posts', function(req, res){
    let request = Post.find({}).populate(comments).exec((err, data)=>{
        if (err) throw err;
        console.log(data);
        return data;
    });
    res.send(request); 
})

module.exports = postsRouter;
// On the server create a GET route 
// (called /posts) and have it return all the posts (and their comments)