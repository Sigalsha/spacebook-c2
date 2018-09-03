var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const api = require('./api');
// const SERVER_PORT = process.env.PORT || '8080';

mongoose.connect('mongodb://localhost/spacebookDB', function() {
  console.log("DB connection established!!!");
})


var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use('/', api);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 

app.listen(process.env.PORT || '8080', () => {
  console.log("Server started on port ");
});
