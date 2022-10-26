import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShiftBox from "./components/ShiftBox";
import api from "../../utils/api";
import ResultBox from "./components/ResultBox";

export default function ShiftsPage() {
  const [shifts, setShifts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [result, setResult] = useState({
    overlapMinutes: "",
    maxMinutes: "",
    doesExceed: "",
  });

  useEffect(() => {
    api()
      .get("/shifts")
      .then((res) => setShifts(res?.data?.shifts ?? []))
      .catch((err) => console.log(err));
  }, []);

  const onClick = (shiftId) => {
    if (selectedIds.includes(shiftId))
      setSelectedIds(selectedIds.filter((id) => id !== shiftId));
    else if (selectedIds.length < 2) setSelectedIds([...selectedIds, shiftId]);
  };

  const onSubmit = () => {
    api()
      .get("/shifts/check-overlap", { params: { selectedIds } })
      .then((res) => setResult(res?.data?.result))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Link to="/">Back</Link>
      <div className="shift-page-header">
        <ResultBox
          result={result}
          isSubmitable={selectedIds.length === 2}
          onSubmit={onSubmit}
        />
      </div>
      <div className="shift-box-container">
        {shifts.map((shift) => (
          <ShiftBox
            key={shift.shiftId}
            shift={shift}
            isSelected={selectedIds.includes(shift.shiftId)}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}
