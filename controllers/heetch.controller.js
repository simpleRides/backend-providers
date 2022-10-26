const Heetch = require("../models/heetch");
const moment = require("moment");

const { generator } = require("../modules/generator");
const { checkBody } = require("../modules/checkBody");

const postGenerate = (req, res) => {
  generator(req.params.num)
    .then((res) => {
      res.map((data) => {
        const newHeetch = new Heetch({
          course_id: data.course_id,
          status: data.status,
          coordinates: data.coordinates,
          price: data.price,
          pickupCoordinates: data.pickupCoordinates,
          clientNote: data.clientNote,
          markup: data.markup,
          date: data.date,
          distance: data.distance,
          travelTime: data.travelTime,
        });

        newHeetch.save();
      });
    })
    .then(() => {
      res.json({
        result: true,
        message: `${req.params.num} trips was generated.`,
      });
    });
};

const deleteAll = (req, res) => {
  Heetch.deleteMany().then((data) => {
    if (data.deletedCount > 0) {
      res.json({
        result: true,
        message: `${data.deletedCount} Heetch trips deleted from database.`,
      });
    } else {
      res.json({ result: false, error: "Nothing to delete" });
    }
  });
};

const getRideById = (req, res) => {
  Heetch.find({ course_id: req.body.id }).then((data) => {
    if (data[0]) {
      res.json({ result: true, data });
    } else {
      res.json({ result: false, error: "No course with the id specified." });
    }
  });
};

const getAllRides = (req, res) => {
  Heetch.find({}).then((data) => {
    if (data[0]) {
      res.json({ result: true, data });
    } else {
      res.json({ result: false, error: "No courses in the database." });
    }
  });
};

const putRidesTaken = (req, res) => {
  if (!checkBody(req.body, ["course_id", "driver_id"])) {
    res.json({
      result: false,
      error: "Missing course (course_id) or driver (driver_id) ID.",
    });
    return;
  }

  Heetch.findOne({ course_id: req.body.course_id }).then((data) => {
    if (data.status !== "Pending") {
      res.json({
        result: false,
        error:
          "Sorry, this course has already been taken, please refresh to find another one.",
      });
      return;
    } else {
      Heetch.updateOne(
        { course_id: req.body.course_id },
        { driver: req.body.driver_id, status: "Taken" }
      ).then(() => {
        Heetch.findOne({ course_id: req.body.course_id }).then((data) =>
          res.json({ result: true, data })
        );
      });
    }
  });
};

const postRidesBySettings = (req, res) => {
  Heetch.find({
    clientNote: {
      $gte: req.body.clientNoteMin || 0,
      $lte: req.body.clientNoteMax || 5,
    },
    price: { $gte: req.body.priceMin || 0, $lte: req.body.priceMax || 100000 },
    markup: { $gte: req.body.markupMin || 1, $lte: req.body.markupMax || 3 },
    distance: {
      $gte: req.body.distanceMin || 0,
      $lte: req.body.distanceMax || 100000,
    },
    travelTime: {
      $gte: req.body.travelTimeMin || 0,
      $lte: req.body.travelTimeMax || 1000000,
    },
  }).then((data) => {
    if (data[0]) {
      res.json({ result: true, data });
    } else {
      res.json({
        result: false,
        error: "No trips founded within your preferences.",
      });
    }
  });
};

const refreshRidesStatus = (req, res) => {
  Heetch.updateMany({ date: { $lte: moment() } }, { status: "Passed" }).then(
    () =>
      Heetch.find({ status: "Passed" }).then((data) =>
        res.json({ result: true, data })
      )
  );
};

module.exports = {
  postGenerate,
  deleteAll,
  getRideById,
  getAllRides,
  putRidesTaken,
  postRidesBySettings,
  refreshRidesStatus,
};
