// Variable pour suivre l'image actuellement affichée dans la lightbox
let currentImageSrc = null;

// Ouvrir la lightbox avec l'image cliquée
function openLightbox(imgSrc) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    
    // Vérifier si l'image cliquée est déjà affichée
    if (imgSrc === currentImageSrc) {
        closeLightbox(); // Fermer la lightbox si c'est la même image
        return; // Sortir de la fonction pour éviter de la rouvrir
    }
    
    // Modifier la source de l'image dans la lightbox pour qu'elle soit celle de l'image cliquée
    lightboxImg.src = imgSrc;
    
    // Afficher la lightbox en ajoutant la classe 'show' pour activer les animations
    lightbox.style.display = "flex";
    setTimeout(() => {
        lightbox.style.opacity = 1; // Rendre la lightbox visible
        lightbox.classList.add('show'); // Activer l'animation de zoom de l'image
    }, 10);
    
    // Mettre à jour la variable pour suivre l'image actuelle
    currentImageSrc = imgSrc;
}

// Fermer la lightbox
function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    
    // Cacher la lightbox avec un fade-out
    lightbox.style.opacity = 0;
    lightbox.classList.remove('show'); // Désactiver l'animation de zoom
    
    setTimeout(() => {
        lightbox.style.display = "none"; // Masquer complètement après l'animation
    }, 300); // Correspond à la durée de l'animation
    
    // Réinitialiser la variable pour l'image affichée
    currentImageSrc = null;
}

// Ajouter un événement de clic à chaque image dans la galerie
document.querySelectorAll('.photo-thumb').forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = item.src; // Récupérer l'URL de l'image cliquée
        openLightbox(imgSrc); // Ouvrir la lightbox avec cette image
    });
});

// Ajouter un événement de clic sur la zone sombre (background) pour fermer la lightbox
document.getElementById("lightbox").addEventListener('click', function(e) {
    // Vérifier si l'utilisateur a cliqué sur la zone sombre, pas sur l'image
    if (e.target === this) {
        closeLightbox(); // Fermer la lightbox si la zone sombre est cliquée
    }
});
