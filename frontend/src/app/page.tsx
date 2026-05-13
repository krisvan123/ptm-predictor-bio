"use client";

import React, { useState } from "react";
import Predictor from "../components/Predictor";
import Evaluation from "../components/Evaluation";
import About from "../components/About";

export default function Home() {
  const [activeTab, setActiveTab] = useState("predict");
  const [threshold, setThreshold] = useState(0.70);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-title">
            PTM Predictor
          </div>
          <div className="sidebar-subtitle">Deep Learning Model</div>
        </div>

        <ul className="nav-menu mb-8">
          <li
            className={`nav-item ${activeTab === "predict" ? "active" : ""}`}
            onClick={() => setActiveTab("predict")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            Prediksi PTM
          </li>
          <li
            className={`nav-item ${activeTab === "evaluate" ? "active" : ""}`}
            onClick={() => setActiveTab("evaluate")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            Evaluasi Model
          </li>
          <li
            className={`nav-item ${activeTab === "about" ? "active" : ""}`}
            onClick={() => setActiveTab("about")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            Tentang Model
          </li>
        </ul>

        {/* Settings (only relevant for Predictor) */}
        {activeTab === "predict" && (
          <div className="animate-fade-in">
            <div className="divider" style={{ margin: "0 0 2rem 0" }} />
            <label className="input-label mb-4" style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Threshold</span>
              <span style={{ color: "var(--primary-color)", fontWeight: "600" }}>{threshold.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0.1"
              max="0.95"
              step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
            />
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "1rem", lineHeight: "1.6" }}>
              Skor di atas threshold ditetapkan sebagai situs PTM. Threshold optimal adalah <strong>0.70</strong>.
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === "predict" && <Predictor threshold={threshold} />}
        {activeTab === "evaluate" && <Evaluation />}
        {activeTab === "about" && <About />}
      </main>
    </div>
  );
}
