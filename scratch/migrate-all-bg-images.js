const fs = require('fs');

const files = [
  'index.html',
  'en/index.html',
  'pages/news.html',
  'en/news.html',
  'pages/programs.html',
  'en/programs.html'
];

let totalConverted = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let fileConverted = 0;

  // Regex to match tag with class and style="background-image: url(...)"
  // or style without background-image on a separate line
  // Let's replace style="background-image: url(...) with style="--bg-image: url(...)
  // and ensure has-bg-image is on class="..."
  
  // 1. Convert style="background-image: url('...')" to style="--bg-image: url('...')"
  content = content.replace(/style="background-image:\s*(url\([^)]+\));?"/g, (match, url) => {
    fileConverted++;
    return `style="--bg-image: ${url};"`;
  });

  // 2. For elements that received --bg-image, ensure has-bg-image is in their class list
  // Matches tags like <tag ... class="something" ... style="--bg-image: ...">
  // Or <tag class="something"
  // Let's do a robust line-by-line or tag-by-tag pass
  
  // Specifically:
  // - .video-box-campaign -> .video-box-campaign has-bg-image
  // - .card-full-banner -> .card-full-banner has-bg-image
  // - .card-half-banner -> .card-half-banner has-bg-image
  // - .campus-facility-card -> .campus-facility-card has-bg-image
  // - .pride-img -> .pride-img has-bg-image
  // - .sub-pride-img -> .sub-pride-img has-bg-image
  // - .program-card-thumb -> .program-card-thumb has-bg-image

  const targetClasses = [
    'video-box-campaign',
    'card-full-banner',
    'card-half-banner',
    'campus-facility-card',
    'pride-img',
    'sub-pride-img',
    'program-card-thumb'
  ];

  targetClasses.forEach(cls => {
    // Replace class="... cls ..." with class="... cls has-bg-image ..." if not already having has-bg-image
    const regex = new RegExp(`class="([^"]*?\\b${cls}\\b[^"]*?)"`, 'g');
    content = content.replace(regex, (match, classList) => {
      if (classList.includes('has-bg-image')) return match;
      return `class="${classList} has-bg-image"`;
    });
  });

  fs.writeFileSync(file, content, 'utf8');
  console.log(`[${file}] Converted ${fileConverted} background-image styles to --bg-image + has-bg-image`);
  totalConverted += fileConverted;
});

console.log(`\nTOTAL CONVERTED ACROSS ALL FILES: ${totalConverted} (Expected: 54)`);
