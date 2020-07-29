// const express = require("express");
// const logger = require("morgan");
// const mongoose = require("mongoose");

// const PORT = process.env.PORT || 3001;

// const db = require("./models/workout.js");
// const { response } = require("express");

// const app = express();

// app.use(logger("dev"));

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(express.static("public"));

// mongoose.connect( "mongodb://localhost/workout", { useNewUrlParser: true });

// // mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

// app.get("/", (req, res) => {
//     // db.create(data)
//     // .then(function (response){
//     //     console.log(response);
//     // })
//     // .catch(({ message }) => {
//     //     console.log(message);
//     //   });
//     db.find()
//     .then(function(response){
//         console.log(response)
//     })
//     res.sendFile(__dirname + "/public/index.html")
//   });

// app.get("/stats", (req, res) => {
//     db.find()
//     .then(function(response){
//         console.log(response)
//     })
//     res.sendFile(__dirname + "/public/stats.html")
// })

// app.get("/exercise", (req, res) => {
//     db.find()
//     .then(function(response){
//         console.log(response)
//     })
//     res.sendFile(__dirname + "/public/exercise.html")
// })

// app.put("/api/workouts/:id", (req, res) => {
//     console.log(req.body)
//     db.Workout.create({day: Date.now(), exercises: [req.body]})
//     .then(dbExample => {
//       console.log("Success!", dbExample);
//       res.send(201)
//     })
//     .catch(({ message }) => {
//       console.log("error", message);
//       res.send(400)
//     });
// })

// app.get("/api/workouts", (req, res) => {
//     db.Workout.find({}).populate
//     .then(dbResponse => {
//         console.log("Response", dbResponse);
//         res.json(dbResponse)
//     })
//     .catch(({ message }) => {
//         console.log("error", message);
//         res.send(400)
//       });
// })

// app.get("/api/workouts/range", (req, res) => {
//     db.Workout.find()
//     .then(dbResponse => {
//         console.log("Response", dbResponse);
//         res.json(dbResponse)
//     })
//     .catch(({ message }) => {
//         console.log("error", message);
//         res.send(400)
//       });
// })

// // app.get("/exercise", (req, res) => {
// //     db.find()
// //     .then(function(response){
// //         console.log(response)
// //     })
// //     res.sendFile("./public/exercise.html")
// // })


// // Start the server
// app.listen(PORT, () => {
//     console.log(`App running on port ${PORT}!`);
//   });

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
    // db.find()
    // .then(function(response){
    //     console.log(response)
    // })
    res.sendFile(__dirname + "/public/index.html")
  });

app.get("/stats", (req, res) => {
    // db.find()
    // .then(function(response){
    //     console.log(response)
    // })
    res.sendFile(__dirname + "/public/stats.html")
})

app.get("/exercise", (req, res) => {
    // db.find()
    // .then(function(response){
    //     console.log(response)
    // })
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

// .populate("exercises")

app.get("/api/workouts", (req, res) => {
    db.Workout.find()
    .then(dbResponse => {

    // OUTER LOOP: loop though dbResponse to loop through all the workout (looping through workouts/days of the week)
    //     let newWorkoutArray = [];

    //     for(let i =0; i < dbResponse; i++) {
    //         let newWorkoutObject;
    //         let totalDuration = 0;
            // INNER LOOP: Loops through all the exercises.
            //totalDuration += exercises[j].duration
            //INNER LOOP ENDS!!
        // OUTER LOOP, again:
            //Add total duration to newWorkoutObject.totalDuration = totalDuration, newWorkoutObject.day = dbResponse[i].day, newWorkoutObject.exercises = dbResponse[i].exercises
            // Push new object to newWorkoutArray
            // OUTER LOOP ends
    //     }

    //     console.log("Response", dbResponse);
        res.json(dbResponse)
        // will later become:  res.json(newWorkoutArray) 
    })
    .catch(({ message }) => {
        console.log("error", message);
        res.send(400)
      });
})



app.get("/api/workouts/range", (req, res) => {
    // make limit 7 after find() 
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