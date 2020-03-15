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

// Storm severity
function StormSeverity(severity) {
    document.getElementById("stormseverity").innerHTML = severity;
}

// Lazy Loading
const imagesToLoad = document.querySelectorAll("img[data-src]");

const imgOptions = {
    threshold: 1,
    rootMargin: "0px 0px 0px 0px"
}

const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {image.removeAttribute('data-src');}
}

if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((items, observer) => {
        items.forEach(item => {
            if (item.isIntersecting) {
                loadImages(item.target);
                observer.unobserve(item.target);
            }
        });
    }, imgOptions);

    imagesToLoad.forEach(img => {
        imgObserver.observe(img);
    });
} 
else {
    imagesToLoad.forEach(img => {
        loadImages(img);
    });
}

// JSON
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&APPID=404dabd7ee29a75e626eaffed07a7ea7';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&APPID=404dabd7ee29a75e626eaffed07a7ea7';
const eventsURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
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

fetch(eventsURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const towns = jsonObject['towns'];
    console.table(jsonObject); 
    for (let i = 0; i < towns.length; i++) {
        if (towns[i].name == "Preston") {
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

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const towns = jsonObject['towns'];
    console.table(jsonObject);
    for (let i = 0; i < towns.length; i++) {
        if (towns[i].name == "Fish Haven" || 
            towns[i].name == "Preston" || 
            towns[i].name == "Soda Springs") {
                let town = document.createElement('section');
                let h2 = document.createElement('h2');
                let div0 = document.createElement('div');
                let div1 = document.createElement('div');
                let div2 = document.createElement('div');
                let div3 = document.createElement('div');
                let div4 = document.createElement('div');
                let image = document.createElement('img');

                h2.textContent = towns[i].name;
                div0.setAttribute('id', 'town');
                div1.textContent = towns[i].motto;
                div1.setAttribute('id', 'motto');
                div2.textContent = 'Year Founded: ' + towns[i].yearFounded;
                div3.textContent = 'Population: ' + towns[i].currentPopulation;
                div4.textContent = 'Annual Rain Fall: ' + towns[i].averageRainfall;
                if (towns[i].name == "Fish Haven") {
                    image.setAttribute('src', 'images/Home/fishHaven.jpg');
                }
                else if (towns[i].name == "Preston") {
                    image.setAttribute('src', 'images/Home/preston.jpg');
                }
                else if (towns[i].name == "Soda Springs") {
                    image.setAttribute('src', 'images/Home/sodaSprings.jpg');
                }
                image.setAttribute('alt', towns[i].name);

                town.appendChild(div0);
                div0.appendChild(h2);
                div0.appendChild(div1);
                div0.appendChild(div2);
                div0.appendChild(div3);
                div0.appendChild(div4);
                town.appendChild(image);

                document.querySelector('div.towns').appendChild(town);
        }
    }
});