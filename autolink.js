document.addEventListener('DOMContentLoaded', function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/', true); // Remplacez '/directory' par l'URL de votre script côté serveur ou le répertoire qui expose les fichiers
  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
          var files = JSON.parse(xhr.responseText);
          files.forEach(function(file) {
              var link = document.createElement('a');
              link.href = './' + file; // Ajouter l'extension .html ici si nécessaire
              link.textContent = file.replace('.html', ''); // Retirer l'extension .html du texte du lien
              document.body.appendChild(link); // Ajouter le lien à votre page HTML
              document.body.appendChild(document.createElement('br')); // Ajouter un saut de ligne entre les liens
          });
      }
  };
  xhr.send();
});
