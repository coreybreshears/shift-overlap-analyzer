export default function ResultBox({ result, isSubmitable, onSubmit }) {
  return (
    <div className="shift-overlap-result-box">
      <div>
        <div className="shift-overlap-result-word">
          Overlap Minutes: &nbsp;{result.overlapMinutes}
        </div>
        <div className="shift-overlap-result-word">
          Max Overlap Threshold: &nbsp;{result.maxMinutes}
        </div>
        <div className="shift-overlap-result-word">
          Exceeds Overlap Threshold: &nbsp;
          {result.doesExceed === true
            ? "True"
            : result.doesExceed === false
            ? "False"
            : ""}
        </div>
      </div>
      <div>
        <button
          className="shift-submit-button"
          onClick={onSubmit}
          disabled={!isSubmitable}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
