const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models/workout.js");
const { response } = require("express");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect( "mongodb://localhost/workout", { useNewUrlParser: true });

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

app.get("/", (req, res) => {
    // db.create(data)
    // .then(function (response){
    //     console.log(response);
    // })
    // .catch(({ message }) => {
    //     console.log(message);
    //   });
    db.find()
    .then(function(response){
        console.log(response)
    })
    res.sendFile(__dirname + "/public/index.html")
  });

app.get("/stats", (req, res) => {
    db.find()
    .then(function(response){
        console.log(response)
    })
    res.sendFile(__dirname + "/public/stats.html")
})

app.get("/exercise", (req, res) => {
    db.find()
    .then(function(response){
        console.log(response)
    })
    res.sendFile(__dirname + "/public/exercise.html")
})

app.put("/api/workouts/:id", (req, res) => {
    console.log(req.body)
    db.Workout.create({day: Date.now(), exercises: [req.body]})
    .then(dbExample => {
      console.log("Success!", dbExample);
      res.send(201)
    })
    .catch(({ message }) => {
      console.log("error", message);
      res.send(400)
    });
})

app.get("/api/workouts", (req, res) => {
    db.Workout.find()
    .then(dbResponse => {
        console.log("Response", dbResponse);
        res.json(dbResponse)
    })
    .catch(({ message }) => {
        console.log("error", message);
        res.send(400)
      });
})

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find()
    .then(dbResponse => {
        console.log("Response", dbResponse);
        res.json(dbResponse)
    })
    .catch(({ message }) => {
        console.log("error", message);
        res.send(400)
      });
})

// app.get("/exercise", (req, res) => {
//     db.find()
//     .then(function(response){
//         console.log(response)
//     })
//     res.sendFile("./public/exercise.html")
// })


// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });