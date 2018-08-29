class EventsHandler {
    constructor(postsRepository, postsRenderer, postsRequest) {
        this.postsRepository = postsRepository;
        this.postsRenderer = postsRenderer;
        this.postsRequest = postsRequest;
        this.$posts = $(".posts");
    }

    initPosts() {
        this.postsRequest.getPostsReq()
        .then((data)=>{
            this.postsRepository.addAllPosts(data);
            this.postsRenderer.renderPosts(this.postsRepository.posts);
        })
    }

    registerAddPost() {
        $('#addpost').on('click', () => {
            let $input = $("#postText");
            if ($input.val() === "") {
                alert("Please enter text!"); 
            } else {
                this.postsRequest.sendPostReq($input.val())
                .then((data)=>{
                    this.postsRepository.addPost(data);
                    this.postsRenderer.renderPosts(this.postsRepository.posts);
                    $input.val("");
                })
            }
        });        
    }

    registerRemovePost() {
        this.$posts.on('click', '.remove-post', (event) => {
            let $currentPost =  $(event.currentTarget).closest('.post')
            let index = $currentPost.index();
            let $currentPostDataId = $currentPost.data('id');
            this.postsRequest.deletePost($currentPostDataId)
            .then((data)=>{
                alert(data);
                this.postsRepository.removePost(index);
                this.postsRenderer.renderPosts(this.postsRepository.posts);
            })
        });

    }

    registerToggleComments() {
        this.$posts.on('click', '.toggle-comments', (event) => {
            let $clickedPost = $(event.currentTarget).closest('.post');
            $clickedPost.find('.comments-container').toggleClass('show');
          });
    }

    registerAddComment() {
        this.$posts.on('click', '.add-comment', (event) => {
            let $comment = $(event.currentTarget).siblings('.comment');
            let $user = $(event.currentTarget).siblings('.name');
          
            if ($comment.val() === "" || $user.val() === "") {
              alert("Please enter your name and a comment!");
              return;
            }
            let $post = $(event.currentTarget).closest('.post');
            let postIndex = $post.index();
            let $postId = $post.data('id');
            let newComment = { text: $comment.val(), user: $user.val() };
            this.postsRequest.postComment($postId, newComment)
            .then((data)=>{
                this.postsRepository.addComment(data, postIndex);
                this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
            })
            $comment.val("");
            $user.val("");
          });

    }

    registerRemoveComment() {
        this.$posts.on('click', '.remove-comment', (event) => {
            let $currentPost = $(event.currentTarget).closest('.post');
            let $postId = $currentPost.data('id');
            let $commentsList = $currentPost.find('.comments-list');
            let postIndex = $currentPost.index();
            let $comment = $(event.currentTarget).closest('.comment');
            let commentIndex = $comment.index();
            let $commentId = $comment.data('id');
            
            this.postsRequest.deleteComment($postId, $commentId)
            .then((data)=> {
                alert(data);
                this.postsRepository.deleteComment(postIndex, commentIndex);
                this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
            })
        });
    }
}

export default EventsHandler