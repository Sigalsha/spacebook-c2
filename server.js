var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const Post = require('./models/postModel');
const api = require('./api');
const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/spacebookDB', function() {
  console.log("DB connection established!!!");
})


var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use('/', api);
app.use('/models/', Post);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//----checking the database by adding it a post with a comments----//

// Post.find({}).exec(function(err, post){
//   if (err) throw err;
//   console.log(post);
// });  

// var postExample2 = new Post({text: 'Post2', comments: []});
// postExample2.comments.push({text: 'comment2', user: 'adminRules'});
// postExample2.save((err, data)=> {
//   if (err) throw err;
//   console.log(data);
// });

// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
// 2) to handle adding a post
// 3) to handle deleting a post
// 4) to handle adding a comment to a post
// 5) to handle deleting a comment from a post

app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});
