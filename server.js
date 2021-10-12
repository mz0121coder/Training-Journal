const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const db = require("./models");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/wt-1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  userFindAndModify: false,
});

// html routes
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

// Routes to read exercises for last 7 days
app.get("/api/workouts", async (req, res) => {
  const workouts = await db.Workout.aggregate([
    { $addFields: { totalDuration: { $sum: "$exercises.duration" } } },
  ]);
  res.json(workouts);
});

// Routes to add & update exercises
app.post("/api/workouts", async (req, res) => {
  db.Workout.create(req.body).then((newWorkout) => res.json(newWorkout));
});

app.put("/api/workouts/:id", async (req, res) => {
  db.Workout.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { exercises: req.body } },
    { new: true }
  ).then((updatedList) => res.json(updatedList));
});
