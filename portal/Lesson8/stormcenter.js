// Last Modification
let lastModif = document.lastModified;
document.getElementById('lastModified').innerHTML = lastModif;

// Menu
function Menu() {
    document.getElementById("menu").classList.toggle("hide")
}

// Storm severity
function StormSeverity(severity) {
    document.getElementById("stormseverity").innerHTML = severity;
}