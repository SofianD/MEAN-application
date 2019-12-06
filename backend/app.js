const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log("Req.body: " + post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "1111",
      title: "Wsh la street.",
      content: "WESH LA STREEEEEEEEEEEEEEEET"
    },
    {
      id: "2222",
      title: "Sisi la street.",
      content: "SISIII LA STREEEEEEEEEEEEEEEET"
    }
  ]
  res.status(200).json({
    message: 'Posts fetched succesfully',
    posts: posts
  })
});

module.exports = app;
