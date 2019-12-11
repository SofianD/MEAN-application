const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

// DATABASE CONNECTION
mongoose.connect("mongodb+srv://Sofian:QLbDkTQGb4pv3uMS@cluster0-7ef28.mongodb.net/MeanStack?retryWrites=true&w=majority")
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
    "GET, POST, PACTH, DELETE, OPTIONS"
  );
  next();
})

// ADD NEW POST
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log("Req.body: ", post);

  post.save();

  res.status(201).json({
    message: 'Post added successfully'
  });
});

// RETRIEVE POSTS
app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched succesfully',
      posts: documents
    })
  });

});

module.exports = app;
