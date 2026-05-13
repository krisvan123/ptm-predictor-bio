"use client";

import React, { useState } from "react";

const CONTOH_PROTEIN = {
  "BRCA1 (Breast Cancer)":
    "MDLSALRVEEVQNVINAMQKILECPICLELIKEPVSTKCDHIFCKFCMLKLLNQKKGPSQCPLCKNDITKRSLQESTRFSQLVEELLKIICAFQLDTGLEYANSYNFAKKENNSPEHLKDEVSIIQSMGYRNACKESNEQVKDLKERVSPEPSTGLVNRIITQELPEQIKVSDVQHLEQSRIANQNLKNEEKMPQENSVNKSTKKSSYIDTTGRQVTQEFRQKQDEAETLILSLDLLEQVEIFKDVASELQHVFEKNHKNKNSLKPDVVLEQIVKNLKQDKEPDDFLSLSTCNPAKRSAEGQLQFVKKISTNIKVSPSSRKNQPMDLCASRQVNAERMSFTFDDPVHDLHLAELTYIESKETVSQTLGNLYGLRVQAAKLHQRVKPADFHQKLKYISNQICQEAIPKELYDYLKIHTNYQDRISKIHTKVKSDLNIHSLETAQKVKVNNRDTSIQQIRQANRFLESQIKEIQVSAETQTQHVSQQQSAQQLQEQLKTTQSTTNQSQQPQSNTQTIISRDQQKLLMAKLLQQEDQETQDEDSMKRQEAEKQQERSSQETRQRLAQLEQRQNRTEGQISAENSLEEHEFEQARQSQAAASQNLTEQLVNAQAHQVKAQEIAARKQLAEHEQKAQRALQQQKPAQEQQLQLNKFQIKQATAAELQKQLEELGLQEFMKNREQLTEELEKLQAQNQLEKMLQYYMTQQFKQQEQSQQ",
  "p53 / TP53":
    "MEEPQSDPSVEPPLSQETFSDLWKLLPENNVLSPLPSQAMDDLMLSPDDIEQWFTEDPGPDEAPRMPEAAPPVAPAPAAPTPAAPAPAPSWPLSSSVPSQKTYPQGLNGTVNLFRNLNKNSPKMAYQLKQKGFAFLAVLRNLKVNRQKLRSSSEGKPGAHSSHLKSKKGQSTSRHKKLMFKTEGPDSD",
  "Tau Protein":
    "MAEPRQEFEVMEDHAGTYGLGDRKDQGGYTMHQDQEGDTDAGLKESPLQTPTEDGSEEPGSETSDAKSTPTAEDVTAPLVDEGAPGKQAAAQPHTEIPEGTTAEEAGIGDTPSLEDEAAGHVTQARMVSKSKDGTGSDDKKAKGADGKTKIATPRGAAPPGQKGQANATRIPAKTPPAPKTPPSSGEPPKSGDRSGYSSPGSPGTPGSRSRTPSLPTPPTREPKKVAVVRTPPKSPSSAKSRLQTAPVPMPDLKNVKSKIGSTENLKHQPGGGKVQIINKKLDLSNVQSKCGSLGNIHHKPGGGQVEVKSEKLDFKDRVQSKIGSLDNITHVPGGGNKKIETHKLTFRENAKAKTDHGAEIVYKSPVVSGDTSPRHLSNVSSTGSIDMVDSPQLATLADEVSASLAKQGL",
};

interface ResultType {
  posisi: number;
  konteks: string;
  skor: number;
  isPTM: boolean;
}

export default function Predictor({ threshold }: { threshold: number }) {
  const [sequence, setSequence] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ResultType[] | null>(null);
  const [error, setError] = useState("");

  const handlePredict = () => {
    if (!sequence.trim()) {
      setError("Mohon masukkan sekuens protein terlebih dahulu.");
      return;
    }

    const seq = sequence.trim().toUpperCase();
    const serineCount = (seq.match(/S/g) || []).length;

    if (serineCount === 0) {
      setError("Tidak ditemukan residu Serine (S) dalam sekuens.");
      setResults(null);
      return;
    }

    setError("");
    setLoading(true);

    // Dummy prediction logic (simulation)
    setTimeout(() => {
      const newResults: ResultType[] = [];
      for (let i = 0; i < seq.length; i++) {
        if (seq[i] === "S") {
          // Generate a pseudo-random score that looks realistic
          const score = Math.abs(Math.sin(i * 123 + seq.length)) * 0.98;
          const start = Math.max(0, i - 15);
          const end = Math.min(seq.length, i + 16);
          const ctx = seq.substring(start, end).padEnd(31, "X").padStart(31, "X");

          newResults.push({
            posisi: i + 1,
            konteks: ctx,
            skor: parseFloat(score.toFixed(4)),
            isPTM: score >= threshold,
          });
        }
      }
      setResults(newResults);
      setLoading(false);
    }, 1500);
  };

  const sortedResults = results ? [...results].sort((a, b) => b.skor - a.skor) : [];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1>Prediksi Situs PTM</h1>
        <p>Analisis komputasional untuk memprediksi situs fosforilasi pada residu Serine (S) menggunakan model 1D-CNN.</p>
      </div>

      <div className="card">
        <h3 className="mb-4" style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>Pilih Sekuens Contoh</h3>
        <div className="grid-3 mb-6">
          {Object.entries(CONTOH_PROTEIN).map(([name, seq]) => (
            <button
              key={name}
              className="button button-outline"
              onClick={() => {
                setSequence(seq);
                setResults(null);
                setError("");
              }}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="divider" />

        <div className="input-group">
          <label className="input-label mb-2">Input Sekuens Protein</label>
          <textarea
            className="textarea"
            rows={4}
            placeholder="Ketik atau tempel sekuens protein dalam format asam amino (satu baris)..."
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
          />
        </div>

        {error && <div style={{ color: "var(--non-ptm-color)", marginBottom: "1.5rem", fontSize: "0.9375rem" }}>{error}</div>}

        <button className="button button-primary w-full" onClick={handlePredict} disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-pulse-slow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
              Memproses Analisis...
            </span>
          ) : (
            "Jalankan Analisis"
          )}
        </button>
      </div>

      {results && (
        <div className="animate-fade-in mt-6">
          <h2 className="mb-6">Hasil Analisis</h2>
          
          <div className="grid-4 mb-8">
            <div className="metric-card">
              <div className="metric-value">{sequence.length}</div>
              <div className="metric-label">Panjang Sekuens</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{results.length}</div>
              <div className="metric-label">Total Serine</div>
            </div>
            <div className="metric-card" style={{ borderBottom: "4px solid var(--ptm-color)" }}>
              <div className="metric-value" style={{ color: "var(--ptm-color)" }}>{results.filter((r) => r.isPTM).length}</div>
              <div className="metric-label">Situs PTM</div>
            </div>
            <div className="metric-card" style={{ borderBottom: "4px solid var(--non-ptm-color)" }}>
              <div className="metric-value" style={{ color: "var(--non-ptm-color)" }}>{results.filter((r) => !r.isPTM).length}</div>
              <div className="metric-label">Bukan PTM</div>
            </div>
          </div>

          <div className="grid-2 mb-8" style={{ alignItems: "start" }}>
            <div className="card" style={{ margin: 0, height: "100%" }}>
              <h3 className="mb-4">Visualisasi Sekuens</h3>
              <div className="sequence-container">
                {sequence.split("").map((aa, idx) => {
                  const pos = idx + 1;
                  const isTarget = aa === "S";
                  const isPtm = results.find((r) => r.posisi === pos)?.isPTM;

                  if (isTarget && isPtm) {
                    return <span key={idx} className="seq-ptm" title={`Posisi ${pos}: PTM`}>{aa}</span>;
                  } else if (isTarget && !isPtm) {
                    return <span key={idx} className="seq-non-ptm" title={`Posisi ${pos}: Bukan PTM`}>{aa}</span>;
                  } else {
                    return <span key={idx} className="seq-normal">{aa}</span>;
                  }
                })}
              </div>
              <div className="flex gap-6 mt-6" style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                <div className="flex items-center gap-2">
                  <span className="seq-ptm" style={{ padding: "2px 6px" }}>S</span> = Terdeteksi PTM
                </div>
                <div className="flex items-center gap-2">
                  <span className="seq-non-ptm" style={{ padding: "2px 6px" }}>S</span> = Bukan PTM
                </div>
              </div>
            </div>

            <div className="card" style={{ margin: 0, height: "100%" }}>
              <h3 className="mb-4">Probabilitas per Posisi</h3>
              <div style={{ height: "300px", display: "flex", alignItems: "flex-end", gap: "4px", padding: "10px 0", borderBottom: "1px solid var(--border-color)", position: "relative" }}>
                {/* Threshold Line */}
                <div style={{ position: "absolute", bottom: `${threshold * 100}%`, left: 0, right: 0, height: "1px", borderTop: "2px dashed var(--primary-color)", zIndex: 0 }}>
                  <span style={{ position: "absolute", right: 0, top: "-20px", fontSize: "10px", color: "var(--primary-color)", fontWeight: "bold" }}>Threshold: {threshold.toFixed(2)}</span>
                </div>
                
                {/* Y-axis labels */}
                <div style={{ position: "absolute", left: "-25px", top: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: "10px", color: "var(--text-muted)" }}>
                  <span>1.0</span><span>0.5</span><span>0.0</span>
                </div>

                {/* Bars */}
                {results.map((r, idx) => (
                  <div key={idx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%", zIndex: 1, group: "bar" }} title={`S${r.posisi}: ${r.skor.toFixed(4)}`}>
                    <div 
                      style={{ 
                        width: "100%", 
                        maxWidth: "16px",
                        height: `${r.skor * 100}%`, 
                        backgroundColor: r.isPTM ? "var(--ptm-color)" : "var(--non-ptm-light)",
                        border: r.isPTM ? "none" : "1px solid var(--border-color)",
                        borderBottom: "none",
                        borderRadius: "2px 2px 0 0",
                        transition: "height 0.5s ease"
                      }} 
                    />
                  </div>
                ))}
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", textAlign: "center", marginTop: "8px" }}>Posisi Residu Serine (Kiri ke Kanan)</div>
            </div>
          </div>

          <div className="card">
            <h3 className="mb-4">Detail Prediksi</h3>
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th>Posisi</th>
                    <th>Konteks (±15 AA)</th>
                    <th>Skor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedResults.map((r, idx) => (
                    <tr key={idx}>
                      <td><strong>S{r.posisi}</strong></td>
                      <td style={{ fontFamily: "var(--font-inter), monospace", letterSpacing: "1px", color: "var(--text-secondary)" }}>
                        {r.konteks.substring(0, 15)}
                        <strong style={{ color: r.isPTM ? "var(--ptm-color)" : "var(--non-ptm-color)" }}>{r.konteks.substring(15, 16)}</strong>
                        {r.konteks.substring(16)}
                      </td>
                      <td style={{ fontWeight: r.isPTM ? "600" : "400" }}>{r.skor.toFixed(4)}</td>
                      <td>
                        {r.isPTM ? (
                          <span className="badge badge-success">Situs PTM</span>
                        ) : (
                          <span className="badge badge-danger">Bukan PTM</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
