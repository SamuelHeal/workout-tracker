const router = require('express').Router();
const db = require('../../models');

router.get("/", (req, res) => {
    db.Workout.aggregate([
        {
          $addFields: {
            totalDuration: { $sum: "$exercises.duration"},
          },
        },
      ])
      .then((workoutDB) => {
        res.json(workoutDB);
      })
      .catch((err) => {
        res.json(err);
      });
  });

router.get("/range", (req, res) => {
    db.Workout.aggregate([
        {
          $addFields: {
            totalDuration: { $sum: "$exercises.duration"},
          },
        },
      ])
      .limit(7)
      .then(workoutDB => {
        res.json(workoutDB);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  


module.exports = router;