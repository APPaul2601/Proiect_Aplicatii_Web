export const canAffordUpgrade = (resources, upgradeType, upgrades) => {
  const upgrade = upgrades.find((u) => u.type === upgradeType);
  if (!upgrade) return false;

  return (
    resources.gold >= upgrade.cost.gold &&
    resources.wood >= upgrade.cost.wood &&
    resources.stone >= upgrade.cost.stone &&
    resources.wheat >= upgrade.cost.wheat
  );
};

export const isUpgradePurchased = (playerUpgrades, upgradeType) => {
  return playerUpgrades.some((u) => u.type === upgradeType);
};

export const formatCastleProgress = (progress) => {
  return progress.toFixed(1);
};
