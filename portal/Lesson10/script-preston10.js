// Last Modification
let lastModif = document.lastModified;
document.getElementById('lastModified').innerHTML = lastModif;

// Menu
function Menu() {
    document.getElementById("menu").classList.toggle("hide")
}

// Promo
let d = new Date();
let week = d.getDay();
if(week !== 5) {
    document.getElementById("promo").style.display = "none";
}

// Wind Chill Calculator
let temp = parseFloat(document.getElementById("temp").textContent);
let speed = parseFloat(document.getElementById("speed").textContent);

let chill =
  temp <= 50 && speed > 3
    ? (
        35.74 +
        0.6215 * temp -
        35.75 * speed ** 0.16 +
        0.4275 * temp * speed ** 0.16
      ).toFixed(0)
    : "N/A";

document.getElementById("chill").textContent = chill;

//JSON
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&APPID=404dabd7ee29a75e626eaffed07a7ea7';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&APPID=404dabd7ee29a75e626eaffed07a7ea7';

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function capitalizeFLetter(str) {
    if (str.includes(' ')) {
        let firstWord = str.split(' ')[0];
        let secondWord = str.split(' ')[1];
        return firstWord.charAt(0).toUpperCase() + firstWord.slice(1) + " " + secondWord;
    } else {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

fetch(apiURL)
    .then(function (response) {
        return response.json();
    })
    .then( function (jsonObject) {
        document.getElementById('cur').textContent = jsonObject.weather[0].main;
        document.getElementById('temp').textContent = jsonObject.main.temp_max;
        document.getElementById('hum').textContent = jsonObject.main.humidity;
        document.getElementById('speed').textContent = jsonObject.wind.speed;
        document.getElementById('cur').textContent = capitalizeFLetter(jsonObject.weather[0].description);
})

fetch(forecastUrl)
    .then(function (response) {
        return response.json();
    })
    .then( function (jsonObject) {
        const forecasts = jsonObject.list.filter(item => item.dt_txt.includes('18:00:00'));
        const rows = document.querySelectorAll('tr td span');
        const icons = document.querySelectorAll('tr td img');
        const days = document.querySelectorAll('th');

        for (let i = 0; i < rows.length; i++) {
            const date = new Date(forecasts[i].dt_txt);
            const day = weekdays[date.getDay()];
            rows[i].textContent = Math.round(forecasts[i].main.temp);
            icons[i].setAttribute('src', `https://openweathermap.org/img/wn/${forecasts[i].weather[0].icon}@2x.png`);
            days[i].textContent = day;
        }
    })
