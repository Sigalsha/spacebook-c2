/**
     * @class Responsible for storing and manipulating Spacebook posts, in-memory
     */
class PostsRequest {
    constructor() {
        
    }

    getPosts() {
        return $.ajax({
            method: "GET",
            url: '/posts'
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