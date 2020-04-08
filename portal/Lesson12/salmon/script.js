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

const apiGuide = 'https://nastyonish.github.io/adyazvinskaya.github.io/portal/Lesson12/salmon/guide.json';

fetch(apiGuide)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const guides = jsonObject['guide'];
    console.table(jsonObject);
    for(let i = 0; i < guides.length; i++) {
      let guide = document.createElement('section');
      let h2 = document.createElement('h2');
      let div = document.createElement('div');
      let div0 = document.createElement('div');
      let div1 = document.createElement('div');
      let div2 = document.createElement('div');
      let div3 = document.createElement('div');
      let div4 = document.createElement('div');
      let image = document.createElement('img');

      h2.textContent = guides[i].firstname + ' ' + guides[i].lastname;
      div.textContent = guides[i].slogan;
      div0.setAttribute('id', 'info');
      div1.textContent = 'Certification level: ' + guides[i].level;
      div2.textContent = 'Years of experience: ' + guides[i].experience;
      div3.textContent = 'E-mail: ' + guides[i].email;
      div4.textContent = guides[i].byography;
      image.setAttribute('src', guides[i].picture);

      image.setAttribute('alt', guides[i].firstname + ' ' + guides[i].lastname);

      guide.appendChild(image);
      guide.appendChild(h2);
      guide.appendChild(div)
      guide.appendChild(div0);
      div0.appendChild(div1);
      div0.appendChild(div2);
      div0.appendChild(div3);
      guide.appendChild(div4);

      document.querySelector('div.guide').appendChild(guide);
    }
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