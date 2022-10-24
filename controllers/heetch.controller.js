const Heetch = require("../models/heetch");

const { generator } = require("../modules/generator");

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
  Uber.deleteMany().then((data) => {
    if (data.deletedCount > 0) {
      res.json({
        result: true,
        message: `${data.deletedCount} uber trips deleted from database.`,
      });
    } else {
      res.json({ result: false, error: "Nothing to delete" });
    }
  });
};

module.exports = { postGenerate, deleteAll };
