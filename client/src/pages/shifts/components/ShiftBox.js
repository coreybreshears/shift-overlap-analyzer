import { convertTo12Format } from "../../../utils/dateUtil";

export default function ShiftBox({ shift, isSelected, onClick }) {
  return (
    <div
      className={`shift-box ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(shift.shiftId)}
    >
      <p>{shift?.facility?.facilityName}</p>
      <p>{shift?.shiftDate}</p>
      <p>
        {convertTo12Format(shift?.startTime)} -{" "}
        {convertTo12Format(shift?.endTime)}
      </p>
    </div>
  );
}
