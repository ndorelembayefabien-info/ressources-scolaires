/**
 * Catalogue des ressources scolaires
 */

let catalogue = [];

/**
 * Charger le catalogue depuis le fichier JSON
 */
async function chargerCatalogue() {
    try {
        const response = await fetch("data/catalogue.json");

        if (!response.ok) {
            throw new Error(
                `Erreur HTTP : ${response.status}`
            );
        }

        const data = await response.json();

        catalogue = data.ressources || [];

        return catalogue;

    } catch (error) {
        console.error(
            "Impossible de charger le catalogue :",
            error
        );

        return [];
    }
}


/**
 * Récupérer les ressources d'un niveau
 */
function obtenirRessourcesParNiveau(niveau) {
    return catalogue.filter(
        ressource => ressource.niveau === niveau
    );
}


/**
 * Récupérer les ressources d'une matière
 */
function obtenirRessourcesParMatiere(matiere) {
    return catalogue.filter(
        ressource => ressource.matiere === matiere
    );
}


/**
 * Rechercher une ressource
 */
function rechercherRessources(terme) {

    const recherche = terme
        .trim()
        .toLowerCase();

    if (!recherche) {
        return catalogue;
    }

    return catalogue.filter(ressource => {

        return (
            ressource.titre.toLowerCase().includes(recherche) ||
            ressource.description.toLowerCase().includes(recherche) ||
            ressource.matiere.toLowerCase().includes(recherche) ||
            ressource.niveau.toLowerCase().includes(recherche)
        );
    });
}
/**
 * Afficher les ressources dans une zone HTML
 */
function afficherRessources(ressources, containerId) {

    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    // Vider le conteneur
    container.innerHTML = "";

    // Aucune ressource
    if (ressources.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-folder-x"></i>

                <h3>
                    Aucune ressource trouvée
                </h3>

                <p>
                    Aucune ressource ne correspond actuellement
                    à votre recherche.
                </p>
            </div>
        `;

        return;
    }


    ressources.forEach(ressource => {

        const article = document.createElement("article");

        article.className = "resource";


        article.innerHTML = `
            <strong class="type ${ressource.type}">
                ${ressource.type.toUpperCase()}
            </strong>

            <div>

                <small>
                    ${ressource.matiere} • ${formatNiveau(ressource.niveau)}
                </small>

                <h3>
                    ${ressource.titre}
                </h3>

                <p>
                    ${ressource.description}
                </p>

                <footer>

                    <span>
                        ${ressource.type.toUpperCase()}
                    </span>

                    <a
                        href="${ressource.fichier}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Consulter

                        <i
                            class="bi bi-arrow-right"
                            aria-hidden="true"
                        ></i>
                    </a>

                </footer>

            </div>
        `;


        container.appendChild(article);

    });
}


/**
 * Transformer le nom technique du niveau
 * en nom lisible.
 */
function formatNiveau(niveau) {

    const niveaux = {
        "6eme": "6ème",
        "5eme": "5ème",
        "4eme": "4ème",
        "3eme": "3ème"
    };

    return niveaux[niveau] || niveau;
}
/**
 * Initialisation de la page Collège
 */
async function initialiserPageCollege() {

    const ressources = await chargerCatalogue();

    // Garder uniquement les ressources du collège
    const ressourcesCollege = ressources.filter(
        ressource =>
            ["6eme", "5eme", "4eme", "3eme"]
                .includes(ressource.niveau)
    );

    afficherRessources(
        ressourcesCollege,
        "collegeResources"
    );
}
document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("collegeResources")) {
        initialiserPageCollege();
    }

});