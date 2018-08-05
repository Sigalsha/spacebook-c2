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



// for (let index in posts) {
//     if ()
// }



// $('ul').on('click', 'li', function () {
//     $(this).remove();
//   });


// const checkIdValue = function (idNum) {
//     for (let index in posts) {
//         while (idNum === posts[index].id) {
//             idNum = Math.floor(Math.random() * 10000) + 1;
//             checkIdValue(idNum);
//         }        
//     }
// }


// var i = array.indexOf("b");
// if(i != -1) {
// 	array.splice(i, 1);
// }

//<button type="button" class="remove">REMOVE</button>


// $( "p" ).addClass( "myClass yourClass" );
//$('div').attr('data-info', '222');

// Now to render the array. Create a second function that adds all the posts in the posts array to the posts div.

// In addition, add the id to the element with our data attribute. Each post element should look something like this:

// <p class="post" data-id="1">Hey man! I'm a post!</p>


// Each post object should have two properties: text (the user's input, a string) and 
// id (a number, dynamically generated).
// Each id should be unique to that post (no two post objects should have the same id).
