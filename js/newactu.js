// Fonction pour charger les news depuis le fichier JSON
async function loadNews() {
    const container = document.getElementById("news-container");
    const searchInput = document.getElementById("search-input");
    let allNews = []; // Stocker toutes les actualités pour la recherche

    try {
        // Charger les données du fichier JSON
        const response = await fetch('./src/data/news.json');
        allNews = await response.json();

        // Fonction pour trier les actualités par date décroissante
        function sortNewsByDate(news) {
            return news.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        // Fonction pour afficher les actualités
        function displayNews(news) {
            container.innerHTML = ""; // Efface les actualités actuelles
            if (news.length === 0) {
                container.innerHTML = "<p>Aucune actualité trouvée.</p>";
                return;
            }
            news.forEach(article => {
                const newsItem = document.createElement('article');
                newsItem.classList.add('news-item');

                newsItem.innerHTML = `
                    <h3>${article.title}</h3>
                    <p><strong>Date : </strong>${article.date}</p>
                    <p>${article.txt}</p>
                `;
                container.appendChild(newsItem);
            });
        }

        // Trier les actualités par date décroissante
        const sortedNews = sortNewsByDate(allNews);

        // Afficher toutes les actualités triées au départ
        displayNews(sortedNews);

        // Ajouter un écouteur pour la recherche
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase(); // Récupère la valeur de recherche
            const filteredNews = sortedNews.filter(article =>
                article.title.toLowerCase().includes(query) ||
                article.txt.toLowerCase().includes(query) ||
                article.date.includes(query)
            );
            displayNews(filteredNews); // Affiche les actualités filtrées
        });
    } catch (error) {
        container.innerHTML = '<p>Impossible de charger les actualités pour le moment.</p>';


        console.error("Erreur lors du chargement des news :", error);
    }

    // Sélection des éléments
    const loupLogo = document.getElementById('loup-logo');
    const searchBar = document.getElementById('search-bar');

    // Ajouter un événement de clic sur le logo
    loupLogo.addEventListener('click', () => {
        // Basculer la visibilité de la barre de recherche avec un effet de fade
        if (searchBar.classList.contains('hidden')) {
            searchBar.classList.remove('hidden');
            searchBar.classList.add('visible');
        } else {
            searchBar.classList.remove('visible');
            searchBar.classList.add('hidden');
        }
    });
}

// Charger les news au chargement de la page
document.addEventListener('DOMContentLoaded', loadNews);
