import { callApi } from './utility/callWeatherDB';
import { degreeConv } from './utility/degConv'; 
import { WeatherCard } from './utility/weatherCard';

const cards = document.querySelectorAll(".weather-card");
const forecastStateContainer = document.getElementById("header-weather-display-container");
const citySearch= document.getElementById("form-search");
const degreeContainer = document.getElementById("header-conv-container");
const forecastAmt = [1,3];
let forecastState = forecastAmt[1];
let usingFaranheit = true;
let weather; //will hold weather data returned from api after formatting

//event listeners
citySearch.addEventListener('submit', function(e) {
    e.preventDefault();
    newSearch(e);
});

degreeContainer.addEventListener('click', function(e) {
    degreeConv(e);
    if (e.target.id === 'celsius') {
        usingFaranheit = false;
    } else {
        usingFaranheit = true;
    };
});

forecastStateContainer.addEventListener('click', function(e) {
    console.log(e.target);
});

//utility functions
const newSearch = (e) => {
    //console.log(e.target[0].value);
    let city = e.target[0].value;
    //add regex for user input
    // here,, call function to check input 
    callApi(city,forecastState)
        .then(data => formatData(data))
        .then(() => displayData(weather));
};

const validateUserInput = () => {

};
//just for test, need to fix
const displayData = (data) => {
    //cards has weather cards stored in it to add data to and cycle
    console.log(data);
};

const formatData = (data) => {
    const forecastData = [...data.forecast.forecastday];
    const currentData = data.current;
    const weatherAlert = data.alert;
    const cityData = { name: data.location.name,
                    region: data.location.region, //state-province
                    country: data.location.country,
                    lat: data.location.lat,
                    lon: data.location.lon,
                    localtime: data.location.localtime };
    //format forecast data into easier to work with variables   
    const formattedData = forecastData.map(day => {
        const weatherReport = {
            date: day.date.split('-'),
            avgTempF: day.day.avgtemp_f,
            hTempF: day.day.maxtemp_f,
            lTempF: day.day.mintemp_f,
            humidity: day.day.avghumidity,
            condition: day.day.condition.text,
            vis: day.day.avgvis_miles,
            sunrise: day.astro.sunrise,
            sunset: day.astro.sunset,
            hourly: [...day.hour]
        };
        return weatherReport;
    });
    //store in easier to work with key/value pairs
    weather = { CityData: cityData, 
                Alert: weatherAlert, 
                Current: currentData, 
                Forecast: [...formattedData] };

};


export { usingFaranheit };