import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {geoApiOptions, GEO_API_URL, WEATHER_API_URL, WEATHER_API_KEY} from "../../API";

import './tabs.css';
import CurrentWeather from "../current-weather/current-weather";

function TabPanel(props: { [x: string]: any; children: any; value: any; index: any; }) {
  const {children, value, index, ...other} = props;
  const [currentWeather, setCurrentWeather] = React.useState(null);
  const [forecast, setForecast] = React.useState(null);


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
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

function loadOptions(searchData: { city: string, country: string }) {
  return fetch(
    `${GEO_API_URL}http://api.openweathermap.org/geo/1.0/direct?q=${searchData.city},${searchData.country}&limit=10&appid=${WEATHER_API_KEY}`,
    geoApiOptions
  )
    .then((response) => response.json())
    .then((response) => {
      return {
        options: response.data.map((city: any) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    });
}

function handleOnSearchChange(searchData: { city: string, country: string }) {
  const cityData = loadOptions(searchData);
  return console.log(cityData);
  // const currentWeatherFetch = fetch(
  //   `${WEATHER_API_URL}/weather?lat=${cityData.lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  // );
  // const forecastFetch = fetch(
  //   `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  // );
  //
  // Promise.all([currentWeatherFetch, forecastFetch])
  //   .then(async (response) => {
  //     const weatherResponse = await response[0].json();
  //     const forcastResponse = await response[1].json();
  //
  //     setCurrentWeather({ city: searchData.label, ...weatherResponse });
  //     setForecast({ city: searchData.label, ...forcastResponse });
  //   })
  //   .catch(console.log);
}

export default function MainTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        handleOnSearchChange({city: "Ottawa", country: "CA"});
        break;
      case 1:
        handleOnSearchChange({city: "Moscow", country: "RU"});
        break;
      case 2:
        handleOnSearchChange({city: "Tokyo", country: "JP"});
        break;
    }
  };

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
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
