import React, { useState } from "react";
import WeatherStats from "./WeatherStats";
import { Flex } from "antd";

function Weather() {
  const [weatherData, setWeatherData] = useState([
    // Örnek veri
    { temperature: 25, weatherType: "Clear", day: "Monday", humidity: 60, windSpeed: 5 },
    { temperature: 22, weatherType: "Cloudy", day: "Tuesday", humidity: 65, windSpeed: 3 },
    { temperature: 20, weatherType: "Rainy", day: "Wednesday", humidity: 70, windSpeed: 7 },
    { temperature: 24, weatherType: "Clear", day: "Thursday", humidity: 50, windSpeed: 4 },
  ]);

  return (
    <div>
      <Flex justify="space-evenly" align="center" gap={24}>
        {weatherData &&
          weatherData.map((data, index) => (
            <WeatherStats
              value={data.temperature}
              weatherType={data.weatherType}
              weatherData={weatherData}
              day={data.day}
            />
          ))}
      </Flex>
    </div>
  );
}

export default Weather;
