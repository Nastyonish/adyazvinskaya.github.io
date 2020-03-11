// Last Modification
let lastModif = document.lastModified;
document.getElementById('lastModified').innerHTML = lastModif;

// Menu
function Menu() {
    document.getElementById("menu").classList.toggle("hide")
}

//JSON
const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const towns = jsonObject['towns'];
    console.table(jsonObject); // temporary checking for valid response and data parsing
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
                    image.setAttribute('src', 'images-home/fishHaven.jpg');
                }
                else if (towns[i].name == "Preston") {
                    image.setAttribute('src', 'images-home/preston.jpg');
                }
                else if (towns[i].name == "Soda Springs") {
                    image.setAttribute('src', 'images-home/sodaSprings.jpg');
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