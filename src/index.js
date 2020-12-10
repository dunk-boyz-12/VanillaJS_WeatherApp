import { callApi } from './utility/callWeatherDB';
import { degreeConv } from './utility/degConv'; 
import { WeatherCard } from './utility/weatherCard';

//dom elements
const weekday = document.getElementById("weekday");
const citySearch= document.getElementById("form-search");
const degreeContainer = document.getElementById("header__conv-container");
const cityList = document.getElementById("my-cities__list");
const feelsLike = document.getElementById("feels-like");
const currTemp = document.getElementById("curr");
const tHigh = document.getElementById("tHigh");
const tLow = document.getElementById("tLow");

//program vars
const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let usingFaranheit = true;
//let weather; //will hold weather data returned from api after formatting


const date = new Date();
const today = daysOfWeek[date.getDay()];
weekday.innerText = `${today}, Its Sunny`;

console.log(cityList);

if(cityList.childElementCount === 0) {
    console.log("hey");
}


//utility functions
const newSearch = (e) => {
    //console.log(e.target[0].value);
    let city = e.target[0].value;
    //add regex for user input
    // here,, call function to check input 
    callApi(city,3)
        .then(data => formatData(data))
        .then((weather) => displayData(weather));
};

const validateUserInput = () => {

};
//just for test, need to fix
const displayData = (data) => {
    //cards has weather cards stored in it to add data to and cycle
    console.log(data);
    const curr = data.Current;
    const fc = data.Forecast[0];
    feelsLike.innerText = curr.feelslike_f;
    currTemp.innerText = curr.temp_f;
    tHigh.innerText = fc.hTempF;
    tLow.innerText = fc.lTempF;
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
    const weather = { CityData: cityData, 
                Alert: weatherAlert, 
                Current: currentData, 
                Forecast: [...formattedData] };
    return weather;
};

//event listeners
citySearch.addEventListener('submit', function(e) {
    e.preventDefault();
    newSearch(e);
});

degreeContainer.addEventListener('click', function(e) {
    degreeConv(e);
    usingFaranheit = !usingFaranheit;
});


export { usingFaranheit };