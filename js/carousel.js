// Sélectionner les éléments
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');

let currentIndex = 0;
let autoSlideInterval;

// Fonction pour mettre à jour la position du carrousel
function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Fonction pour passer à l'image suivante
function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length; // Passe à l'image suivante en boucle
    updateCarousel();
}

// Fonction pour passer à l'image précédente
function showPrevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Passe à l'image précédente en boucle
    updateCarousel();
}

// Fonction pour lancer le défilement automatique
function startAutoSlide() {
    autoSlideInterval = setInterval(showNextSlide, 10000); // Change l'image toutes les 5 secondes
}

// Fonction pour arrêter le défilement automatique
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Ajouter des gestionnaires d'événements aux boutons
nextButton.addEventListener('click', () => {
    showNextSlide();
    stopAutoSlide(); // Arrête l'auto-défilement après un clic
    startAutoSlide(); // Redémarre l'auto-défilement
});

prevButton.addEventListener('click', () => {
    showPrevSlide();
    stopAutoSlide(); // Arrête l'auto-défilement après un clic
    startAutoSlide(); // Redémarre l'auto-défilement
});

// Ajuster la position initiale
updateCarousel();

// Lancer le changement automatique
startAutoSlide();
