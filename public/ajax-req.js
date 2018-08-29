/**
     * @class Responsible for managing the Ajax requests
     */
class PostsRequest {
    constructor() {
        this.GET = 'GET';
        this.POST = 'POST';
        this.DELETE = 'DELETE';
        this.urlPosts = '/posts';
        // this.urlPostId = '/posts' + postId;
    }

    getPostsReq() {
        return $.ajax({
            method: this.GET,
            url: this.urlPosts
        })
        .then(function (data) {
            console.log(data);
            return data;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
            let errorMes = 'error had occure';
            return errorMes;
        })
    }

    sendPostReq(postText) {
        return $.ajax({
            method: this.POST,
            url: this.urlPosts,
            data: {text: postText}
        })
        .then(function (data) {
            console.log(data);
            return data;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
            let errorMes = 'error had occure';
            return errorMes;
        })
    }

    deletePost(postId) {
        return $.ajax({
            method: this.DELETE,
            url: '/posts/' + postId,
        })
        .then(function (data) {
            console.log(data);
            return data;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
            let errorMes = 'error had occure';
            return errorMes;
        })
    }

    postComment(postId, newComment){
        return $.ajax({
            method: this.POST,
            url: '/posts/' + postId + '/comments',
            data: newComment
        })
        .then(function (data) {
            console.log(data);
            return data;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
            let errorMes = 'error had occure';
            return errorMes;
        })
    }

    deleteComment(postId, commentId) {
        return $.ajax({
            method: this.DELETE,
            url: '/posts/' + postId + '/' + commentId,
        })
        .then(function (data) {
            console.log(data);
            return data;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
            let errorMes = 'error had occure';
            return errorMes;
        })
    }
}


export default PostsRequest;

