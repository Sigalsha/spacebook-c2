/**
     * @class Responsible for storing and manipulating Spacebook posts, in-memory
     */
class PostsRequest {
    constructor() {
        this.GET = 'GET';
        this.POST = 'POST';
        this.urlPosts = '/posts';
        // this.data = 
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

    sendPostReq(text) {
        const data = text;
        return $.ajax({
            method: this.POST,
            url: this.urlPosts,
            data: data,
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

// Still on the client-side, in the success handler, 
// you should populate the posts array and then use it to render the view