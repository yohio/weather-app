import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {GEO_API_KEY, WEATHER_API_URL, WEATHER_API_KEY} from "../../API";
import Geocode from "react-geocode";

import './tabs.css';
import CurrentWeather from "../current-weather/current-weather";
import Forecast from "../forecast/forecast";

Geocode.setApiKey(GEO_API_KEY);

function TabPanel(props: { [x: string]: any; children: any; value: any; index: any; }) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MainTabs() {
  const [value, setValue] = React.useState(0);
  const [currentWeather, setCurrentWeather] = React.useState(null);
  const [forecast, setForecast] = React.useState(null);

  function LoadOptions(searchData: { city: string, country: string }) {
    Geocode.fromAddress(searchData.city).then(
      async (response: { results: any }) => {
        const currentWeatherFetch = await fetch(
          `${WEATHER_API_URL}/weather?lat=${response.results[0].geometry.location.lat}&lon=${response.results[0].geometry.location.lng}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const forecastFetch = await fetch(
          `${WEATHER_API_URL}/forecast?lat=${response.results[0].geometry.location.lat}&lon=${response.results[0].geometry.location.lng}&appid=${WEATHER_API_KEY}&units=metric&cnt=4`
        );

        console.info()
        Promise.all([currentWeatherFetch, forecastFetch])
          .then(async (response) => {
            const weatherResponse = await response[0].json();
            const forcastResponse = await response[1].json();

            console.info("weatherResponse: ", weatherResponse);
            console.info("forcastResponse: ", forcastResponse);
            setCurrentWeather({city: searchData.city, ...weatherResponse});
            setForecast({city: searchData.city, ...forcastResponse});
          })
          .catch(console.log);
      },
      (error: object) => {
        console.error(error);
      }
    );
  }


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        LoadOptions({city: "Ottawa", country: "CA"});
        break;
      case 1:
        LoadOptions({city: "Moscow", country: "RU"});
        break;
      case 2:
        LoadOptions({city: "Tokyo", country: "JP"});
        break;
      default:

        LoadOptions({city: "Ottawa", country: "CA"});
        break;
    }
  };
  React.useEffect(() => {
    setValue(value)
    LoadOptions({city: "Ottawa", country: "CA"});
  }, []);
  return (
    <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
      <Tabs value={value}
            onChange={handleChange}
            centered
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}>
        <Tab label="OTTAWA" {...a11yProps(0)} />
        <Tab label="MOSCOW" {...a11yProps(1)} />
        <Tab label="TOKYO" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {currentWeather && <CurrentWeather data={currentWeather}/>}
        {forecast && <Forecast data={forecast}/>}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {currentWeather && <CurrentWeather data={currentWeather}/>}
        {forecast && <Forecast data={forecast}/>}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {currentWeather && <CurrentWeather data={currentWeather}/>}
        {forecast && <Forecast data={forecast}/>}
      </TabPanel>
    </Box>
  );
}
