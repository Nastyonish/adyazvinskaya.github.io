// Last Modification
let lastModif = document.lastModified;
document.getElementById('lastModified').innerHTML = lastModif;

//
const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const prophets = jsonObject['prophets'];
    console.table(jsonObject); // temporary checking for valid response and data parsing
    for (let i = 0; i < prophets.length; i++) {
      let card = document.createElement('section');
      let h2 = document.createElement('h2');
      let div1 = document.createElement('div');
      let div2 = document.createElement('div');
      let image = document.createElement('img');

      h2.textContent = prophets[i].name + ' ' + prophets[i].lastname;
      div1.textContent = 'Birth date: ' + prophets[i].birthdate;
      div2.textContent = 'Birth Place: ' + prophets[i].birthplace;
      image.setAttribute('src', prophets[i].imageurl);
      image.setAttribute('alt', prophets[i].name + ' ' + prophets[i].lastname + ' - ' + prophets[i].order)

      card.appendChild(h2);
      card.appendChild(div1);
      card.appendChild(div2);
      card.appendChild(image);

      document.querySelector('div.cards').appendChild(card);
    }
  });