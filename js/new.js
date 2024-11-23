// Fonction pour charger les news depuis le fichier JSON
async function loadNews() {
    const container = document.getElementById("news-container");

    try {
        // Charger les données du fichier JSON
        const response = await fetch('/src/data/news.json'); // Assurez-vous du chemin
        const news = await response.json();

        // Trier les actualités par date (si elles ne sont pas déjà triées)
        const sortedNews = news.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Ne conserver que les 3 dernières actualités
        const latestNews = sortedNews.slice(0, 3);

        // Générer le HTML pour chaque news
        latestNews.forEach(article => {
            const newsItem = document.createElement('article');
            newsItem.classList.add('news-item');

            newsItem.innerHTML = `
                <h3>${article.title}</h3>
                <p><strong>Date : </strong>${article.date}</p>
                <p>${article.content}</p>
                <a href="${article.link}">Lire la suite</a>
            `;

            container.appendChild(newsItem);
        });
    } catch (error) {
        container.innerHTML = "<p>Impossible de charger les actualités pour le moment.</p>";
        console.error("Erreur lors du chargement des news :", error);
    }
}

// Charger les news au chargement de la page
document.addEventListener('DOMContentLoaded', loadNews);
