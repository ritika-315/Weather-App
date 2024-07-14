import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { UseWeatherAppContext } from '../../Context/Context';

const LeftComponents = () => {
  const WEEKDAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const { state: { city, current } } = UseWeatherAppContext();
  const [currentTime, setCurrentTime] = useState(dayjs().format('HH:mm:ss'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(dayjs().format('HH:mm:ss'));
    }, 1000); // Update every second

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  if (!current) return <div>Loading...</div>;

  const weekdayIndex = dayjs.unix(current.dt).day();

  return (
    <>
      <div className="leftWrap">
        <div className="dateWrap">
          <h2>{WEEKDAYS[weekdayIndex]}</h2>
          <span className="dateDay" style={{ color: 'black', fontWeight: 'bold' }}>
            {dayjs.unix(current.dt).format('DD MMM YYYY')}
          </span>
          <div className="liveTime" style={{ color: 'black', fontWeight: 'bold' }}>
            {currentTime}
          </div>
          <span className="locationName" style={{ color: 'black', fontWeight: 'bold' }}>
            {city.city} - {city.admin_name} - {city.country}
          </span>
        </div>
        <div className="weatherContainer">
          <img
            className="weatherIcon"
            alt="myit"
            src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
          />
          <h1 className="weatherTemp">
            {Math.round(current.temp.max)}°C
          </h1>
          <h3 className="weatherDesc">
            {current.weather[0].main}
          </h3>
        </div>
      </div>
    </>
  );
};

export default LeftComponents;



