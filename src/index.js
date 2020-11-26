import { callApi } from './utility/callWeatherDB';
import { degreeState, degreeConv } from './utility/degConv';
import { weatherInfo } from './utility/weatherInfo'; 

const dayContainer = document.querySelector(".weather_card_container");
const forecastStateContainer = document.getElementById("header_weather_display_container");
const citySearch= document.getElementById("form_search");
const degreeContainer = document.getElementById("header__conv__container");
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const forecastAmt = [1,3,5,7];
let forecastState = forecastAmt[0];
let usingFaranheit = true;
let days = [];
let currentWeather;

let weatherReport = {
    dayLetters: '',
    dayNum: 0,
    month: '',
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
    //console.log(e.target[0].value);
    let city = e.target[0].value;
    //add regex for user input
    // here,, call function to check input 
    callApi(city,forecastState)
        .then(data => displayData(data,forecastState));
};

const validateUserInput = () => {

};

const displayData = (data,fs) => {
    const forecastData = new weatherInfo(data.location.name,
                                data.location.region,
                                data.location.country,
                                data.location.lat,
                                data.location.lon,
                                data.location.localtime,
                                data.forecast.forecastday,
                                data.current);
    //collect current & forecast data, store in vars
    forecastData.weatherData.forEach(day => {
        days.push(day);
    });
    currentWeather = forecastData.currentWeatherData;
    console.log(days,currentWeather);
    //display forecast data depending on user selection of forecast length
    switch(fs) {
        case 1:      
            days.forEach(day => {
                let d = day.date.split('-');
                weatherReport.month = months[parseInt(d[1]-1)];
                weatherReport.dayNum = d[2];
                console.log(weatherReport);
            });
            break;
        case 3: 
         
            break;
        case 5: 
            
            break;
        case 7: 
            
            break;
    }
    
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
