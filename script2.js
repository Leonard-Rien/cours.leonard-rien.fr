document.addEventListener("DOMContentLoaded", function () {
  const accordionItemBodies = document.querySelectorAll(".bloc-body");

  // Désactiver les transitions CSS
  accordionItemBodies.forEach((accordionItemBody) => {
    accordionItemBody.style.transition = "none";
  });

  const accordionItemHeaders = document.querySelectorAll(".bloc-header");

  accordionItemHeaders.forEach((accordionItemHeader) => {
    const accordionItemBody = accordionItemHeader.nextElementSibling;

    // Ajoute la classe "active" à l'accordéon au démarrage
    //accordionItemHeader.classList.add("active");
    // accordionItemBody.classList.add("active");

    // Si la classe "active" est présente, définir la hauteur maximale pour afficher le contenu
    if (accordionItemHeader.classList.contains("active")) {
      // Calculer la hauteur totale de tous les enfants pour l'ajouter à la hauteur de l'accordéon parent
      let totalHeight = calculateTotalHeight(accordionItemBody);

      accordionItemBody.style.maxHeight = totalHeight + "px";
    }
  });

  accordionItemHeaders.forEach((accordionItemHeader) => {
    accordionItemHeader.addEventListener("click", (event) => {
      const accordionItemBody = accordionItemHeader.nextElementSibling;

      // Toggle la classe "active" sur l'élément .bloc-header
      accordionItemHeader.classList.toggle("active");

      // Toggle la classe "active" sur l'élément .bloc-body
      accordionItemBody.classList.toggle("active");

      // Si la classe "active" est présente, définir la hauteur maximale pour afficher le contenu
      if (accordionItemHeader.classList.contains("active")) {
        // Calculer la hauteur totale de tous les enfants pour l'ajouter à la hauteur de l'accordéon parent
        let totalHeight = calculateTotalHeight(accordionItemBody);

        accordionItemBody.style.maxHeight = totalHeight + "px";
      } else {
        // Sinon, réinitialiser la hauteur maximale à 0 pour masquer le contenu
        accordionItemBody.style.maxHeight = 0;
      }
    });
  });

  // Réactiver les transitions CSS après que les éléments aient été initialisés
  setTimeout(function () {
    accordionItemBodies.forEach((accordionItemBody) => {
      accordionItemBody.style.transition = "";
    });
  }, 100); // Changer cette valeur en fonction de la durée de votre animation CSS
});

function calculateTotalHeight(element) {
  let totalHeight = element.scrollHeight;

  // Itérer à travers tous les enfants
  const children = element.querySelectorAll(".bloc-body");
  children.forEach((child) => {
    totalHeight += calculateTotalHeight(child);
  });

  return totalHeight;
}

class BlocDefinition extends HTMLElement {
  constructor() {
    super();

    const titre = this.getAttribute("titre") || "";
    let contenu = "";

    // Récupérer le contenu des éléments enfants
    this.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Si l'enfant est un élément HTML, le contenu sera ajouté à contenu
        contenu += node.outerHTML;
      } else if (node.nodeType === Node.TEXT_NODE) {
        // Si l'enfant est un nœud de texte, le contenu sera ajouté tel quel
        contenu += node.textContent;
      }
    });

    this.innerHTML = `
      <div class="bloc">
        <button class="bloc-header">${titre}</button>
        <div class="bloc-body">
          <div class="bloc-body-content">${contenu}</div>
        </div>
      </div>`;
  }
}

customElements.define("bloc-", BlocDefinition);
