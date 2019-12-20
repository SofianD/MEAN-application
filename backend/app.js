const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

const secureUser = require('./../../UserMongoDb');

const postsRoutes = require('./routes/posts');

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
});

app.use("/api/posts", postsRoutes);



module.exports = app;
