const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const db = require("./models");
const { response } = require("express");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose.connect( "mongodb://localhost/workout", { useNewUrlParser: true });

mongoose.connect(process.env.MONGODB_URI);

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/public/index.html")
  });

app.get("/stats", (req, res) => {

    res.sendFile(__dirname + "/public/stats.html")
})

app.get("/exercise", (req, res) => {
    res.sendFile(__dirname + "/public/exercise.html")
})

app.put("/api/workouts/:id", (req, res) => {
    console.log(req.body)
    db.Workout.findOneAndUpdate({_id: req.params.id}, { $push:{ exercises: [req.body] }}, {new: true})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(({ message }) => {
      console.log("error", message);
      res.send(400)
    });
})

app.get("/api/workouts", (req, res) => {
    db.Workout.find()
        .then(dbResponse => {
            let newWorkoutArray = [];
            let totalDuration = 0;
            for (let i = 0; i < dbResponse.length; i++) {
                let newWorkoutObject = {};
                for (let j = 0; j <  dbResponse[i].exercises.length; j++) {
                    totalDuration += dbResponse[i].exercises[j].duration;
                }
                newWorkoutObject.totalDuration = totalDuration,
                newWorkoutObject.day = dbResponse[i].day,
                newWorkoutObject.exercises = dbResponse[i].exercises;
                console.log("Success!", newWorkoutObject);
                newWorkoutArray.push(newWorkoutObject);
            }
            res.json(newWorkoutArray);
        })
        .catch(err => {
            res.json(err);
        });
});



app.get("/api/workouts/range", (req, res) => {
    // make limit 7 after find() 
    db.Workout.find().limit(7)
    .then(dbResponse => {
        console.log("Response", dbResponse);
        res.json(dbResponse)
    })
    .catch(({ message }) => {
        console.log("error", message);
        res.send(400)
      });
})

app.post("/api/workouts", (req, res) => {
    db.Workout.create({})
    .then(exerciseData => {
        console.log("This is exercise data")
        console.log(exerciseData)
        res.json(exerciseData);
    })
    .catch (err => {
        console.log(err)
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });