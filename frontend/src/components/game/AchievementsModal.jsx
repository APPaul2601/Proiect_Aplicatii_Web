// frontend/src/components/game/AchievementsModal.jsx
import React from "react";

export default function AchievementsModal({ open, onClose, achievements = [], loading }) {
  if (!open) return null;
  // Debug: log the achievements data
  console.log("[AchievementsModal] Achievements received:", achievements);
  // Sort: unlocked first, then locked
  const sorted = [...achievements].sort((a, b) => (b.unlocked ? 1 : 0) - (a.unlocked ? 1 : 0));
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Achievements</h2>
        <button style={styles.closeBtn} onClick={onClose}>X</button>
        {loading ? (
          <div style={{textAlign:'center', color:'#888', margin:'20px 0'}}>Loading achievements...</div>
        ) : sorted.length === 0 ? (
          <div style={{textAlign:'center', color:'#888', margin:'20px 0'}}>No achievements found.</div>
        ) : (
          <ul style={styles.list}>
            {sorted.map((a) => (
              <li key={a.type} style={{
                ...styles.item,
                filter: a.unlocked ? 'none' : 'grayscale(1) opacity(0.5)',
                background: a.unlocked ? "#d4ffd4" : "#eee",
                border: a.unlocked ? '2px solid #27ae60' : '1px solid #ccc',
                transition: 'filter 0.2s, background 0.2s, border 0.2s',
                position: 'relative',
              }}>
                <strong>{a.name}</strong>
                <div>{a.description}</div>
                <div style={{fontSize:12, color:a.unlocked?"green":"#888"}}>
                  {a.unlocked ? "Unlocked" : "Locked"}
                </div>
                {!a.unlocked && (
                  <span style={{
                    position: 'absolute',
                    top: 8,
                    right: 12,
                    fontSize: 18,
                    color: '#aaa',
                  }}>🔒</span>
                )}
              </li>
            ))}
          </ul>
        )}
        <pre style={{fontSize:10, color:'#888', marginTop:16, maxHeight:100, overflow:'auto'}}>
          {JSON.stringify(achievements, null, 2)}
        </pre>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.4)", zIndex: 1000
  },
  modal: {
    background: "#fff", borderRadius: 8, padding: 24, maxWidth: 400, margin: "60px auto", position: "relative"
  },
  closeBtn: {
    position: "absolute", top: 8, right: 8, background: "#eee", border: "none", borderRadius: 4, cursor: "pointer", fontWeight: "bold"
  },
  list: { listStyle: "none", padding: 0 },
  item: { margin: "12px 0", padding: 12, borderRadius: 6, border: "1px solid #ccc" }
};
