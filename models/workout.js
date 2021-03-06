const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    name: {
        type: String,
        unique: true
    },
    date: {
        type: Date, 
        required: true, 
        default: Date.now

    },
    exercise: [
        {
            type: Schema.Types.ObjectId,
            ref: "Exercise"
        }
    ]
   
});

const Workout = mongoose.model("Workout", UserSchema);

module.exports = Workout;
