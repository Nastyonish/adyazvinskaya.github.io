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