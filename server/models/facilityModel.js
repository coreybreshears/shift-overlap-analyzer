const { DataTypes } = require("sequelize");
const db = require("../db");

const Facility = db.define(
  "facilities",
  {
    facilityId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "facility_id",
    },
    facilityName: {
      type: DataTypes.STRING,
      field: "facility_name",
    },
  },
  { timestamps: false }
);

module.exports = Facility;
