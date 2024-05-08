const express = require('express');
const path = require('path');

const app = express();

// Servir les fichiers statiques à partir du répertoire public
app.use(express.static(path.join(__dirname, 'public')));

// Lorsque vous accédez à la racine, servez index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrer le serveur sur le port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
