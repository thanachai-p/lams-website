/**
 * LAMS Website - Architecture & Design System Quality Gate
 * Enforces pure static HTML/CSS/JS architecture, asset parity, zero legacy artifacts.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const TARGET_FONT_KEY = 'Prompt:wght@300;400;500;600;700;800;900';
const TARGET_VERSION = '20261029_0900';

const thPages = [
  'index.html',
  'pages/about.html',
  'pages/news.html',
  'pages/news-detail.html',
  'pages/people.html',
  'pages/procurement.html',
  'pages/program-detail.html',
  'pages/programs.html',
  'pages/staff.html'
];

const enPages = [
  'en/index.html',
  'en/about.html',
  'en/news.html',
  'en/people.html',
  'en/program-detail.html',
  'en/programs.html',
  'en/staff.html'
];

const allPages = [...thPages, ...enPages];
const cssFiles = ['css/style.css', 'css/components.css', 'css/pages.css'];
const jsFiles = ['js/main.js'];

let errors = [];
let warnings = [];

function assert(condition, message) {
  if (!condition) {
    errors.push(message);
    console.error('❌ FAIL:', message);
  }
}

function warn(condition, message) {
  if (!condition) {
    warnings.push(message);
    console.warn('⚠️ WARN:', message);
  }
}

console.log('=== LAMS ARCHITECTURAL AUDIT & PRE-DEPLOYMENT GATE ===\n');

// 1. File existence & page count
console.log('1. Verifying all 16 pages exist...');
assert(allPages.length === 16, `Expected exactly 16 HTML pages, got ${allPages.length}`);
for (const p of allPages) {
  assert(fs.existsSync(path.join(rootDir, p)), `Missing page: ${p}`);
}

// 2. Font link unification
console.log('2. Verifying Google Font links (Prompt 300-900, zero Plus Jakarta Sans)...');
for (const p of allPages) {
  const content = fs.readFileSync(path.join(rootDir, p), 'utf8');
  assert(content.includes(TARGET_FONT_KEY), `${p} is missing unified Prompt 300-900 font link`);
  assert(!content.includes('Plus Jakarta Sans') && !content.includes('Plus+Jakarta+Sans'), `${p} still references Plus Jakarta Sans`);
}

// 3. Cache busting query ?v= unification
console.log('3. Verifying unified ?v= cache strings across CSS & JS...');
for (const p of allPages) {
  const content = fs.readFileSync(path.join(rootDir, p), 'utf8');
  const vMatches = [...content.matchAll(/\?v=([^\s"'>]+)/g)].map(m => m[1]);
  for (const v of vMatches) {
    assert(v === TARGET_VERSION, `${p} has mismatched cache version ?v=${v} (expected ${TARGET_VERSION})`);
  }
  // Check index.html includes pages.css
  if (p === 'index.html') {
    assert(content.includes('css/pages.css?v=' + TARGET_VERSION), 'index.html is missing css/pages.css link');
  }
}

// 4. Forbidden legacy aliases & unused variables
console.log('4. Verifying CSS custom property tokens & zero legacy aliases...');
const styleCss = fs.readFileSync(path.join(rootDir, 'css/style.css'), 'utf8');
const forbiddenVars = [
  '--psu-navy', '--psu-blue', '--psu-teal', '--psu-cyan', '--psu-gold', '--psu-gold-dark',
  '--bu-dark-bg', '--bu-card-dark', '--bu-header-bg', '--bu-gray-band', '--bu-footer-bg',
  '--text-white', '--text-light'
];
for (const v of forbiddenVars) {
  assert(!styleCss.includes(`${v}:`), `css/style.css still defines obsolete alias: ${v}`);
}

const allCode = [...allPages, ...cssFiles, ...jsFiles]
  .map(f => fs.readFileSync(path.join(rootDir, f), 'utf8'))
  .join('\n');

for (const v of forbiddenVars) {
  const regex = new RegExp(`var\\(\\s*${v}\\s*\\)`, 'g');
  assert(!regex.test(allCode), `Codebase still references obsolete alias var(${v})`);
}

// 5. Forbidden legacy class names
console.log('5. Verifying zero legacy class names...');
const forbiddenClasses = [
  'header-bu', 'nav-links-bu', 'logo-bu-box', 'logo-bu-icon', 'footer-flex-bu',
  'navy-accordion-section', 'navy-links-grid', 'navy-col',
  'hero-bu', 'courses-section-bu', 'grid-cards-bu'
];
for (const cls of forbiddenClasses) {
  const regex = new RegExp(`\\b${cls}\\b`, 'g');
  assert(!regex.test(allCode), `Codebase still contains legacy class: .${cls}`);
}

// 6. Zero dev logs & zero var fallbacks
console.log('6. Verifying clean production scripts (zero console.log, zero var hex fallbacks)...');
const mainJs = fs.readFileSync(path.join(rootDir, 'js/main.js'), 'utf8');
assert(!mainJs.includes('console.log('), 'js/main.js still contains console.log');

const varHexFallbacks = allCode.match(/var\(--[\w-]+,\s*#[0-9a-fA-F]{3,8}\)/g);
assert(!varHexFallbacks, `Codebase still contains var() with hardcoded hex fallbacks: ${varHexFallbacks}`);

// 7. HTML lang & semantics integrity
console.log('7. Verifying HTML semantics, lang tags, and accessible headings...');
for (const p of allPages) {
  const content = fs.readFileSync(path.join(rootDir, p), 'utf8');
  const expectedLang = p.startsWith('en/') ? 'en' : 'th';
  assert(content.includes(`<html lang="${expectedLang}">`), `${p} lang tag does not match expected: ${expectedLang}`);
  assert(/<title[^>]*>[^<]+<\/title>/i.test(content), `${p} has missing or empty <title> tag`);
  assert(/<header\s+class=["'][^"']*site-header/i.test(content), `${p} missing .site-header`);
  assert(/<footer\s+class=["'][^"']*site-footer/i.test(content), `${p} missing .site-footer`);
}

// Summary
console.log('\n======================================================');
if (errors.length === 0) {
  console.log(`✅ ALL ARCHITECTURAL QUALITY GATES PASSED! (0 errors, ${warnings.length} warnings)`);
  process.exit(0);
} else {
  console.error(`❌ FAILED WITH ${errors.length} ERRORS!`);
  process.exit(1);
}
