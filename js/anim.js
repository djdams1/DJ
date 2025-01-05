// script.js

// Fonction pour ajouter la classe fade-out avant de naviguer
function addTransition(event) {
    event.preventDefault(); // Empêche le comportement par défaut (navigation immédiate)
    document.body.classList.add('fade-out');

    // Attends la fin de la transition avant de charger la nouvelle page
    setTimeout(() => {
        window.location = event.target.href; // Change la page après la transition
    }, 500); // Le temps correspond à la durée de la transition CSS
}

// Applique la fonction sur les liens de transition
const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('click', addTransition);
});

// Ajouter fade-in lorsque le contenu de la page apparaît
window.addEventListener('load', () => {
    document.body.classList.add('fade-in');
});
