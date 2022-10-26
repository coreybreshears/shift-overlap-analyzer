import { Link } from "react-router-dom";
import api from "../../utils/api";

export default function QuereisPage() {
  const runFourth = () => {
    api()
      .get("/queries/fourth")
      .then((res) => console.log(res?.data?.spots))
      .catch((err) => console.log(err));
  };

  const runFifth = () => {
    api()
      .get("/queries/fifth")
      .then((res) => console.log(res?.data?.nurses))
      .catch((err) => console.log(err));
  };

  const runSixth = () => {
    api()
      .get("/queries/sixth")
      .then((res) => console.log(res?.data?.coworkers))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Link to="/">Back</Link>
      <br />
      <button onClick={runFourth} className="m-2">
        Run query 4
      </button>
      <br />
      <button onClick={runFifth} className="m-2">
        Run query 5
      </button>
      <br />
      <button onClick={runSixth} className="m-2">
        Run query 6
      </button>
    </div>
  );
}
