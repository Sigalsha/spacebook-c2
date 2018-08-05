const posts = [];
let uniqueId = 1;


const addNewPost = function(textVal) {
    let newPost = {
        text: textVal,
        id: uniqueId
    }
    uniqueId++;
    posts.push(newPost);
}



const renderPosts = function() {
    $('.posts').empty();
    $.each( posts, function( index, value ){
        let newPTxt = value.text;
        let idToP = value.id;
        $('.posts').append('<p>' + newPTxt + " " + '</p>');
        $('.posts p:last-child').addClass("post");
        $('.posts p:last-child').attr('data-id', idToP);   
    });
}

const addButtonRemove = function() {
    $("button:contains('REMOVE')" ).remove();
    let btnText = "REMOVE";
    $('p').append('<button>' + btnText + '</button>');
    $('p button:nth-child(1)').attr('type', 'button');
    $('p button:nth-child(1)').addClass("remove");   
}

const clearInputText = function() {
    $('input:text').val('');
}

$('.add-post').on('click', function() {
    addNewPost($('#post-name').val()); 
    renderPosts();
    addButtonRemove();
    clearInputText();
});



const removePost = function(postID) {
    for (let index in posts) {
        if (postID === posts[index].id) {
            posts.splice(index , 1);
        }
    }
}

$('.posts').on('click', '.remove', function () {
    removePost($(this).parent().data().id);
    $(this).parent().remove();
});







