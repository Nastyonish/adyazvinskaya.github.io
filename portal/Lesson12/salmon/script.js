// Last Modification
let lastModif = document.lastModified;
document.getElementById('lastModified').innerHTML = lastModif;

// Menu
function Menu() {
    document.getElementById("menu").classList.toggle("hide");
}

// JSON
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?id=4092267&units=imperial&APPID=404dabd7ee29a75e626eaffed07a7ea7';

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
});

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