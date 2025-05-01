
const heroSection = document.querySelector('.hero');

const backgrounds = [
    '/images/hero3.avif',
    '/images/hero2.avif',
    '/images/hero1.avif',
    
   
];

let currentBackground = 0;

// Function to change the background every 3 seconds
function changeBackground() {
    currentBackground = (currentBackground + 1) % backgrounds.length;
    heroSection.style.backgroundImage = `url('${backgrounds[currentBackground]}')`;
}

// Initial background
heroSection.style.backgroundImage = `url('${backgrounds[0]}')`;

// Change background every 3 seconds
setInterval(changeBackground, 3000); // 3000 ms = 3 seconds
