import { callApi } from './utility/callWeatherDB';
import { degreeConv } from './utility/degConv'; 
import { WeatherCard } from './utility/weatherCard';

const dayContainer = document.querySelector(".weather_card_container");
const forecastStateContainer = document.getElementById("header_weather_display_container");
const citySearch= document.getElementById("form_search");
const degreeContainer = document.getElementById("header__conv__container");
const forecastAmt = [1,3];
let forecastState = forecastAmt[1];
let usingFaranheit = true;
let weather;

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
        .then(() => console.log(weather))
        .then(() => displayData(weather));
};

const validateUserInput = () => {

};
//just for test, need to fix
const displayData = (data) => {
    let cards = data.Forecast.map(day => {
        let card = document.createElement('p');
        card.innerText = day.date;
        return card;
    });
    cards.forEach( c => dayContainer.appendChild(c));
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
    //console.log(weather);
};


export { usingFaranheit };















/*

makeDay.prototype.createDay = function() {
    let card = document.createElement('div');
    let day = document.createElement('h2');
    let month = document.createElement('h2');
    let iconContainer = document.createElement('div');
    let icon = document.createElement('ion-icon');
    let infoContainer = document.createElement('div');
    let condition = document.createElement('p');
    let tHigh = document.createElement('p');
    let tLow = document.createElement('p');

    card.className = 'weather_card';
    day.className = 'weather_card__day';
    month.className = 'weather_card__month';
    iconContainer.id = 'weather_card__icon__container';
    icon.className = 'weather_card__icon';
    infoContainer.className = 'weather_card__info__container';
    condition.className = 'weather_card__current';
    tHigh.className = 'weather_card__item';
    tLow.className = 'weather_card__item';
    day.innerText = this.dateDay;
    month.innerText = this.dateMonth_Num;
    icon.name = this.icon;
    condition.innerText = this.condition;
    tHigh.innerText = `H ${this.tHigh} F`;
    tLow.innerText = `H ${this.tLow} C`;

    card.appendChild(day);
    card.appendChild(month);
    iconContainer.appendChild(icon);
    card.appendChild(iconContainer);
    infoContainer.appendChild(condition);
    infoContainer.appendChild(tHigh);
    infoContainer.appendChild(tLow);
    card.appendChild(infoContainer);
    dayContainer.appendChild(card);
}

const initWeek = function() {
    for(let i = 0; i < 7; i++) {
        let d = new makeDay();
        d.createDay();
        days.push(d);
    }
}


//initWeek();
console.log(days);
degreeContainer.addEventListener('click', degreeConv);*/
