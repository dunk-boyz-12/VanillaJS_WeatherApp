import { callApi } from './utility/callWeatherDB';
import { degreeState, degreeConv } from './utility/degConv';

const dayContainer = document.querySelector(".weather_card_container");
const forecastStateContainer = document.getElementById("header_weather_display_container");
const citySearch= document.getElementById("form_search");
const degreeContainer = document.getElementById("header__conv__container");
const forecasts = [1,3,5,7];
let forecastState = forecasts[0];
let usingFaranheit = true;
let city = 'Cypress';
let weatherData = [];

let cityData = {
    name: '',
    region: '',
    country: '',
    lat: 0,
    lon: 0,
    localTime: '',
};
let currentWeather = {
    tempF: 0,
    tempC: 0,
    feelsLikeF: 0,
    feelsLikeC: 0,
    humidity: 0,
    condition: '',
    wSpeed: 0,
    wDir: '',
};

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
    console.log(e.target[0].value);
    let city = e.target[0].value;

    //add regex for user input
    // here,, call function to check input 
    callApi(city,forecastState)
        .then(data => displayData(data,forecastState));
        //.then(() => console.log(weatherData));
};

const validateUserInput = () => {

};

const displayData = (data,fs) => {
    cityData.name = data.location.name;
    cityData.region = data.location.region;
    cityData.country = data.location.country;
    cityData.lat = data.location.lat;
    cityData.lon = data.location.lon;
    cityData.localTime = data.location.localtime;
    //get forecast data depending on user selection
    switch(fs) {
        case 1: 
            console.log(data.current);
            
            break;
        case 3: 
            console.log(data.location);
            break;
        case 5: 
            console.log(data.location);
            break;
        case 7: 
            console.log(data.location);
            break;
    }
};


export { city,usingFaranheit };















/*function makeDay() {
    this.dateDay = 'Monday',
    this.dateMonth_Num = 'Nov 11',
    this.icon = 'sunny',
    this.condition = 'S U N N Y',
    this.tHigh = 17,
    this.tLow = 3
};

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
