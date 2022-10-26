const ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_MINUTE = 60 * 1000;

function refineTime(shiftTime) {
  const shiftTimeClone = { ...shiftTime };
  if (shiftTimeClone.start > shiftTimeClone.end)
    shiftTimeClone.end = new Date(shiftTimeClone.end.getTime() + ONE_DAY);

  return shiftTimeClone;
}

function getOverlapTime(shiftTimeOne, shiftTimeTwo) {
  const maxStartTime = Math.max(
    shiftTimeOne.start.getTime(),
    shiftTimeTwo.start.getTime()
  );
  const minEndTime = Math.min(
    shiftTimeOne.end.getTime(),
    shiftTimeTwo.end.getTime()
  );

  return Math.max(Math.round((minEndTime - maxStartTime) / ONE_MINUTE), 0);
}

function checkShiftOverlap([shiftOne, shiftTwo]) {
  const shiftOneTime = refineTime({
    start: new Date(`${shiftOne.shiftDate} ${shiftOne.startTime}`),
    end: new Date(`${shiftOne.shiftDate} ${shiftOne.endTime}`),
  });
  const shiftTwoTime = refineTime({
    start: new Date(`${shiftTwo.shiftDate} ${shiftTwo.startTime}`),
    end: new Date(`${shiftTwo.shiftDate} ${shiftTwo.endTime}`),
  });
  const maxMinutes = shiftOne.facilityId === shiftTwo.facilityId ? 30 : 0;
  const overlapMinutes = getOverlapTime(shiftOneTime, shiftTwoTime);

  return {
    overlapMinutes,
    maxMinutes,
    doesExceed: overlapMinutes > maxMinutes,
  };
}

module.exports = { checkShiftOverlap };
