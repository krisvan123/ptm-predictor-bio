import React from "react";

export default function About() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1>Tentang Model</h1>
        <p>Arsitektur sistem, dataset, dan spesifikasi teknis dari model 1D-CNN untuk prediksi Post-Translational Modification.</p>
      </div>

      <div className="card">
        <h2 className="mb-4">Post-Translational Modification (PTM)</h2>
        <p>
          <strong>PTM</strong> adalah perubahan kimiawi pada protein setelah proses translasi oleh ribosom.
          Fokus utama dari model ini adalah <strong>Fosforilasi</strong> — yaitu penambahan gugus fosfat
          pada residu asam amino tertentu (dalam hal ini, Serine).
        </p>
        <p>
          Proses fosforilasi berfungsi layaknya <em>sakelar biologis</em> yang mengatur komunikasi dan sinyal antar sel. 
          Mutasi atau kesalahan pada proses ini sangat berkaitan dengan berbagai penyakit degeneratif dan pembentukan sel kanker.
        </p>
      </div>

      <div className="card">
        <h2 className="mb-4">Pendekatan Komputasional vs Laboratorium</h2>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Metodologi</th>
                <th>Estimasi Biaya</th>
                <th>Waktu Proses</th>
                <th>Skalabilitas Skrining</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Spektrometri Massa (Lab)</strong></td>
                <td>Sangat Mahal</td>
                <td>Berhari-hari hingga mingguan</td>
                <td>Terbatas pada sampel kecil</td>
              </tr>
              <tr style={{ backgroundColor: "var(--primary-light)" }}>
                <td style={{ color: "var(--primary-color)", fontWeight: "600" }}>Deep Learning (Model Ini)</td>
                <td>Efisien (Komputasi Dasar)</td>
                <td>Instan (Hitungan Detik)</td>
                <td>Masif (Ribuan protein sekaligus)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-2">
        <div className="card" style={{ margin: 0 }}>
          <h2 className="mb-6">Arsitektur 1D-CNN</h2>
          <div style={{ 
            fontFamily: "var(--font-inter), monospace", 
            fontSize: "0.875rem", 
            lineHeight: "1.8", 
            background: "var(--bg-primary)", 
            padding: "2rem", 
            borderRadius: "8px", 
            border: "1px solid var(--border-color)",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)"
          }}>
            <div style={{ fontWeight: "600", color: "var(--text-primary)" }}>Input: Matriks One-Hot (31 × 20)</div>
            <div style={{ color: "var(--text-muted)", textAlign: "center", margin: "4px 0" }}>↓</div>
            <div>Conv1D (64 filter, kernel=3) + ReLU</div>
            <div style={{ color: "var(--text-muted)", textAlign: "center", margin: "4px 0" }}>↓</div>
            <div>MaxPooling1D (pool=2)</div>
            <div style={{ color: "var(--text-muted)", textAlign: "center", margin: "4px 0" }}>↓</div>
            <div>Conv1D (128 filter, kernel=3) + ReLU</div>
            <div style={{ color: "var(--text-muted)", textAlign: "center", margin: "4px 0" }}>↓</div>
            <div>MaxPooling1D (pool=2)</div>
            <div style={{ color: "var(--text-muted)", textAlign: "center", margin: "4px 0" }}>↓</div>
            <div>Flatten Layers</div>
            <div style={{ color: "var(--text-muted)", textAlign: "center", margin: "4px 0" }}>↓</div>
            <div>Dense (64 units) + ReLU + Dropout (0.3)</div>
            <div style={{ color: "var(--text-muted)", textAlign: "center", margin: "4px 0" }}>↓</div>
            <div>Dense (1 unit) + Sigmoid Activation</div>
            <div style={{ color: "var(--text-muted)", textAlign: "center", margin: "4px 0" }}>↓</div>
            <div style={{ fontWeight: "600", color: "var(--primary-color)", marginTop: "8px" }}>Output: Probabilitas Biner [0, 1]</div>
          </div>
        </div>

        <div className="flex-col gap-6" style={{ display: "flex" }}>
          <div className="card" style={{ flex: 1, margin: 0 }}>
            <h3 className="mb-4">Spesifikasi Model</h3>
            <ul style={{ listStyleType: "none", padding: 0, color: "var(--text-secondary)", lineHeight: "2.2" }}>
              <li style={{ borderBottom: "1px solid var(--border-light)", paddingBottom: "8px" }}><strong style={{ display: "inline-block", width: "140px" }}>Total Parameter</strong> 86,081 param</li>
              <li style={{ borderBottom: "1px solid var(--border-light)", padding: "8px 0" }}><strong style={{ display: "inline-block", width: "140px" }}>Dimensi Input</strong> (31, 20) — Konteks ±15 AA</li>
              <li style={{ borderBottom: "1px solid var(--border-light)", padding: "8px 0" }}><strong style={{ display: "inline-block", width: "140px" }}>Optimizer</strong> Adam Optimizer</li>
              <li style={{ paddingTop: "8px" }}><strong style={{ display: "inline-block", width: "140px" }}>Fungsi Loss</strong> Binary Cross-Entropy</li>
            </ul>
          </div>
          
          <div className="card" style={{ flex: 1, margin: 0 }}>
            <h3 className="mb-4">Sumber Dataset</h3>
            <ul style={{ listStyleType: "none", padding: 0, color: "var(--text-secondary)", lineHeight: "2.2" }}>
              <li style={{ borderBottom: "1px solid var(--border-light)", paddingBottom: "8px" }}><strong style={{ display: "inline-block", width: "140px" }}>Basis Data</strong> dbPTM</li>
              <li style={{ borderBottom: "1px solid var(--border-light)", padding: "8px 0" }}><strong style={{ display: "inline-block", width: "140px" }}>Total Entri</strong> 1,615,054 sekuens</li>
              <li style={{ borderBottom: "1px solid var(--border-light)", padding: "8px 0" }}><strong style={{ display: "inline-block", width: "140px" }}>Sampel Latih</strong> 250,000 baris</li>
              <li style={{ paddingTop: "8px" }}><strong style={{ display: "inline-block", width: "140px" }}>Distribusi Kelas</strong> 4 Negatif : 1 Positif</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12" style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.875rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
        Pengembangan Oleh Kelompok 5 — Final Project Bioinformatika
      </div>
    </div>
  );
}
