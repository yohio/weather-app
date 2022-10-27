import React from "react";
import "./forecast.css";
import Box from "@mui/material/Box";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

class Forecast extends React.Component<{ data: any }> {
  render() {
    let {data} = this.props;
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    return (
      <Box className="forcast-container">
        {data.list.splice(0, 7).map((item: any, idx: any) => (
          <Box key={idx} className="daily-item">
            <label className="day">{forecastDays[idx]}</label>
            <img src={`icons/${item.weather[0].icon}.png`} className="icon-small"
                 alt="weather"/>
            <label className="description">{item.weather[0].description}</label>
            <label className="min-max">{Math.round(item.main.temp_max)}°
              /{Math.round(item.main.temp_min)}°C</label>
          </Box>
        ))}
      </Box>
    );
  }
}

export default Forecast;
