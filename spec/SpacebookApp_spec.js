//testing app.createPost function:

describe("app.createPost", function() {
    it("should add a new post to the list", function() {
     app.createPost("jjj");
  
      var actualResult = app.posts[app.posts.length-1].text;
  
      expect(actualResult).toBe("jjj");
    });
  });

describe("createPost", function() {
  var app;

  beforeEach(function() {
    app = SpacebookApp();
  
  });
  //1  

  it("should create an post object, give it an id and push it into the posts array", function() {

      app.createPost("hey you all!");

      var expectedResult = {text: "hey you all!", id: 4, comments: []};

      var actualResult = app.posts[app.posts.length - 1];

      expect(actualResult).toEqual(expectedResult);
  });
  //2
  it("should push an object to posts array, which has no text value", function(){

    app.createPost("");

    var expectedResult = {text: "" , id: 4, comments: []};

    var actualResult = app.posts[app.posts.length - 1];

    expect(actualResult).toEqual(expectedResult);
  });

  //3
  it("should push 3 objects to the posts array with 3 different id's", function() {

    app.createPost("first post");
    app.createPost("second post");
    app.createPost("third post");

    var actualResult  = app.posts[app.posts.length - 3].id;
    var actualResult2 = app.posts[app.posts.length - 2].id;
    var actualResult3 = app.posts[app.posts.length - 1].id;

    expect(actualResult).toBe(4);
    expect(actualResult2).toBe(5);
    expect(actualResult3).toBe(6);

  });

  //4
  it("should push 3 objects to the posts array with 3 different texts", function() {

    app.createPost("first post");
    app.createPost("second post");
    app.createPost("third post");

    var actualResult  = app.posts[app.posts.length - 3].text;
    var actualResult2 = app.posts[app.posts.length - 2].text;
    var actualResult3 = app.posts[app.posts.length - 1].text;

    expect(actualResult).toBe("first post");
    expect(actualResult2).toBe("second post");
    expect(actualResult3).toBe("third post");  
  });

  //5
  it("should add 1 new post to posts's array", function() {
    app.removePost(1);
    app.removePost(2);
    app.removePost(3);
    app.createPost("");
    app.removePost(4);
    app.createPost("");
 
     var actualResult = app.posts[app.posts.length-1].text;
     var actualResult2 = app.posts[app.posts.length-1].id;
     var actualResult3 = app.posts.length;
 
     expect(actualResult).toBe("");
     expect(actualResult2).toBe(5);
     expect(actualResult3).toBe(1);

   });
   
   //6
   it("should add 2 new post to the posts array", function() {
    app.createPost("null");
    app.createPost("0");
 
     var actualResult = app.posts[app.posts.length-2].text;
     var actualResult2 = app.posts[app.posts.length-1].text;

 
     expect(actualResult).toBe("null");
     expect(actualResult2).toBe("0");

   });

   //7
   it("should add 1 new post to the posts array", function() {
    app.createPost("");
  
     var actualResult = app.posts[app.posts.length-1].text;

     expect(actualResult).toBe("");

   });

   //8
   it("should add 1 new post to the posts array", function() {
    app.createPost("");
  
     var actualResult = app.posts[app.posts.length-1].text;

     expect(actualResult).toBe("");

   });

   //9
   it("should add 1 new post to the posts array", function() {
    app.createPost("undefined");  
    app.removePost(3);
      
    var actualResult = app.posts[app.posts.length-1].text;

    expect(actualResult).toBe("undefined");

   });

   //10
   it("should add 3 new posts to the posts array", function() {
    app.removePost(2);
    app.createPost("false");
    app.removePost(4);
    app.createPost("true");  
    app.removePost(1);
    app.createPost("false");  
    app.removePost(3);
      
    var actualResult = app.posts[app.posts.length-1].text;
    var actualResult2 = app.posts[app.posts.length-2].text;
    var actualResult3 = app.posts.length;

    expect(actualResult).toBe("false");
    expect(actualResult2).toBe("true");
    expect(actualResult3).toBe(2);

   });

});


//testing app.removePost function:
describe("removePost", function() {
  var app;

  beforeEach(function() {
    app = SpacebookApp();
  
  });

  //1
  it("should add 1 post to the posts array and then remove it", function() {

    app.createPost("first post");

    var actualResult  = app.posts.length;

    app.removePost(4);
   
    var actualResult2 = app.posts.length;

    expect(actualResult).toBe(4);
    expect(actualResult2).toBe(3);

  });

  //2
  it("should add 1 post to the posts array and than remove another post", function() {

  app.createPost("some post");
  var actualResult  = app.posts.length;

  app.removePost(3);
  var actualResult2 = app.posts[app.posts.length-1].id;

  
  expect(actualResult).toBe(4);
  expect(actualResult2).toBe(4);
  });

  //3
  it("should remove all the posts from the posts array", function() {

  
    app.removePost(1);
    app.removePost(2);
    app.removePost(3);

    var actualResult = app.posts.length;
  
    
    expect(actualResult).toBe(0);
    });

  //4
  it("should remove the second post from the array", function() {

 
    app.removePost(2);
    var actualResult = app.posts.length;
    var actualResult2 = app.posts[app.posts.length-1].id;
    var actualResult3 = app.posts[app.posts.length-2].id;
  
    
    expect(actualResult).toBe(2);
    expect(actualResult2).toBe(3);
    expect(actualResult3).toBe(1);
    });  

  //5
  it("should remove post num. 2 and 3 from the array", function() {
    app.createPost("");
    app.removePost(2);
    app.removePost(3);

    var actualResult = app.posts.length;
    var actualResult2 = app.posts[app.posts.length-1].id;
    var actualResult3 = app.posts[app.posts.length-2].id;
  
    expect(actualResult).toBe(2);
    expect(actualResult2).toBe(4);
    expect(actualResult3).toBe(1);
    });  

  //6
  it("should remove all posts, add another one and than remove it too", function() {
    app.removePost(1);
    app.removePost(2);
    app.removePost(3);
    app.createPost("");

    var actualResult = app.posts[app.posts.length-1].id;

    app.removePost(4);

    var actualResult2 = app.posts.length;
    
    expect(actualResult).toBe(4);
    expect(actualResult2).toBe(0);

    });  

  //7
   it("should remove the post with the id 3", function() {
    app.createPost("undefined");  
    app.removePost(3);
      
    var actualResult = app.posts[app.posts.length-1].id;
    var actualResult2 = app.posts[app.posts.length-1].text;

    expect(actualResult).toBe(4);
    expect(actualResult2).toBe("undefined");
   });

   //8
   it("should remove 4 posts from the posts array", function() {
    app.removePost(2);
    app.createPost("false");
    app.removePost(4);
    app.createPost("true");  
    app.removePost(1);
    app.createPost("false");  
    app.removePost(3);
    
    var actualResult = app.posts.length;
    var actualResult2 = app.posts[app.posts.length-2].id;
    var actualResult3 = app.posts[app.posts.length-1].id; 

    expect(actualResult).toBe(2);
    expect(actualResult2).toBe(5);
    expect(actualResult3).toBe(6);
   });

});

//testing app._findPostById function:
describe("_findPostById", function() {
  var app;

  beforeEach(function() {
    app = SpacebookApp();
  
  });

  //1
  it("should find the id's post in the array and returns the post's id and text", function() {
    app._findPostById(3);

    var actualResult  = app.posts[app.posts.length-1].id;   
    var actualResult2  = app.posts[app.posts.length-1].text;   

    expect(actualResult).toBe(3);
    expect(actualResult2).toBe("Hello world");

  });

  //2
  it("should find if the ids are in the array and returns the id's posts's text", function() {
    app._findPostById(1);
    app._findPostById(2);
    app._findPostById(3);

    var actualResult  = app.posts[app.posts.length-3].text;   
    var actualResult1  = app.posts[app.posts.length-2].text;   
    var actualResult2  = app.posts[app.posts.length-1].text;   

    expect(actualResult).toBe("Hello world");
    expect(actualResult1).toBe("Hello world");
    expect(actualResult2).toBe("Hello world");

  });

  //3
  it("should find if the id is part of a post in the array and return it", function() {
    app.createPost("");
    app.removePost(1);
    app._findPostById(4);

    var actualResult  = app.posts[app.posts.length-1].id;   
 
    expect(actualResult).toBe(4);

  });

  //4
  it("should return the id and text of the post in the array who has the given id", function() {
    app.createPost("");
    app.removePost(1);
    app.removePost(2);
    app.removePost(3);
    app._findPostById(4);

    var actualResult  = app.posts[app.posts.length-1].id; 
  
    expect(actualResult).toBe(4);

  });

  //5
  it("should find the id in posts's array, and returns it's id", function() {
    app.createPost("");
    app._findPostById(2);

    var actualResult  = app.posts[app.posts.length-3].id; 
  
    expect(actualResult).toBe(2);

  });

  //6
  it("should find the id in posts's array, and returns it's text", function() {
    app.createPost("");
    app.removePost(2);
    app.removePost(3);
    app._findPostById(1);
    app._findPostById(4);

    var actualResult  = app.posts[app.posts.length-2].text; 
    var actualResult2  = app.posts[app.posts.length-1].text; 
  
    expect(actualResult).toBe("Hello world");
    expect(actualResult2).toBe("");

  });

  //7
  it("should find if the given ids are in the posts array", function() {
    app.createPost("3");
    app.createPost("4");
    app.createPost("5");
    app.createPost("6");
    app.createPost("7");
    app.createPost("8");
    app.createPost("9");
    app.createPost("10");
    app._findPostById(6);
    app._findPostById(9);
    app._findPostById(9);
    app._findPostById(10);

    var actualResult = app.posts[app.posts.length-6].text;
    var actualResult2 = app.posts[app.posts.length-3].id;
    var actualResult3 = app.posts[app.posts.length-3].text;
    var actualResult4 = app.posts[app.posts.length-2].id;     
       
    expect(actualResult).toBe("5");
    expect(actualResult2).toBe(9);
    expect(actualResult3).toBe("8");
    expect(actualResult4).toBe(10);

    });  

  //8
  it("should find if the given ids are in the posts array", function() {
    app.removePost(2);
    app.createPost("false");
    app.removePost(4);
    app.createPost("true");  
    app.removePost(1);
    app.createPost("false");  
    app.removePost(3);
    
    var actualResult = app.posts.length;
    var actualResult2 = app.posts[app.posts.length-2].id;
    var actualResult3 = app.posts[app.posts.length-1].id; 

    expect(actualResult).toBe(2);
    expect(actualResult2).toBe(5);
    expect(actualResult3).toBe(6);
    });

  //9
  it("should find if the given id is in the posts array", function() {
    app.createPost("post");

    var textFunc = function() {
      if (app._findPostById(4).id === 4) {
        return true;
      } else return false;
    };
    textFunc();

    var actualResult = textFunc();

    expect(actualResult).toBe(true);
    });

  //10
  it("should find if the given id is in the posts array", function() {
    app.createPost("post");
    app.removePost(4);
    var textFunc = function() {
      if (app._findPostById(4).id === 4) {
        return false;
      } else return true;
    }; 
    textFunc();

    var actualResult = textFunc();
 
    expect(actualResult).toBe(fasle);
    });
    
});