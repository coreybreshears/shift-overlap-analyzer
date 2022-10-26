const { DataTypes } = require("sequelize");
const db = require("../db");

const Shift = db.define(
  "question_one_shifts",
  {
    shiftId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "shift_id",
    },
    shiftDate: {
      type: DataTypes.DATE,
      field: "shift_date",
    },
    startTime: {
      type: DataTypes.TIME,
      field: "start_time",
    },
    endTime: {
      type: DataTypes.TIME,
      field: "end_time",
    },
    facilityId: {
      type: DataTypes.INTEGER,
      field: "facility_id",
    },
  },
  { timestamps: false }
);

module.exports = Shift;
