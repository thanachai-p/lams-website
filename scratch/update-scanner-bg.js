const fs = require('fs');

let scanner = fs.readFileSync('scratch/phase0-scanner.js', 'utf8');

scanner = scanner.replace(
  `if (/^background(-image)?$/i.test(prop) && /url\\(/i.test(val)) {`,
  `if ((/^background(-image)?$/i.test(prop) || /^--bg-image$/i.test(prop)) && /url\\(/i.test(val)) {`
);

fs.writeFileSync('scratch/phase0-scanner.js', scanner, 'utf8');
console.log('Updated phase0-scanner.js to recognize --bg-image as DYNAMIC_BACKGROUND');
