var app = new Vue({
  el: "#weather",
  data: {
    location: "",
    city: "",
    temperature: "",
    description: "",
    pressure: "",
    humidity: "",
    weather:
      "https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&APPID=f175d657312e853ac6592c58261af057"
  },

  methods: {
    getWeather() {
      axios.get(this.weather).then(response => {
        console.log(response.data.weather[0].description);
        this.city = response.data.name;
        this.temperature = Math.round(response.data.main.temp) + " " + "℃";
        this.description = response.data.weather[0].description;
        this.pressure =
          this.pressureConvert(response.data.main.pressure) + " " + "mm Hg";
        this.humidity = "Humidity " + response.data.main.humidity + " " + "%";
      });
    },

    pressureConvert(pressure) {
      var pressure = Math.round(pressure / 1.333);
      return "Pressure" + " " + pressure;
    },

    setLocation() {
      if (this.location.length > 1) {
        this.location = this.location.toLowerCase();
        this.weather =
          "https://api.openweathermap.org/data/2.5/weather?q=" +
          this.location +
          "&units=metric&APPID=f175d657312e853ac6592c58261af057";
        this.getWeather();
        this.location = "";
      }
    }
  },

  mounted: function() {
    this.getWeather();
  }
});
