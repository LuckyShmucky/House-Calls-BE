const functions = require("firebase-functions");
const express = require('express')


const app = express()
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const bcrypt = require('bcrypt')

mongoose.connect(
  process.env.MONGO_STRING,
  function () {
    console.log("connected to DB");
  }
);

// app.options('*', cors())
// Config / MiddleWare
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/patients", require("./controllers/patientsController.js"));
app.use("/medical-doctors", require("./controllers/mdController.js"));
app.use("/authentication", require("./controllers/authentication.js"));
app.use(
  "/chats",
  require("./controllers/chatController.js")
);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the home route for House Calls",
  });
});

app.get("/patients", (req, res) => {
  res.status(200).json({
    message: "Patients",
  });
});

app.get("/medical-doctors", (req, res) => {
  res.status(200).json({
    message: "Doctors",
  });
});

app.get("/authentication", (req, res) => {
  res.status(200).json({
    message: "Authenticating...",
  });
});

app.get("/chats", (req, res) => {
  res.status(200).json({
    message: "Welcome to chat route",
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This url doesn't exist",
  });
});
exports.app = functions.https.onRequest(app)
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
