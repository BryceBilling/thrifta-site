import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DSARPage from "./pages/DSARPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dsar" element={<DSARPage />} />
      </Routes>
    </BrowserRouter>
  );
}
