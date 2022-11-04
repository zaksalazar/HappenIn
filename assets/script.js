var weather = {
  apiKey: "af0e82322edef7c54df70bf9d0e3082f",
  fetchWeather: function () {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=Denver&appid=af0e82322edef7c54df70bf9d0e3082f"
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  },
};


