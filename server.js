const express = require('express');
const mongojs = require('mongojs');
const mongoose = require('mongoose');
const logger = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 8080;

const db = require("./models");

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populate", { useNewUrlParser: true});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
})
app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"))
})


app.get('/api/workouts', (req, res) => {
    db.Workout.find({})
    .populate('exercise')
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => {
        res.json(err);
    })
})
app.get("/api/exercise", (req, res) => {
    db.Exercise.find({})
    .then(dbExercise => {
        res.json(dbExercise)
    })
    .catch(err => {
        res.json(err)
    })
})


app.get("/api/workouts/:id", (req, res) => {
    db.Workout.findById({
        
            _id: mongojs.ObjectId(req.params.id)    
        
    })
    .populate("exercise")
    .then(dbLibrary => {
        res.json(dbLibrary);
    })
    .catch(err => {
        res.json(err)
    })
});

app.post("/exercise", ({body}, res) => {
    db.Exercise.create(body)
    .then(dbUser => {
        res.json(dbUser);
    })
    .catch(err => {
        res.json(err);
    })
});

  // .then(({_id}) => db.Workout.findOneAndUpdate({}, {$push: {exercise: _id}}, {new: true}))
app.post("/api/workouts/", ({body}, res) => {
    db.Workout.create(body)
  
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => {
        res.json(err);
    })
});

app.put("/api/workouts/:id", (req, res) => {
    console.log(req.body);
    db.Exercise.create(req.body)
    .then(({_id}) => db.Workout.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id) }, {$push: {exercise: _id}}, {new: true}))
    .then(dbUser => {
        res.json(dbUser);
    })
    .catch(err => {
        res.json(err);
    })
})


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });