import React from "react";

function UpgradesShop({
  upgrades = [],
  playerUpgrades = [],
  playerUnlockedUpgrades = [],
  playerResources = { gold: 0, wood: 0, stone: 0, wheat: 0 },
  onUpgradePurchased = () => {},
}) {
  const canAfford = (upgrade) => {
    if (!playerResources || !upgrade.cost) {
      return false;
    }
    return (
      playerResources.gold >= (upgrade.cost.gold || 0) &&
      playerResources.wood >= (upgrade.cost.wood || 0) &&
      playerResources.stone >= (upgrade.cost.stone || 0) &&
      playerResources.wheat >= (upgrade.cost.wheat || 0)
    );
  };

  const isOwned = (upgradeType) => {
    if (!playerUpgrades) return false;
    if (playerUpgrades.length > 0 && typeof playerUpgrades[0] === "object") {
      return playerUpgrades.some((u) => u.type === upgradeType);
    }
    return playerUpgrades.includes(upgradeType);
  };

  const isUnlocked = (upgradeType) => {
    if (!playerUnlockedUpgrades) return false;
    return playerUnlockedUpgrades.includes(upgradeType);
  };

  const handleBuyClick = async (upgrade) => {
    if (!canAfford(upgrade)) {
      alert("Not enough resources!");
      return;
    }
    if (isOwned(upgrade.type)) {
      alert("Already owned!");
      return;
    }
    try {
      await onUpgradePurchased(upgrade.type);
    } catch (err) {
      console.error("Error purchasing upgrade:", err.message);
      alert("Failed to purchase upgrade");
    }
  };

  return (
    <div style={styles.shopContainer}>
      <h2 style={styles.title}>⚔️ Upgrades</h2>
      {upgrades && upgrades.length > 0 ? (
        <div style={styles.upgradesGrid}>
          {upgrades.map((upgrade) => (
            <div
              key={upgrade.type}
              style={{
                ...styles.upgradeCard,
                opacity:
                  isOwned(upgrade.type) || !isUnlocked(upgrade.type) ? 0.5 : 1,
              }}
            >
              <h4 style={styles.upgradeName}>
                {upgrade.name}
                <span
                  style={{
                    fontWeight: "normal",
                    fontSize: "14px",
                    color: "#27ae60",
                    marginLeft: "8px",
                  }}
                >
                  +{upgrade.amount} Power
                </span>
              </h4>
              <p style={styles.upgradeDesc}>{upgrade.description}</p>
              {!isUnlocked(upgrade.type) && (
                <div style={styles.lockBadge}>🔒 Locked</div>
              )}
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
                disabled={
                  !canAfford(upgrade) ||
                  isOwned(upgrade.type) ||
                  !isUnlocked(upgrade.type)
                }
                style={{
                  ...styles.buyButton,
                  opacity:
                    !canAfford(upgrade) ||
                    isOwned(upgrade.type) ||
                    !isUnlocked(upgrade.type)
                      ? 0.5
                      : 1,
                  cursor:
                    !canAfford(upgrade) ||
                    isOwned(upgrade.type) ||
                    !isUnlocked(upgrade.type)
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {isOwned(upgrade.type)
                  ? "✓ Owned"
                  : !isUnlocked(upgrade.type)
                  ? "Locked"
                  : "Buy"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noUpgrades}>No upgrades available</p>
      )}
    </div>
  );
}

const styles = {
  shopContainer: {
    padding: 0,
    backgroundColor: "transparent",
    border: "none",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "auto",
  },
  title: {
    display: "none",
  },
  upgradesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "10px",
  },
  upgradeCard: {
    backgroundColor: "rgba(26, 26, 46, 0.6)",
    padding: "12px",
    border: "2px solid #FFD700",
    textAlign: "center",
    transition: "transform 0.2s",
    boxShadow: "0 0 10px rgba(255, 215, 0, 0.2)",
  },
  upgradeName: {
    margin: "0 0 8px 0",
    fontSize: "10px",
    color: "#FFD700",
    fontFamily: "'Press Start 2P', cursive, sans-serif",
  },
  upgradeDesc: {
    margin: "0 0 10px 0",
    fontSize: "8px",
    color: "#FFD700",
    fontFamily: "'Press Start 2P', cursive, sans-serif",
  },
  costContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "4px",
    justifyContent: "center",
    marginBottom: "12px",
  },
  cost: {
    fontSize: "8px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "4px 6px",
    border: "1px solid #FFD700",
    color: "#FFD700",
    fontFamily: "'Press Start 2P', cursive, sans-serif",
  },
  lockBadge: {
    fontSize: "8px",
    backgroundColor: "rgba(200, 100, 100, 0.4)",
    border: "1px solid #FF6B5B",
    color: "#FF9999",
    fontFamily: "'Press Start 2P', cursive, sans-serif",
    padding: "4px 6px",
    marginBottom: "8px",
  },
  buyButton: {
    width: "100%",
    padding: "8px",
    backgroundColor: "#27ae60",
    color: "#FFD700",
    border: "2px solid #FFD700",
    cursor: "pointer",
    fontSize: "9px",
    fontWeight: "bold",
    fontFamily: "'Press Start 2P', cursive, sans-serif",
    letterSpacing: "0.5px",
  },
  noUpgrades: {
    textAlign: "center",
    color: "#FFD700",
    fontFamily: "'Press Start 2P', cursive, sans-serif",
  },
};

export default UpgradesShop;
