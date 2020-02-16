let lastModif = document.lastModified;
document.getElementById('lastModified').innerHTML = lastModif;

function Menu() {
    document.getElementById("menu").classList.toggle("hide")
}

let d = new Date();
let week = d.getDay();
if(week !== 5) {
    document.getElementById("promo").style.display = "none";
}

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