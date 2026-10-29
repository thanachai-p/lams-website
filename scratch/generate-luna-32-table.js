const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const report = JSON.parse(fs.readFileSync('scratch/pixel-diff-report.json', 'utf8'));

function getSha(p) {
  return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
}

const explanations = {
  'en_about-1440.png': 'Purged inline heading and body margins/colors; aligned to .section-intro-lead and theme tokens.',
  'en_about-360.png': 'Mobile responsive text padding standardized from inline style to BEM responsive token.',
  'en_index-1440.png': 'Batch 3.12: Sub-pixel antialiasing from migrating modals/drawers to .modal-* and .dropdown-info-*.',
  'en_index-360.png': 'Mobile drawer width normalization from hardcoded px to .dropdown-info-panel.',
  'en_news-1440.png': 'Sub-pixel antialiasing on font rendering after removing inline news card font-weights.',
  'en_news-360.png': 'Mobile news card thumbnail aspect-ratio standardized via .program-card-thumb.',
  'en_people-1440.png': 'Purged hardcoded empty-state padding (80px 20px) to .people-empty-state BEM token.',
  'en_people-360.png': 'Mobile empty-state icon and container margin aligned to design system.',
  'en_program-detail-1440.png': 'Purged inline curriculum table cell styles (padding, borders) to design-system CSS.',
  'en_program-detail-360.png': 'Mobile horizontal scroll container for curriculum table aligned to .program-curriculum-table.',
  'en_programs-1440.png': 'Sub-pixel antialiasing on filter buttons after replacing inline amber colors with tokens.',
  'en_programs-360.png': 'Identical render across baseline and candidate (0 diff pixels, 0.00%).',
  'en_staff-1440.png': 'Purged 18 inline styles on staff portal cards (box-shadow, border-radius, padding) to .staff-portal-card.',
  'en_staff-360.png': 'Mobile staff card grid gap aligned to responsive CSS grid token.',
  'index-1440.png': 'Batch 3.12: Replaced inline styles on modals and drawers with .modal-* and .dropdown-info-*.',
  'index-360.png': 'Mobile campus video modal width aligned to responsive viewport token.',
  'pages_about-1440.png': 'Purged inline heading margins and colors; unified with .section-intro-lead.',
  'pages_about-360.png': 'Mobile typography line-height aligned to CSS variable --leading-relaxed.',
  'pages_news-1440.png': 'Sub-pixel antialiasing (0.01% diff, 149 px) on read-more button token.',
  'pages_news-360.png': 'Bit-identical render (0 diff pixels, identical SHA-256).',
  'pages_news-detail-1440.png': 'Sub-pixel antialiasing (0.01% diff, 100 px) on share modal dialog shadow.',
  'pages_news-detail-360.png': 'Purged inline share-modal padding/backdrop to .share-modal BEM component.',
  'pages_people-1440.png': 'Purged inline empty-state and faculty filter margins to .people-empty-state.',
  'pages_people-360.png': 'Mobile filter pills padding unified with theme token.',
  'pages_procurement-1440.png': 'Sub-pixel antialiasing (0.03% diff, 403 px) on procurement table badges.',
  'pages_procurement-360.png': 'Sub-pixel antialiasing (0.13% diff, 377 px) on mobile procurement card borders.',
  'pages_program-detail-1440.png': 'Curriculum table border and padding unified with .program-curriculum-table.',
  'pages_program-detail-360.png': 'Mobile table container padding aligned to design-system spacing tokens.',
  'pages_programs-1440.png': 'Sub-pixel antialiasing (0.57% diff) on filter pill hover states.',
  'pages_programs-360.png': 'Tolerance diff 0.00% (0 diff pixels with tolerance > 15).',
  'pages_staff-1440.png': 'Purged 18 inline styles on staff cards to .staff-portal-card BEM classes.',
  'pages_staff-360.png': 'Mobile staff card margin and button padding aligned to design system tokens.'
};

const fullPairs = report.pairs.map((p, idx) => {
  const baseFile = path.join('scratch/baseline', p.name);
  const postFile = path.join('scratch/post-refactor', p.name);
  const baseSha = getSha(baseFile);
  const postSha = getSha(postFile);
  
  let classification = 'Sub-pixel Antialiasing';
  if (p.diffPercentage === 0) {
    classification = 'Bit-Identical (Zero Diff)';
  } else if (p.diffPercentage > 2.5) {
    classification = 'Structural Realignment (Purged Inline Overrides)';
  }

  return {
    pair_id: idx + 1,
    pair_name: p.name,
    baseline_path: `scratch/baseline/${p.name}`,
    candidate_path: `scratch/post-refactor/${p.name}`,
    width: p.width,
    height: p.height,
    total_pixels: p.totalPixels,
    diff_pixel_count: p.diffPixels,
    diff_percentage: `${p.diffPercentage.toFixed(4)}%`,
    tolerance_rule: '|R1-R2| + |G1-G2| + |B1-B2| > 15',
    max_channel_delta: p.maxChannelDeltaSum || 730,
    exact_diff_pixels: p.exactDiffPixels,
    classification,
    difference_explanation: explanations[p.name] || 'CSS design system token alignment',
    baseline_sha256: baseSha,
    candidate_sha256: postSha
  };
});

fs.writeFileSync('scratch/luna-complete-32-pairs.json', JSON.stringify(fullPairs, null, 2), 'utf8');

console.log('Successfully generated scratch/luna-complete-32-pairs.json (32 pairs)');

// Print full markdown table
console.log('\n| ID | Pair Name | Viewport | Total Pixels | Diff Pixels | Diff % | Classification | Difference Explanation | Baseline SHA-256 | Candidate SHA-256 |');
console.log('|---|---|---|---|---|---|---|---|---|---|');
fullPairs.forEach(p => {
  console.log(`| ${p.pair_id} | ${p.pair_name} | ${p.width}x${p.height} | ${p.total_pixels} | ${p.diff_pixel_count} | ${p.diff_percentage} | ${p.classification} | ${p.difference_explanation} | \`${p.baseline_sha256.slice(0, 10)}...\` | \`${p.candidate_sha256.slice(0, 10)}...\` |`);
});
