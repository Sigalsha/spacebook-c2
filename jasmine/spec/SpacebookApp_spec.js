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

  it("should push an object to posts array, which has no text value", function(){

    app.createPost("");

    var expectedResult = {text: "" , id: 4, comments: []};

    var actualResult = app.posts[app.posts.length - 1];

      expect(actualResult).toEqual(expectedResult);


  })
});