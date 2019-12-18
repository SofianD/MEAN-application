const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

const secureUser = require('./../../UserMongoDb');


// DATABASE CONNECTION
mongoose.connect("mongodb+srv://"+ secureUser +"@cluster0-7ef28.mongodb.net/MeanStack?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database.');
  })
  .catch(() => {
    console.log('Connection failed');
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PACTH, PUT, DELETE, OPTIONS"
  );
  next();
})

// ADD NEW POST
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  //console.log("Req.body: ", post);

  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });


});

// RETRIEVE POSTS
app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched succesfully',
      posts: documents
    });
  });

});

app.put('/api/posts/:id', (req, res, next) => {
  console.log('Wshhhhhhhhhhhhhhhhhhhhhhhhhhh ça marche pas!');
  const post = new Post ({
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Update successful' });
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted." });
  });
});

module.exports = app;
