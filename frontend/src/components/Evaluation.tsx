import React from "react";

export default function Evaluation() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1>Evaluasi Model 1D-CNN</h1>
        <p>Ringkasan performa pengujian pada <strong>test set</strong> (50.000 sampel, merepresentasikan 20% total data).</p>
      </div>

      <h3 className="mb-4">Metrik Utama</h3>
      <div className="grid-4 mb-8">
        <div className="metric-card">
          <div className="metric-value" style={{ color: "var(--primary-color)" }}>0.9513</div>
          <div className="metric-label">AUC-ROC</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">0.7215</div>
          <div className="metric-label">Matthews Corr (MCC)</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">0.65</div>
          <div className="metric-label">Precision PTM</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">0.95</div>
          <div className="metric-label">Recall PTM</div>
        </div>
      </div>

      <div className="grid-2 mb-8" style={{ alignItems: "start" }}>
        <div className="card" style={{ margin: 0, height: "100%" }}>
          <h3 className="mb-6">Confusion Matrix</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr", gap: "12px", textAlign: "center" }}>
            {/* Header */}
            <div></div>
            <div style={{ fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Prediksi Negatif</div>
            <div style={{ fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Prediksi Positif</div>
            
            {/* Row 1 */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "10px", fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Label Negatif</div>
            <div style={{ background: "var(--bg-primary)", padding: "2rem 1rem", borderRadius: "8px", border: "1px solid var(--border-color)", transition: "all 0.2s" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "var(--text-primary)" }}>34,800</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "4px" }}>True Negative</div>
            </div>
            <div style={{ background: "rgba(166, 144, 124, 0.05)", padding: "2rem 1rem", borderRadius: "8px", border: "1px solid var(--border-color)", transition: "all 0.2s" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "var(--primary-color)" }}>5,200</div>
              <div style={{ fontSize: "0.75rem", color: "var(--primary-color)", opacity: 0.8, marginTop: "4px" }}>False Positive</div>
            </div>

            {/* Row 2 */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "10px", fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Label Positif</div>
            <div style={{ background: "rgba(166, 144, 124, 0.05)", padding: "2rem 1rem", borderRadius: "8px", border: "1px solid var(--border-color)", transition: "all 0.2s" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "var(--primary-color)" }}>500</div>
              <div style={{ fontSize: "0.75rem", color: "var(--primary-color)", opacity: 0.8, marginTop: "4px" }}>False Negative</div>
            </div>
            <div style={{ background: "rgba(166, 144, 124, 0.15)", padding: "2rem 1rem", borderRadius: "8px", border: "1px solid var(--primary-color)", transition: "all 0.2s" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "var(--text-primary)" }}>9,500</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "4px" }}>True Positive</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ margin: 0, height: "100%" }}>
          <h3 className="mb-4">Receiver Operating Characteristic</h3>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "1rem 0" }}>
            {/* Elegant SVG ROC Curve */}
            <svg width="100%" height="280" viewBox="-30 -10 320 320" style={{ maxWidth: "300px", overflow: "visible" }}>
              {/* Grid */}
              <path d="M 0 0 L 280 0 M 0 70 L 280 70 M 0 140 L 280 140 M 0 210 L 280 210 M 0 280 L 280 280" stroke="var(--border-color)" strokeWidth="1" fill="none" />
              <path d="M 0 0 L 0 280 M 70 0 L 70 280 M 140 0 L 140 280 M 210 0 L 210 280 M 280 0 L 280 280" stroke="var(--border-color)" strokeWidth="1" fill="none" />
              
              {/* Axes */}
              <line x1="0" y1="280" x2="280" y2="280" stroke="var(--text-secondary)" strokeWidth="2" />
              <line x1="0" y1="0" x2="0" y2="280" stroke="var(--text-secondary)" strokeWidth="2" />
              
              {/* Random Classifier Line */}
              <line x1="0" y1="280" x2="280" y2="0" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="5,5" />
              
              {/* ROC Curve Path (AUC ~0.95) */}
              <path d="M 0 280 Q 20 50 100 20 T 280 0" stroke="var(--primary-color)" strokeWidth="3" fill="none" style={{ filter: "drop-shadow(0 4px 6px rgba(166,144,124,0.3))" }} />
              <path d="M 0 280 Q 20 50 100 20 T 280 0 L 280 280 Z" fill="var(--primary-color)" fillOpacity="0.05" />
              
              {/* Labels */}
              <text x="140" y="315" fill="var(--text-secondary)" fontSize="12" textAnchor="middle" fontWeight="500">False Positive Rate</text>
              <text x="-140" y="-20" transform="rotate(-90)" fill="var(--text-secondary)" fontSize="12" textAnchor="middle" fontWeight="500">True Positive Rate</text>
              
              <text x="-5" y="285" fill="var(--text-muted)" fontSize="10" textAnchor="end">0.0</text>
              <text x="-5" y="5" fill="var(--text-muted)" fontSize="10" textAnchor="end">1.0</text>
              <text x="0" y="295" fill="var(--text-muted)" fontSize="10" textAnchor="middle">0.0</text>
              <text x="280" y="295" fill="var(--text-muted)" fontSize="10" textAnchor="middle">1.0</text>
              
              {/* Legend */}
              <rect x="140" y="220" width="130" height="40" fill="var(--bg-surface)" stroke="var(--border-color)" rx="4" />
              <line x1="148" y1="230" x2="168" y2="230" stroke="var(--primary-color)" strokeWidth="3" />
              <text x="175" y="233" fill="var(--text-primary)" fontSize="10" fontWeight="500">Model (AUC=0.951)</text>
              <line x1="148" y1="245" x2="168" y2="245" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="175" y="248" fill="var(--text-primary)" fontSize="10">Random (AUC=0.5)</text>
            </svg>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="mb-4">Classification Report</h3>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Kelas Target</th>
                <th>Precision</th>
                <th>Recall</th>
                <th>F1-Score</th>
                <th>Support</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Bukan PTM (0)</strong></td>
                <td>0.99</td>
                <td>0.87</td>
                <td>0.92</td>
                <td>40,000</td>
              </tr>
              <tr>
                <td><strong>Situs PTM (1)</strong></td>
                <td>0.65</td>
                <td>0.95</td>
                <td>0.77</td>
                <td>10,000</td>
              </tr>
              <tr style={{ borderTop: "2px solid var(--border-color)", backgroundColor: "var(--bg-primary)" }}>
                <td><strong>Macro Average</strong></td>
                <td>0.82</td>
                <td>0.91</td>
                <td>0.85</td>
                <td>50,000</td>
              </tr>
              <tr style={{ backgroundColor: "var(--bg-primary)" }}>
                <td><strong>Weighted Average</strong></td>
                <td>0.92</td>
                <td>0.89</td>
                <td>0.89</td>
                <td>50,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
