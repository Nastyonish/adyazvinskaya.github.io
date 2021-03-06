const apiURL = 'https://api.openweathermap.org/data/2.5/weather?id=5585010&units=imperial&APPID=404dabd7ee29a75e626eaffed07a7ea7';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?id=5585010&units=imperial&APPID=404dabd7ee29a75e626eaffed07a7ea7';

const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

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
});

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
    });

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const towns = jsonObject['towns'];
    console.table(jsonObject); 
    for (let i = 0; i < towns.length; i++) {
        if (towns[i].name == "Fish Haven") {
            let event = document.createElement('section');
            for (let j = 0; j < towns[i].events.length; j++) {
                let p = document.createElement('p');
                p.textContent = towns[i].events[j];
                event.appendChild(p);
            }

            document.querySelector('div.events').appendChild(event);
        }
    }
});