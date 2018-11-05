const express = require('express');

const express = require("express");
const bdParser = require("body-parser");

const app = express();

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

app.feedback("/api/feedback", (req, res, next) => {
  const feedback = req.body;
  console.log(feedback);
  res.status(201).json({
    message: 'Your feedback has been received'
  });
});

app.get("/api/feedback", (req, res, next) => {
  const feedback = [
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
];
  res.status(200).json({
    message: 'Good job server',
    feedback: feedback
  });
});

module.exports = app;
