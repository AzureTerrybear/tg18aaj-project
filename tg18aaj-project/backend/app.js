const express = require('express');
const bdParser = require("body-parser");
const mongoose = require('mongoose');

const Feed = require('./models/feedback');

const app = express();

// const options = {useNewUrlParser: true};

mongoose.connect('mongodb://localhost:27017/feedbackCollection', { useNewUrlParser: true });

app.use(bdParser.json());
// not necessary but trying it
app.use(bdParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.post("/api/feedback", (req, res, next) => {
  const feed = new Feed({
    title: req.body.title,
    content: req.body.content
  });
  // console.log(feed);
  // mongo commands are better because it automatically updates the data
  feed.save().then(newFeed => {
    res.status(201).json({
      message: "Your feedback has been received",
      feedId: newFeed._id
    });
  });
});

app.put("/api/feedback/:id", (req, res, next) => {
  const feed = new Feed({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Feed.updateOne({ _id: req.params.id }, feed).then(result => {
    console.log(result);
    res.status(200).json({ message: "It has been edited!" });
  });
});

app.get("/api/feedback", (req, res, next) => {

  // dummy data
  /* const feedback = [
     {
    id: "123123",
    title: "First",
    content: "Serverside up"
  },
  {
    id: "124123",
    title: "First again",
    content: "Serverside up once more"
  }
]; */

  Feed.find().then(documents => {
    res.status(200).json({
      message: 'Good job server',
      feedback: documents
    });
  });
});

// dynamically passed id
app.delete("/api/feedback/:id", (req, res, next) => {
  Feed.deleteOne({ _id: req.params.id }).then(result => {console.log(result);
  res.status(200).json({message: "It's dead, son"});
  });
});


module.exports = app;
