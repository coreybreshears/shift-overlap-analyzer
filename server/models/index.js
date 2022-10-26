const Shift = require("./shiftModel");
const Facility = require("./facilityModel");

Shift.hasOne(Facility, {
  sourceKey: "facilityId",
  foreignKey: "facility_id",
});

module.exports = {
  Shift,
  Facility,
};
