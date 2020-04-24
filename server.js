const express = require('express');
const mongojs = require('mongojs');
const mongoose = require('mongoose');
const logger = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 8080;

const db = require("./models/indexmodel");

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populate", { useNewUrlParser: true});

db.Workout.create({ name: "workout"})
.then(dbWorkout => {
    console.log(dbWorkout);
})
.catch(({message}) => {
    console.log(message);
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
})


app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then(dbLibrary => {
        res.json(dbLibrary);
    })
    .catch(err => {
        res.json(err)
    })
});
// app.get("/api/workouts", (req, res) => {
//     db.Workout.find({})
//     .populate("name")
//     .then(dbLibrary => {
//         res.json(dbLibrary);
//     })
//     .catch(err => {
//         res.json(err)
//     })
// });
app.get("/api/workouts/:id", (req, res) => {
    db.Workout.findById({
        
            _id: mongojs.ObjectId(req.params.id)    
        
    })
    .then(dbLibrary => {
        res.json(dbLibrary);
    })
    .catch(err => {
        res.json(err)
    })
});

app.post("/api/workouts/:id", (req, res) => {
    db.Workout.create(
        {
            _id: mongojs.ObjectId(req.params.id)    
        },
        {
            $set: {
                type: req.body.type,
                name: req.body.name,
                duration: req.body.duration,
                weight: req.body.weight,
                reps: req.body.reps,
                sets: req.body.sets

            }
        },
        (error, data) => {
            if(error){
                res.send(error)
            }else{
                res.send(data)
            }
        }
    );
});






app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });