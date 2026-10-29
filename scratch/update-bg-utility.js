const fs = require('fs');

let css = fs.readFileSync('css/components.css', 'utf8');

const oldBlock = `/* 1. Safe Dynamic Background Pattern (GLM-5.3) */
.has-bg-image {
  background-image:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.55)),
    var(--bg-image, none),
    linear-gradient(135deg, var(--surface-header, #0E0204) 0%, var(--surface-page, #140406) 100%);
  background-color: var(--surface-page, #140406);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: var(--text-primary, #ffffff);
}`;

const newBlock = `/* 1. Safe Dynamic Background Pattern (GLM-5.3 & Qwen 3.7 Plus) */
.has-bg-image {
  background-image: var(--bg-image, none);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.has-bg-image--scrim {
  background-image:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.55)),
    var(--bg-image, none),
    linear-gradient(135deg, var(--surface-header, #0E0204) 0%, var(--surface-page, #140406) 100%);
  background-color: var(--surface-page, #140406);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: var(--text-primary, #ffffff);
}`;

// Normalize linebreaks for matching
const normalizedCss = css.replace(/\r\n/g, '\n');
const normalizedOld = oldBlock.replace(/\r\n/g, '\n');

if (normalizedCss.includes(normalizedOld)) {
  css = normalizedCss.replace(normalizedOld, newBlock.replace(/\r\n/g, '\n'));
  fs.writeFileSync('css/components.css', css, 'utf8');
  console.log('Successfully updated .has-bg-image and added .has-bg-image--scrim');
} else {
  console.error('Could not find target block in components.css');
}
