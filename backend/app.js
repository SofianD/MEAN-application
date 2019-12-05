const express = require('express');

const app = express();

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
