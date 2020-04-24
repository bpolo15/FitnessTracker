const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema ({

  
    type: {
        type: String,
        
    },
    name:{
        type: String,
      
    },
    distance: {
        type: String,
    },
    duration: {
        type: Number,
        
    },
    weight: {
        type: Number
    },
    reps: {
        type: Number
    },
    sets: {
        type: Number
    }


});

const Exercise = mongoose.model("Exercise", WorkoutSchema);

module.exports = Exercise;