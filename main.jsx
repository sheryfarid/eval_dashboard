import { useState } from "react";
import { createRoot } from "react-dom/client";
import AISystemDesign from "./ai-system-design.jsx";
import EvalDashboard from "./evaluation-dashboard.jsx";

function App() {
  const [tab, setTab] = useState("design");

  return (
    <div>
      <div className="app-tabs">
        <button className={tab === "design" ? "active" : ""} onClick={() => setTab("design")}>
          AI System Design
        </button>
        <button className={tab === "dashboard" ? "active" : ""} onClick={() => setTab("dashboard")}>
          Evaluation Dashboard
        </button>
      </div>
      <div className="panel">
        {tab === "design" && <AISystemDesign />}
        {tab === "dashboard" && <EvalDashboard />}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
