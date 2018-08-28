    /**
     * @class Responsible for storing and manipulating Spacebook posts, in-memory
     */
class PostsRepository {
    constructor(postsRequest) {
        this.posts = [];
        this.postsRequest = postsRequest;
    }

    addAllPosts(postsObjs) {
        this.posts = postsObjs;
    }

    addPost(postText) {
        this.postsRequest.sendPostReq(postText)
        .then((data)=>{
            this.posts.push({ text: data, comments: [] });
        })
        
    }

    removePost(index) {
        this.posts.splice(index, 1);
    }
    
    addComment(newComment, postIndex) {
        this.posts[postIndex].comments.push(newComment);
    };

    deleteComment(postIndex, commentIndex) {
        this.posts[postIndex].comments.splice(commentIndex, 1);
      };
}

export default PostsRepository