// Last Modifications
let lastModif = document.lastModified;
document.getElementById('lastModified').innerHTML = lastModif;

// Menu
function Menu() {
    document.getElementById("menu").classList.toggle("hide")
}

let d = new Date();
let week = d.getDay();
if(week !== 5) {
    document.getElementById("promo").style.display = "none";
}

// Lazyload
const imagesToLoad = document.querySelectorAll("img[data-src]");

const imgOptions = {
    threshold: 1,
    rootMargin: "0px 0px 0px 0px"
};

const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {image.removeAttribute('data-src');};
};


if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((items, observer) => {
        items.forEach((item => {
            if (item.isIntersecting) {
                loadImages(item.target)
                observer.unobserve(item.target)
            }
        }))
    }, imgOptions);

    imagesToLoad.forEach(img => {
        imgObserver.observe(img);
    });
} 
else {
    imagesToLoad.forEach(img => {
        loadImages(img)
    })
}