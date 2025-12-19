
// Upgrades Shop Component - Grid of available upgrades for purchase with affordability checks
// Step 1: Integrate buyUpgrade API via handler from parent
// Step 2: UI wiring for upgrade purchase (buy button, handler, disables)
// Step 3: Owned state UI (disable, show '✓ Owned', fade card)


import React from "react";

function UpgradesShop({
  upgrades = [],
  playerUpgrades = [],
  playerUnlockedUpgrades = [],
  playerResources = { gold: 0, wood: 0, stone: 0, wheat: 0 },
  clickPower = 0,
  onUpgradePurchased = () => {},
  progressPercent = 0, // <-- REQUIRED: pass player's progress percent (0-100)
}) {
  // Check if player can afford upgrade
  const canAfford = (upgrade) => {
    if (!upgrade || !upgrade.cost) return false;
    return (
      playerResources.gold >= (upgrade.cost.gold || 0) &&
      playerResources.wood >= (upgrade.cost.wood || 0) &&
      playerResources.stone >= (upgrade.cost.stone || 0) &&
      playerResources.wheat >= (upgrade.cost.wheat || 0)
    );
  };

  // Check if upgrade is already owned (no longer disables button, just for info)
  const isOwned = (upgradeType) => {
    if (!playerUpgrades) return false;
    if (playerUpgrades.length > 0 && typeof playerUpgrades[0] === "object") {
      return playerUpgrades.some((u) => u.type === upgradeType);
    }
    return playerUpgrades.includes(upgradeType);
  };

  // Check if upgrade is unlocked for this player
  const isUnlocked = (upgradeType) => {
    if (!playerUnlockedUpgrades) return false;
    return playerUnlockedUpgrades.includes(upgradeType);
  };

  // Check if upgrade is locked (not enough progress percent)
  const isLocked = (upgrade, progressPercent = 0) => {
    const requiredProgress = typeof upgrade.requiredProgressPercent === 'number' ? upgrade.requiredProgressPercent : 0;
    return progressPercent < requiredProgress;
  };

  // Handle buy button click
  const handleBuyClick = async (upgrade) => {
    if (!canAfford(upgrade)) {
      alert("Not enough resources!");
      return;
    }
    if (isLocked(upgrade, progressPercent)) {
      alert("Upgrade is locked!");
      return;
    }
    try {
      await onUpgradePurchased(upgrade.type);
    } catch (err) {
      console.error("Error purchasing upgrade:", err);
      alert("Failed to purchase upgrade");
    }
  };

  return (
    <div style={styles.shopContainer}>
      <h2 style={styles.title}>⚔️ Upgrades</h2>
      {upgrades && upgrades.length > 0 ? (
        <div style={styles.upgradesGrid}>
          {/* Assume you have a progressPercent prop or get it from context/game state */}
          {upgrades.map((upgrade) => {
            // Debug: log progress and unlock requirements
            console.log('progressPercent:', progressPercent, 'upgrade:', upgrade.name, 'required:', upgrade.requiredProgressPercent);
            // You need to pass progressPercent as a prop to this component for this to work
            // For now, let's assume it's available as a prop
            const owned = isOwned(upgrade.type);
            const affordable = canAfford(upgrade);
            const locked = isLocked(upgrade, progressPercent);
            return (
              <div
                key={upgrade.type}
                style={{
                  ...styles.upgradeCard,
                  filter: locked ? "grayscale(1) blur(1px)" : "none",
                  opacity: locked ? 0.6 : 1,
                  position: 'relative',
                }}
              >
                {locked && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255,255,255,0.7)',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    color: '#b00',
                  }}>
                    <span style={{fontSize: '2em'}}>🔒</span>
                    Locked<br/>
                    (Progress {upgrade.requiredProgressPercent}%)
                  </div>
                )}
                <h4 style={styles.upgradeName}>{upgrade.name}</h4>
                <p style={styles.upgradeDesc}>{upgrade.description}</p>
                <div style={{ fontSize: '12px', color: '#2980b9', marginBottom: 6 }}>
                  +{upgrade.amount} Power per purchase
                </div>
                <div style={styles.costContainer}>
                  {upgrade.cost.gold > 0 && (
                    <span style={styles.cost}>💰 {upgrade.cost.gold}</span>
                  )}
                  {upgrade.cost.wood > 0 && (
                    <span style={styles.cost}>🪵 {upgrade.cost.wood}</span>
                  )}
                  {upgrade.cost.stone > 0 && (
                    <span style={styles.cost}>🪨 {upgrade.cost.stone}</span>
                  )}
                  {upgrade.cost.wheat > 0 && (
                    <span style={styles.cost}>🌾 {upgrade.cost.wheat}</span>
                  )}
                </div>
                <button
                  onClick={() => handleBuyClick(upgrade)}
                  disabled={locked || !affordable}
                  style={{
                    ...styles.buyButton,
                    opacity: locked || !affordable ? 0.5 : 1,
                    cursor: locked || !affordable ? "not-allowed" : "pointer",
                  }}
                >
                  {locked
                    ? `Locked (Progress ${upgrade.requiredProgressPercent}%)`
                    : !affordable
                      ? "Not enough resources"
                      : "Buy"}
                </button>
                {/* No owned message, as requested */}
              </div>
            );
          })}
        </div>
      ) : (
        <p style={styles.noUpgrades}>No upgrades available</p>
      )}
    </div>
  );
}

const styles = {
  shopContainer: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  title: {
    marginTop: 0,
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  },
  upgradesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "15px",
  },
  upgradeCard: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "6px",
    border: "1px solid #e0e0e0",
    textAlign: "center",
    transition: "transform 0.2s",
    minHeight: "180px",
    position: "relative",
  },
    lockBadge: {
      position: "absolute",
      top: 8,
      right: 8,
      background: "#ffe0e0",
      color: "#b00",
      padding: "2px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "bold",
    },
  upgradeName: {
    margin: "0 0 8px 0",
    fontSize: "16px",
    color: "#333",
  },
  upgradeDesc: {
    margin: "0 0 10px 0",
    fontSize: "12px",
    color: "#666",
  },
  costContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    justifyContent: "center",
    marginBottom: "12px",
  },
  cost: {
    fontSize: "12px",
    backgroundColor: "#f0f0f0",
    padding: "4px 8px",
    borderRadius: "4px",
  },
  buyButton: {
    width: "100%",
    padding: "8px",
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  noUpgrades: {
    textAlign: "center",
    color: "#999",
  },
};

export default UpgradesShop;