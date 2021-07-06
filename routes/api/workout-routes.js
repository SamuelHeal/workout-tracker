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
      .sort({ _id: -1 })
      .limit(7)
      .then(workoutDB => {
        res.json(workoutDB);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

router.post("/", ({ body }, res) => {
    db.Workout.create(body)
    .then(workoutDB => {
        res.json(workoutDB);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.put("/:id", ({ params, body }, res) => {
    db.Workout.findOneAndUpdate(
      { _id: params.id },
      { $push: { exercises: body } },
      { new: true }
    )
      .then((workoutDB) => {
        res.json(workoutDB);
      })
      .catch((err) => {
        res.json(err);
      });
  });



module.exports = router;