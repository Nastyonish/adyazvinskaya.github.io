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