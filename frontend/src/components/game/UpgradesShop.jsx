// Upgrades Shop Component - Grid of available upgrades for purchase with affordability checks

import React from "react";

function UpgradesShop({
  upgrades = [],
  playerUpgrades = [],
  playerResources = { gold: 0, wood: 0, stone: 0, wheat: 0 },
  onUpgradePurchased = () => {},
}) {
  // Check if player can afford upgrade
  const canAfford = (upgrade) => {
    // Safety check - if playerResources is undefined, return false
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

  // Check if upgrade is already owned
  const isOwned = (upgradeId) => playerUpgrades.includes(upgradeId);

  const handleBuyClick = async (upgrade) => {
    if (!canAfford(upgrade)) {
      alert("Not enough resources!");
      return;
    }

    if (isOwned(upgrade._id)) {
      alert("Already owned!");
      return;
    }

    try {
      // Call the purchase handler from parent
      await onUpgradePurchased(upgrade._id);
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
          {upgrades.map((upgrade) => (
            <div
              key={upgrade._id}
              style={{
                ...styles.upgradeCard,
                opacity: isOwned(upgrade._id) ? 0.5 : 1,
              }}
            >
              <h4 style={styles.upgradeName}>{upgrade.name}</h4>
              <p style={styles.upgradeDesc}>{upgrade.description}</p>

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
                disabled={!canAfford(upgrade) || isOwned(upgrade._id)}
                style={{
                  ...styles.buyButton,
                  opacity: !canAfford(upgrade) || isOwned(upgrade._id) ? 0.5 : 1,
                  cursor:
                    !canAfford(upgrade) || isOwned(upgrade._id)
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {isOwned(upgrade._id) ? "✓ Owned" : "Buy"}
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