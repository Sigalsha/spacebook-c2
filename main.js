var SpacebookApp = function () {
  var posts = [
    {text: "Hello world", id: 1, comments:[
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"}
    ]},
    {text: "Hello world", id: 2, comments:[
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"}
    ]},
    {text: "Hello world", id: 3, comments:[
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"}
    ]}
  ];

  // the current id to assign to a post
  var currentId = 4;
  var $posts = $('.posts');

  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }

  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId
    }

    currentId += 1;

    posts.push(post);
  }

  var renderPosts = function () {
    $posts.empty();
    
    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];

      var commentsContainer = '<div class="comments-container">' +
      '<input type="text" class="comment-name">' +
      '<button class="btn btn-primary add-comment">Post Comment</button>' +
      // renderComments(post) + 
      " </div>";
      $posts.append('<div class="post" data-id=' + post.id + '>'
        + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
        commentsContainer + '</div>');
    }
  }

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;

    var post = _findPostById(id);

    posts.splice(posts.indexOf(post), 1);

  }

  var createComment = function (currentPost ,text) {
    var $clickedPost = $(currentPost).closest('.post');
    var postId = $clickedPost.data().id;
    var post = _findPostById(postId);
    
      var comment = {
      text: text
    }

    post.comments.push(comment);
      
  }

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  }

  // var renderComments = function () {
    "<ul><li></li></ul>"
  //   // var $clickedPost = $(currentPost).closest('.post');
  //   // var $commentsContainer = $clickedPost.find('.comments-container');
  //   // $commentsContainer.empty();
  //   // var postId = $clickedPost.data().id;
  //   // var post = _findPostById(postId);
  //   // // var commentId = $(currentPost).closest()
  //   // // var comment = _findCommentById(commentId);

  //   for (var i = 0; i < posts.length; i += 1) {
  //     var post = post[i];
      
    
  //     var commentDiv = '<div class="comment" data-id=' + post.comment.id + '>'
  //     + '<a href="#" class="removeComment">remove</a> ' + post.comment.text + '</div>';

  //     $commentsContainer.append(commentDiv);
  //   }
  // }  

  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,
    test: posts,
    // TODO: Implement
    createComment: createComment,

    // // TODO: Implement
    // renderComments: renderComments,

    // // TODO: Implement
    // // removeComment: removeComment,
    toggleComments: toggleComments
  }
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
//   app.renderComments();
// });

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
  app.renderPosts();
});

$('.posts').on('click','.show-comments', function () {
  app.toggleComments(this);
});

$('.posts').on('click','.add-comment', function () {
  var text = $('.comment-name').val();
  app.createComment(this, text);
  // app.renderComments();
});