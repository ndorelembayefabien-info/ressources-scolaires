document.addEventListener("DOMContentLoaded", function () {
    // Gestion du formulaire de la newsletter (footer)
    const newsletterForm = document.querySelector(".newsletter-form");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const input = this.querySelector('input[type="email"]');
            if (input && input.value.trim() !== "") {
                alert("✅ Merci pour votre abonnement ! Vous recevrez bientôt nos ressources.");
                input.value = "";
            } else {
                alert("⚠️ Veuillez entrer une adresse e-mail valide.");
            }
        });
    }

    // Simulation de téléchargement (boutons avec la classe .dl-btn)
    const dlBtns = document.querySelectorAll(".dl-btn");
    dlBtns.forEach((btn) => {
        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            alert("📥 Téléchargement simulé : " + this.closest(".resource-item")?.querySelector(".resource-info h5")?.innerText || "Fichier");
        });
    });
});