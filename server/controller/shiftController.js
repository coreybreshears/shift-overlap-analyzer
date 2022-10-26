const { Op } = require("sequelize");
const { Shift, Facility } = require("../models");
const { checkShiftOverlap } = require("../utils/overlapChecker");

function getAllShifts(req, res) {
  Shift.findAll({ include: [Facility] })
    .then((shifts) => {
      return res.status(200).json({ shifts });
    })
    .catch((err) => {
      return res.status(400).json({});
    });
}

function checkOverlapShifts(req, res) {
  const { selected_ids: selectedIds } = req.query;
  if (selectedIds.length !== 2) return res.status(400).json({});

  Shift.findAll({
    where: {
      shiftId: {
        [Op.in]: selectedIds,
      },
    },
    raw: true,
  })
    .then((shifts) => {
      return res.status(200).json({ result: checkShiftOverlap(shifts) });
    })
    .catch((err) => {
      return res.status(400).json({});
    });
}

module.exports = {
  getAllShifts,
  checkOverlapShifts,
};
