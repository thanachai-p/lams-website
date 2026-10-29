const fs = require('fs');

// 1. Update css/components.css
let css = fs.readFileSync('css/components.css', 'utf8');
css = css.replace(
  /\.card-full-banner \{([\s\S]*?)cursor: pointer;/,
  '.card-full-banner {$1cursor: pointer;\n  text-decoration: none;'
);
css = css.replace(
  /\.card-half-banner \{([\s\S]*?)cursor: pointer;/,
  '.card-half-banner {$1cursor: pointer;\n  text-decoration: none;'
);
fs.writeFileSync('css/components.css', css, 'utf8');
console.log('Updated css/components.css with text-decoration: none on banners');

// 2. Strip ; text-decoration: none; and ; cursor: pointer; from banner styles in index.html and en/index.html
['index.html', 'en/index.html'].forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/; text-decoration: none;/g, ';');
  html = html.replace(/; cursor: pointer;/g, ';');
  fs.writeFileSync(file, html, 'utf8');
  console.log(`Cleaned banner styles in ${file}`);
});
