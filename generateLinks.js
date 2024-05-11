const fs = require('fs');
const path = require('path');

const folders = [
  'EE',
  'SIN',
  'ITEC',
  'Physique',
  'Maths',
  'Philo',
  'Anglais',
  'Histoire',
  'Espagnol'
];

const indexBaseHtmlPath = './index-base.html';
const indexHtmlPath = './index.html';

const links = folders.map(folder => {
  const folderPath = `./${folder}`;
  const htmlFiles = getHTMLFiles(folderPath);
  const formattedLinks = htmlFiles.map(file => {
    const fileName = path.basename(file, '.html');
    const linkName = fileName.replace(/_/g, ' ');
    return `<a href="${folder}/${fileName}.html">${linkName}</a>`;
  });
  return formattedLinks.join('');
});

function getHTMLFiles(dir) {
  let files = [];
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const itemPath = path.join(dir, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();
    if (isDirectory) {
      files = files.concat(getHTMLFiles(itemPath));
    } else if (item.endsWith('.html')) {
      files.push(itemPath);
    }
  });
  return files;
}

fs.readFile(indexBaseHtmlPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading index-base.html:', err);
    return;
  }

  const modifiedData = data.replace(/<!--liens (\w+)-->/g, (_, matiere) => {
    const linksForMatiere = links[folders.indexOf(matiere)];
    return linksForMatiere ? linksForMatiere : '';
  });

  fs.writeFile(indexHtmlPath, modifiedData, 'utf8', err => {
    if (err) {
      console.error('Error writing index.html:', err);
      return;
    }
    console.log('Links added to index.html');
  });
});
