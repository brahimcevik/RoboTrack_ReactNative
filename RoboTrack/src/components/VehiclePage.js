import React, { useState } from "react";
import { Col, Row, Flex } from "antd";
import Vehicle from "../components/VehiclePage/Vehicle";
import LeftCol from "../components/VehiclePage/LeftCol";
import RightCol from "../components/VehiclePage/RightCol";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { vehicleCardClick } from "../redux/navigationSlice";

function VehiclePage() {
  const dispatch = useDispatch();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(true); // Varsayılan olarak Online
  const selectedVehicle = useSelector((state) => state.vehicles.selectedVehicle);

  const geriDon = () => {
    dispatch(vehicleCardClick());
  };

  const statusDegistir = () => {
    setButtonStatus(!buttonStatus);
  };

  return (
    <Row
      style={{ width: "87vh", height: "80vh", position: "relative" }}
      className="bg-sabGreenDark dark:bg-sabGreenHardDark border rounded-3xl border-sabGreenDark dark:border-sabGreenHardDark"
    >
      <Col span={8}>
        <Flex
          justify="center"
          align="center"
          style={{
            height: "100%",
            borderRadius: "1.5rem 0 0 1.5rem",
          }}
        >
          <LeftCol />
        </Flex>
      </Col>
      <Col span={8}>
        <Flex
          justify="center"
          align="center"
          style={{
            height: "100%",
            flexDirection: "column",
          }}
        >
          <button
            onClick={geriDon}
            type="button"
            className="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
            style={{ marginBottom: "10px", marginTop: "100px" }}
          >
            <ArrowUturnLeftIcon />
            <span>Geri Dön</span>
          </button>

          <Vehicle />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
              marginBottom: "5px",
              width: "50%",
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "10px 0",
            }}
          >
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: onlineStatus ? "#00A36C" : "#B22222",
                display: "inline-block",
                marginRight: "8px",
              }}
            ></span>
            <span style={{ fontSize: "16px", color: "#333" }}>
              {onlineStatus ? "Online" : "Offline"}
            </span>
          </div>

          <button
            onClick={statusDegistir}
            type="button"
            style={{
              width: "50%",
              padding: "10px",
              marginTop: "10px",
            }}
            className={`text-sm font-medium border rounded-lg ${
              buttonStatus
                ? "bg-red-500 text-white border-red-700"
                : "bg-green-500 text-white border-green-700"
            }`}
          >
            {buttonStatus ? "Dur" : "Devam Et"}
          </button>

          {/* Robot Detayları */}
          {selectedVehicle && (
            <div
              style={{
                width: "90%",
                marginTop: "20px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "15px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ marginBottom: "15px", color: "#333" }}>Robot Detayları</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <p style={{ margin: "5px 0", color: "#666" }}>
                    <strong>Mesafe:</strong> {selectedVehicle.ugvDistance} m
                  </p>
                  <p style={{ margin: "5px 0", color: "#666" }}>
                    <strong>Hız:</strong> {selectedVehicle.ugvSpeed} km/s
                  </p>
                  <p style={{ margin: "5px 0", color: "#666" }}>
                    <strong>Herbisit:</strong> {selectedVehicle.ugvHerbicide} L
                  </p>
                </div>
                <div>
                  <p style={{ margin: "5px 0", color: "#666" }}>
                    <strong>Konum:</strong> {selectedVehicle.carLoc}
                  </p>
                  <p style={{ margin: "5px 0", color: "#666" }}>
                    <strong>Görev:</strong> {selectedVehicle.ugvMission}
                  </p>
                  <p style={{ margin: "5px 0", color: "#666" }}>
                    <strong>Son Aktivite:</strong> {new Date(selectedVehicle.lastRunTime).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Flex>
      </Col>
      <Col span={8}>
        <Flex
          justify="center"
          align="center"
          style={{
            height: "100%",
            borderRadius: "0 1.5rem 1.5rem 0",
          }}
        >
          <RightCol />
        </Flex>
      </Col>
    </Row>
  );
}

export default VehiclePage;
