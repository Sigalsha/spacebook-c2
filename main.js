var SpacebookApp = function () {
  return {
    posts: [
      {
        text: "Hello world", id: 1, comments: [
          { text: "Man, this is a comment!", id: 1},
          { text: "Man, this is a comment!", id: 2 },
          { text: "Man, this is a comment!", id: 3 }
        ]
      },
      {
        text: "Hello world", id: 2, comments: [
          { text: "Man, this is a comment!", id: 1 },
          { text: "Man, this is a comment!", id: 2 },
          { text: "Man, this is a comment!", id: 3 }
        ]
      },
      {
        text: "Hello world", id: 3, comments: [
          { text: "Man, this is a comment!", id: 1 },
          { text: "Man, this is a comment!", id: 2 },
          { text: "Man, this is a comment!", id: 3 }
        ]
      }
    ],

    // the current id to assign to a post
    currentId: 4,
    currentCommentId: 1,
    $posts: $('.posts'),

    _findPostById: function (id) {
      for (var i = 0; i < this.posts.length; i += 1) {
        if (this.posts[i].id === id) {
          return this.posts[i];
        }
      }
    },

    _findCommentById: function (id, comments) {
      for (var i = 1; i < comments.length; i += 1) {
        if (comments[i].id === id) {
          return this.comments[i];
        }
      }
    },
 

    createPost: function (text) {
      var post = {
        text: text,
        id: this.currentId,
        comments: []
      }

      this.currentId += 1;

      this.posts.push(post);
    },

    renderPosts: function () {
      this.$posts.empty();

      for (var i = 0; i < this.posts.length; i += 1) {
        var post = this.posts[i];

        var commentsContainer = `<div class="comments-container">
                                  <input type="text" class="comment-name">
                                  <button class="btn btn-primary add-comment">Post Comment</button> 
                                  ${this.getCommentsHTML(post)}
                                </div>`;

        this.$posts.append('<div class="post" data-id=' + post.id + '>'
          + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
          commentsContainer + '</div>');
      }
    },

    // var source = $('#comments-template').html();
    // var template = Handlebars.compile(source);
    // var newHTML = template({posts});
    // $('.posts').append(newHTML);

    removePost: function (postID) {

      var post = this._findPostById(postID);

      this.posts.splice(this.posts.indexOf(post), 1);
    },

    toggleComments: function (currentPost) {
      var $clickedPost = $(currentPost).closest('.post');
      $clickedPost.find('.comments-container').toggleClass('show');
    },

    createComment: function (text, postID) {
        var comment = {
          text: text,
          id: this.currentCommentId   
        }
        this.currentCommentId += 1;

        var postById = this._findPostById(postID); 
        postById.comments.push(comment);   
    },

    removeComment: function (postID, commentID) {
        var post = this._findPostById(postID);
        const comments = post.comments;
        var comment = this._findCommentById(commentID, comments);
  
        comments.splice(comments.indexOf(comment), 1)
    },

    getCommentsHTML: function (post) {
      const comments = post.comments;
      var commentTxt = "";
      for (var i = 0; i < comments.length; i++) {
        var comment = comments[i];
        commentTxt += '<li data-id=' + comment.id + '>' + comment.text + '<a href="#" class="removeComment">remove</a>' + '</li>';
      }
      var commentsList = "<ul>" + commentTxt + "</ul>";
      return commentsList;
    }
  };
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();

  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
  
  var $clickedPost = $(this).closest('.post');
  var postID = $clickedPost.data().id;

  app.removePost(postID);
  app.renderPosts();
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});

$('.posts').on('click', '.add-comment', function() {
  var text = $(this).closest('.post').find('.comment-name').val();
  var postID = $(this).closest('.post').data("id");
  app.createComment(text, postID);
  app.renderPosts();
});

$('.posts').on('click', '.removeComment', function () {
  var $clickedPost = $(this).closest('.post');
  var postID = $(this).closest('.post').data("id");
  var commentsLi = $clickedPost.find('li');
  var commentID = commentsLi.data("id");
  app.removeComment(postID, commentID);
  app.renderPosts();
});