function weatherInfo(name,region,country,lat,lon,localTime,data,currentData) {
    this.name = name;
    this.region = region;
    this.country = country;
    this.lat = lat;
    this.lon = lon;
    this.localTime = localTime;
    this.weatherData = [...data];
    this.currentWeatherData = currentData;
};

export { weatherInfo } 