import React from "react";
import "./current-weather.css";

class CurrentWeather extends React.Component<{ data: any }> {
  render() {
    let {data} = this.props;
    console.info("data: ", data);
    return (
      <div className="weather">
        <div className="top">
          <div>
            <h2>Today</h2>
          </div>
        </div>
        <div className="bottom">
          <div>
            <img
              alt="weather"
              className="weather-icon"
              src={`icons/${data.weather[0].icon}.png`}
            />
          </div>
          <div className="temperature-box">
            <p className="temperature-text">{Math.round(data.main.temp)}°</p>
            <p className="temperature-description">{data.weather[0].main}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentWeather;
