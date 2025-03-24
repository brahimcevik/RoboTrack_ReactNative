import React from "react";
import { Card } from "antd";

// Sabit harita ayarları
const containerStyle = {
  width: "100%",
  height: "340px",
  backgroundColor: "#e0e0e0", // Harita yerine arka planda gri bir renk
};

const GoogleMaps = () => {
  return (
    <Card
      style={{
        margin: "20px",
        width: "87vh",
        height: "52vh",
      }}
      className="bg-sabGreenDark dark:bg-sabGreenHardDark rounded-3xl border-sabGreenDark dark:border-sabGreenHardDark "
    >
      <div
        id="advanced-marker-map"
        style={containerStyle}
      >
        <p>Google Maps görünümü burada olacak. (Dinamik harita kaldırıldı.)</p>
      </div>
    </Card>
  );
};

export default GoogleMaps;
