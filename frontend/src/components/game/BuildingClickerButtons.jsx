import React, { useState } from "react";
import { clickCastle } from "../../api/playerAPI";
import { collectResource } from "../../api/resourceAPI";

const BuildingClickerButtons = ({ onClickBuilding, disabled = false }) => {
  const [loading, setLoading] = useState(false);

  const buildings = [
    {
      type: "castle",
      label: "Castle",
      image: require("../../images/buildings/Castle.png"),
      top: "24%",
      left: "37%",
    },
    {
      type: "quarry",
      label: "Stone Quarry",
      image: require("../../images/buildings/Stone Quarry.png"),
      top: "80%",
      left: "30%",
    },
    {
      type: "lumber_yard",
      label: "Lumber Yard",
      image: require("../../images/buildings/Lumber Yard.png"),
      top: "50%",
      left: "75%",
    },
    {
      type: "wheat_field",
      label: "Wheat Field",
      image: require("../../images/buildings/Wheat Field.png"),
      top: "60%",
      left: "10%",
    },
  ];

  const handleClick = async (buildingType) => {
    if (disabled || loading) {
      return;
    }

    try {
      setLoading(true);

      let result;
      if (buildingType === "castle") {
        result = await clickCastle();
      } else {
        result = await collectResource(buildingType);
      }

      const responseData = result && result.data ? result.data : result;

      if (onClickBuilding && typeof onClickBuilding === "function") {
        onClickBuilding();
      }

      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
    }
  };

  return (
    <div style={styles.buildingContainer}>
      {buildings.map((building) => (
        <div
          key={building.type}
          onClick={() => handleClick(building.type)}
          style={{
            ...styles.buildingWrapper,
            top: building.top,
            left: building.left,
            cursor: disabled || loading ? "not-allowed" : "pointer",
            pointerEvents: disabled || loading ? "none" : "auto",
          }}
          onMouseEnter={(e) => {
            if (!disabled && !loading) {
              e.currentTarget.style.filter = "brightness(1.3)";
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled && !loading) {
              e.currentTarget.style.filter = "brightness(1)";
            }
          }}
        >
          <img
            src={building.image}
            alt={building.label}
            style={styles.buildingImage}
          />
        </div>
      ))}
    </div>
  );
};

const styles = {
  buildingContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  buildingWrapper: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    transition: "filter 0.2s ease",
    zIndex: "10",
  },
  buildingImage: {
    width: "200px",
    height: "auto",
    objectFit: "contain",
  },
};

export default BuildingClickerButtons;
