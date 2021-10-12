const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },

  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "Enter type of exercise",
      },

      name: {
        type: String,
        trim: true,
        required: "Enter name of exercise",
      },

      duration: {
        type: Number,
        trim: true,
        required: "Enter duration in minutes",
      },

      weight: {
        type: Number,
        trim: true,
      },

      reps: {
        type: Number,
        trim: true,
      },

      sets: {
        type: Number,
        trim: true,
      },

      distance: {
        type: Number,
        trim: true,
      },
    },
  ],
});
