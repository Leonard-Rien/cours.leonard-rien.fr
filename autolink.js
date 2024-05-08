document.addEventListener('DOMContentLoaded', function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/', true); // Accéder à la racine du projet
  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
          var files = JSON.parse(xhr.responseText);
          files.forEach(function(file) {
              var link = document.createElement('a');
              link.href = './' + file; // Ajouter l'extension .html ici si nécessaire
              link.textContent = file.replace('.html', ''); // Retirer l'extension .html du texte du lien
              
              // Trouver le dossier parent en fonction du nom du fichier
              var parentFolder = getParentFolder(file);
              if (parentFolder) {
                  // Déterminer le bloc parent en fonction du dossier de la page
                  var parentBlock = determineParentBlock(parentFolder);
                  if (parentBlock) {
                      parentBlock.appendChild(link);
                  } else {
                      console.error("Aucun bloc parent trouvé pour le dossier : ", parentFolder);
                  }
              } else {
                  console.error("Impossible de trouver le dossier parent pour le fichier : ", file);
              }
          });
      }
  };
  xhr.send();

  // Fonction pour extraire le dossier parent à partir du nom du fichier
  function getParentFolder(file) {
      var parts = file.split("/");
      if (parts.length >= 2) {
          return parts[1]; // Le deuxième élément du chemin après le './'
      } else {
          return null;
      }
  }

  // Fonction pour déterminer le bloc parent en fonction du dossier de la page
  function determineParentBlock(folder) {
      // Créer un objet de correspondance entre les dossiers et les classes de bloc
      var folderToBlockClass = {
          "Maths": "bloc_Maths",
          "Philosophie": "bloc_Philo",
          // Ajouter d'autres correspondances si nécessaire
      };

      // Vérifier si le dossier a une correspondance de classe de bloc
      if (folderToBlockClass.hasOwnProperty(folder)) {
          // Trouver l'élément bloc avec la classe correspondante
          return document.querySelector('.' + folderToBlockClass[folder]);
      } else {
          return null; // Aucun bloc parent trouvé
      }
  }
});
