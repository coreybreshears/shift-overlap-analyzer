import { Routes, Route } from "react-router-dom";
import MainPage from "./main";
import ShiftsPage from "./shifts";
import QuriesPage from "./queries";

export default function MainRouter() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/shifts" element={<ShiftsPage />} />
        <Route path="/queries" element={<QuriesPage />} />
      </Routes>
    </div>
  );
}
