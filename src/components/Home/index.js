import React, { useState, useRef } from "react";
import { getWeatherByZip, getCityFromZip } from "../../helpers/apis";
import "./styles.css";

const Home = () => {
  const [zip, setZip] = useState("");
  const [display, setDisplay] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [location, setLocation] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [description, setDescription] = useState("");
  const [windSpeed, setWindSpeed] = useState(0);
  
  const displayRef = useRef(null);

  const displayWeather = (json) => {
    // do something
    console.log(json);
    const weather = json.weather[0];
    // update location prop
    setLocation(`${json.name} ${zip}`)
    // other info
    setIconUrl(`http://openweathermap.org/img/wn/${weather.icon}@2x.png`);
    setDescription(weather.description);
    setWindSpeed(json.wind.speed);
    // get emojis set
    setDisplay(true);
    setScroll(true);
    setZip("")
  };

  if (scroll === true ) {
    window.scrollTo({
        top: displayRef.current.offsetTop,
        left: 0,
        behavior: 'smooth'
      })
    setScroll(false);
  }
  return (
    <div>
      <h1>Moody Weather</h1>
      <h2>United States</h2>
      <div className="zipform">
        <div>
          <label>Enter a zip code below</label>
          <input
            type="number"
            placeholder="00000"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </div>
      </div>
      <button onClick={() => getWeatherByZip(zip, displayWeather)}>
        Submit
      </button>
      {display ? <div ref={displayRef} className="display">
          <h2>{location}</h2>
          <img className="weather-icon" src={iconUrl} alt="weather icon" />
          <h3>{description}</h3>
          <p>Wind speed: {windSpeed}</p>
      </div> : ""}
    </div>
  );
};

export default Home;
