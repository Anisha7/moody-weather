export const getWeatherByZip = async (zipCode, callback) => {
  // api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
  const key = process.env.REACT_APP_API_KEY;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${key}`
  )
    // After a connection is made the data is streamed as JSON
    .then((res) => res.json())
    // When that resolves we use `this.setState()` to assign the weather data to state which will also re-render the component.
    .then((json) => callback(json))
    .catch((err) => console.log(err.message));
};

export const getCityFromZip = async (zipCode, callback) => {
  const key = process.env.REACT_APP_ZIPCODE_API_KEY;
  console.log(key);
  fetch(
    `https://www.zipcodeapi.com/rest/${key}/info.json/${zipCode}/degrees`,
    {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    // After a connection is made the data is streamed as JSON
    .then((res) => res.json())
    // When that resolves we use `this.setState()` to assign the weather data to state which will also re-render the component.
    .then((json) => callback(`${json.city}, ${json.state} ${zipCode}`))
    .catch((err) => console.log(err.message));
};
