import { callApi } from './utility/callWeatherDB';
import { degreeConv } from './utility/degConv'; 

//dom elements
const weekday = document.getElementById("weekday");
const citySearch= document.getElementById("form-search");
const degreeContainer = document.getElementById("header__conv-container");
const cityList = document.getElementById("my-cities__list");
const cityListContainer = document.getElementById("my-cities");
const feelsLike = document.getElementById("feels-like");
const currTemp = document.getElementById("curr");
const tHigh = document.getElementById("tHigh");
const tLow = document.getElementById("tLow");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const rain = document.getElementById("rain");
const addCityBtn = document.getElementById("my-cities__btn");
const addCityOverlay = document.getElementById("add-city-overlay");
const addCityPlaceholder = document.getElementById('my-cities__placeholder');

//program vars
const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let usingFaranheit = true;
let weather;
let cities = [];

window.onload = function init() {
    citySearch.firstElementChild.value = '';
}

//utility functions
const newSearch = (city) => {
    //add regex for user input
    // here,, call function to check input 
    const d = callApi(city,3);
    return d;
};

const validateUserInput = () => {

};

//just for test, need to fix
const displayData = () => {
    citySearch.firstElementChild.value = `${weather.CityData.name} , ${weather.CityData.region}`;
    const date = new Date();
    const today = daysOfWeek[date.getDay()];
    const curr = weather.Current;
    const fc = weather.Forecast[0];
    const cond = curr.condition.text.split(' ').map(word => {
        let w = word.split('');
        w[0] = w[0].toUpperCase();
        return w.join('');
    }).join(' ');

    weekday.innerText = `${today}, It's ${cond}`;

    if(usingFaranheit) {
        feelsLike.innerText = curr.feelslike_f;
        currTemp.innerText = `${curr.temp_f} F`;
        tHigh.innerText = `${fc.hTempF} F`;
        tLow.innerText = `${fc.lTempF} F`;
    } else {
        feelsLike.innerText = curr.feelslike_c;
        currTemp.innerText = `${curr.temp_c} C`;
        tHigh.innerText = `${fc.hTempC} C`;
        tLow.innerText = `${fc.lTempC} C`;
    };
    sunrise.innerText = fc.sunrise;
    sunset.innerText = fc.sunset;
    rain.innerText = `${curr.precip_in} in`;
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
            avgTempC: day.day.avgtemp_c,
            hTempC: day.day.maxtemp_c,
            lTempC: day.day.mintemp_c,
            humidity: day.day.avghumidity,
            condition: day.day.condition.text,
            vis: day.day.avgvis_miles,
            sunrise: day.astro.sunrise,
            sunset: day.astro.sunset,
            //hourly: [...day.hour]
        };
        return weatherReport;
    });
    //return what we want to display
    weather = { CityData: cityData, 
                        Alert: weatherAlert, 
                        Current: currentData, 
                        Forecast: [...formattedData] };
};

function addCity() {
    //remove placeholder
    if(cityList.firstElementChild.id === 'my-cities__placeholder') {
        cityList.removeChild(addCityPlaceholder);
    };
        //get city from submit
        let city = `${weather.CityData.name} , ${weather.CityData.region}`;
        cities.push(city);
        //create list item
        let listItem = document.createElement('li');
        listItem.className = 'my-cities__item';
        //add name
        let name = document.createElement('h3');
        name.className = 'my-cities__item-name';
        name.innerText = city;
        //add to dom
        listItem.appendChild(name);
        cityList.appendChild(listItem);
};

//event listeners
citySearch.addEventListener('submit', e => {
    e.preventDefault();
    let city;
    if(e.target.firstElementChild.value === '') {
        city = 'Los Angeles, CA';
    } else {
        city = e.target.firstElementChild.value;
    }
    newSearch(city)
        .then(data => formatData(data))
        .then(() => displayData())
        .catch(() => window.alert("Please Enter a Valid City Name or Zip/Postal Code"));
});

degreeContainer.addEventListener('click', e => {
    degreeConv(e);
    if(weather) {
        usingFaranheit = !usingFaranheit;
        displayData(weather);
    } else {
        usingFaranheit = !usingFaranheit;
    }
});

addCityBtn.addEventListener('click', e => {
    addCityOverlay.className = 'open';
});

addCityOverlay.addEventListener('click', e => {
    const src = e.target.id; 
    if(src !== 'add-city-input') {
        addCityOverlay.className = 'closed';
    }
});

addCityOverlay.addEventListener('submit', e => {
    e.preventDefault();
    addCityOverlay.className = 'closed';
    let city;
    if(e.target.firstElementChild.value === '') {
        city = 'Los Angeles, CA';
    } else {
        city = e.target.firstElementChild.value;
    }
    newSearch(city)
        .then(data => formatData(data))
        .then(() => displayData())
        .then(() => addCity())
        .catch(() => window.alert("Please Enter a Valid City Name or Zip/Postal Code"));
});

cityListContainer.addEventListener('click', e => {
    e.preventDefault();
    if(cities.length !== 0) {
        let c = e.target.innerText;
        console.log(c);
        newSearch(c)
            .then(data => formatData(data))
            .then(() => displayData());
    }
});


export { usingFaranheit };