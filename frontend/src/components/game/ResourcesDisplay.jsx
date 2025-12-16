// Resources Display Component - Displays player's current resources in a grid layout
// Shows icons and amounts for Gold, Wood, Stone, and Wheat

const ResourcesDisplay = ({ resources }) => {
  if (!resources) return null;

  const resourceItems = [
    { key: "gold", icon: "🪙", label: "Gold" },
    { key: "wood", icon: "🪵", label: "Wood" },
    { key: "stone", icon: "🪨", label: "Stone" },
    { key: "wheat", icon: "🌾", label: "Wheat" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "10px",
        marginBottom: "20px",
        padding: "10px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      {resourceItems.map((item) => (
        <div
          key={item.key}
          style={{
            textAlign: "center",
            padding: "10px",
            backgroundColor: "#fff",
            borderRadius: "6px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "24px" }}>{item.icon}</div>
          <div style={{ fontSize: "12px", fontWeight: "bold", marginTop: "5px" }}>
            {item.label}
          </div>
          <div style={{ fontSize: "16px", fontWeight: "bold", color: "#3498db" }}>
            {resources[item.key]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResourcesDisplay;
