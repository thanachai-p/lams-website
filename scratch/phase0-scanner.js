/**
 * Phase 0 Defensive HTML AST & Style Scanner
 * Co-Authored by: GLM-5.3 (Defensive Logic), Qwen 3.7 Plus (Architecture) & Gemini 3.8 Flash (Runner)
 * Target: 16 HTML files in LAMS PSU Surat Thani Website
 */

const fs = require('fs');
const path = require('path');

const EXPECTED_FILES = 16;
const SCRATCH_DIR = path.join(__dirname);

// 1. Recursive file discovery excluding node_modules, .git, scratch
function findHtmlFiles(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (['node_modules', '.git', 'scratch', '.vscode'].includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtmlFiles(fullPath, fileList);
    } else if (entry.isFile() && /\.html?$/i.test(entry.name)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

// 2. Declaration splitter respecting quotes and parentheses (e.g. data URI, url())
function splitDeclarations(styleText) {
  const parts = [];
  let cur = '';
  let depth = 0;
  let quote = null;
  for (let i = 0; i < styleText.length; i++) {
    const ch = styleText[i];
    if (quote) {
      cur += ch;
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      cur += ch;
      continue;
    }
    if (ch === '(') {
      depth++;
      cur += ch;
      continue;
    }
    if (ch === ')') {
      depth = Math.max(0, depth - 1);
      cur += ch;
      continue;
    }
    if (ch === ';' && depth === 0) {
      if (cur.trim()) parts.push(cur.trim());
      cur = '';
      continue;
    }
    cur += ch;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

// 3. Robust HTML Tag and Attribute Parser
function parseHtmlAttributes(tagSnippet) {
  const attrs = [];
  let i = 0;
  // skip tag name
  while (i < tagSnippet.length && !/\s/.test(tagSnippet[i])) i++;

  while (i < tagSnippet.length) {
    while (i < tagSnippet.length && /\s/.test(tagSnippet[i])) i++;
    if (i >= tagSnippet.length || tagSnippet[i] === '>' || tagSnippet[i] === '/') break;

    // attribute name
    let nameStart = i;
    while (i < tagSnippet.length && /[^\s=/>]/.test(tagSnippet[i])) i++;
    const name = tagSnippet.slice(nameStart, i).toLowerCase();

    while (i < tagSnippet.length && /\s/.test(tagSnippet[i])) i++;
    let val = '';
    if (i < tagSnippet.length && tagSnippet[i] === '=') {
      i++; // skip '='
      while (i < tagSnippet.length && /\s/.test(tagSnippet[i])) i++;
      if (i < tagSnippet.length && (tagSnippet[i] === '"' || tagSnippet[i] === "'")) {
        const q = tagSnippet[i++];
        const valStart = i;
        while (i < tagSnippet.length && tagSnippet[i] !== q) i++;
        val = tagSnippet.slice(valStart, i);
        if (i < tagSnippet.length) i++; // skip close quote
      } else {
        const valStart = i;
        while (i < tagSnippet.length && /[^\s>]/.test(tagSnippet[i])) i++;
        val = tagSnippet.slice(valStart, i);
      }
    }
    if (name) attrs.push({ name, value: val });
  }
  return attrs;
}

// 4. CSV Escaper (RFC 4180)
function csvEscape(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

// 5. Main Scanner
function scanFile(filePath, rootDir) {
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  // Line index helper
  function getLineCol(offset) {
    let line = 1;
    let col = 1;
    for (let k = 0; k < offset; k++) {
      if (content[k] === '\n') {
        line++;
        col = 1;
      } else {
        col++;
      }
    }
    return { line, col };
  }

  const inlineStyles = [];
  const linkStylesheets = [];
  const styleBlocks = [];
  const dynamicScriptMatches = [];

  // A. Scan <style>...</style> blocks
  const styleTagRegex = /<style\b([^>]*)>([\s\S]*?)<\/style>/gi;
  let stMatch;
  while ((stMatch = styleTagRegex.exec(content)) !== null) {
    const loc = getLineCol(stMatch.index);
    styleBlocks.push({
      line: loc.line,
      attrs: stMatch[1].trim(),
      charLength: stMatch[2].length,
      snippet: stMatch[2].trim().slice(0, 150)
    });
  }

  // B. Scan <script>...</script> for dynamic DOM style patterns
  const scriptTagRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let scMatch;
  while ((scMatch = scriptTagRegex.exec(content)) !== null) {
    const scBody = scMatch[2];
    const scStartOffset = scMatch.index;
    
    // Pattern 1: .style. or .style[
    const stylePropRegex = /\.style\s*(\.[a-zA-Z0-9_$]+|\[['"][^'"]+['"]\])\s*=/g;
    let pMatch;
    while ((pMatch = stylePropRegex.exec(scBody)) !== null) {
      const loc = getLineCol(scStartOffset + pMatch.index);
      dynamicScriptMatches.push({
        type: 'STYLE_PROPERTY_ASSIGN',
        line: loc.line,
        match: pMatch[0],
        context: scBody.slice(Math.max(0, pMatch.index - 30), Math.min(scBody.length, pMatch.index + 50)).trim()
      });
    }

    // Pattern 2: setAttribute('style', ...)
    const setAttrRegex = /setAttribute\s*\(\s*(['"])style\1\s*,/g;
    while ((pMatch = setAttrRegex.exec(scBody)) !== null) {
      const loc = getLineCol(scStartOffset + pMatch.index);
      dynamicScriptMatches.push({
        type: 'SET_ATTRIBUTE_STYLE',
        line: loc.line,
        match: pMatch[0],
        context: scBody.slice(Math.max(0, pMatch.index - 30), Math.min(scBody.length, pMatch.index + 50)).trim()
      });
    }
  }

  // C. Scan HTML tags for <link> and style="..."
  const tagRegex = /<([a-zA-Z0-9:-]+)\b([^>]*)>/g;
  let tMatch;
  let attrSeq = 0;

  while ((tMatch = tagRegex.exec(content)) !== null) {
    const tagName = tMatch[1].toLowerCase();
    const rawAttrs = tMatch[2];
    const tagLoc = getLineCol(tMatch.index);

    if (tagName === 'style' || tagName === 'script' || tagName.startsWith('!--')) {
      continue;
    }

    const attrs = parseHtmlAttributes(tagName + ' ' + rawAttrs);
    const idAttr = (attrs.find(a => a.name === 'id') || {}).value || '';
    const classAttr = (attrs.find(a => a.name === 'class') || {}).value || '';

    // Check <link rel="stylesheet">
    if (tagName === 'link') {
      const rel = (attrs.find(a => a.name === 'rel') || {}).value || '';
      const href = (attrs.find(a => a.name === 'href') || {}).value || '';
      if (/stylesheet/i.test(rel) || /\.css(\?|$)/i.test(href)) {
        let vParam = null;
        const vMatch = /[?&]v=([^&#]+)/.exec(href);
        if (vMatch) vParam = vMatch[1];

        linkStylesheets.push({
          line: tagLoc.line,
          rel,
          href,
          fileName: path.basename(href.split('?')[0]),
          versionParam: vParam,
          hasVersion: !!vParam
        });
      }
    }

    // Check style="..."
    const styleAttr = attrs.find(a => a.name === 'style');
    if (styleAttr && styleAttr.value) {
      attrSeq++;
      const rawVal = styleAttr.value;
      const decls = splitDeclarations(rawVal);

      const parsedDecls = [];
      let hasBg = false;
      let hasToggle = false;
      let hasHardcoded = false;

      decls.forEach((d, dIdx) => {
        const colonIdx = d.indexOf(':');
        if (colonIdx === -1) return;
        const prop = d.slice(0, colonIdx).trim().toLowerCase();
        const val = d.slice(colonIdx + 1).trim();

        let category = 'HARDCODED_LAYOUT_VISUAL';
        if ((/^background(-image)?$/i.test(prop) || /^--bg-image$/i.test(prop)) && /url\(/i.test(val)) {
          category = 'DYNAMIC_BACKGROUND';
          hasBg = true;
        } else if (prop === 'display' && /^none$/i.test(val)) {
          category = 'STATE_TOGGLE';
          hasToggle = true;
        } else {
          hasHardcoded = true;
        }

        parsedDecls.push({
          declIndex: dIdx + 1,
          property: prop,
          value: val,
          category
        });
      });

      // Overall attribute classification
      let dominantCategory = 'HARDCODED_LAYOUT_VISUAL';
      if (hasHardcoded) {
        dominantCategory = 'HARDCODED_LAYOUT_VISUAL';
      } else if (hasBg) {
        dominantCategory = 'DYNAMIC_BACKGROUND';
      } else if (hasToggle) {
        dominantCategory = 'STATE_TOGGLE';
      }

      inlineStyles.push({
        file: relPath,
        line: tagLoc.line,
        col: tagLoc.col,
        tag: tagName,
        id: idAttr,
        class: classAttr,
        attrIndex: attrSeq,
        rawStyle: rawVal,
        dominantCategory,
        declarations: parsedDecls
      });
    }
  }

  return {
    file: relPath,
    fullPath: filePath,
    lineCount: lines.length,
    inlineStyles,
    linkStylesheets,
    styleBlocks,
    dynamicScriptMatches
  };
}

// 6. Run Scanner across project
function main() {
  const rootDir = process.cwd();
  console.log('====================================================');
  console.log('  LAMS CSS REFACTOR: PHASE 0 GROUND TRUTH SCANNER   ');
  console.log('====================================================');
  console.log(`Scanning directory: ${rootDir}`);

  const htmlFiles = findHtmlFiles(rootDir);
  console.log(`Discovered HTML files: ${htmlFiles.length} (Expected: ${EXPECTED_FILES})`);

  if (htmlFiles.length !== EXPECTED_FILES) {
    console.log(`[WARN] File count mismatch! Expected ${EXPECTED_FILES}, found ${htmlFiles.length}`);
  }

  const reports = htmlFiles.map(f => scanFile(f, rootDir));

  // Global aggregates
  let totalInlineAttrs = 0;
  let totalDeclarations = 0;
  let catCounts = {
    DYNAMIC_BACKGROUND: 0,
    STATE_TOGGLE: 0,
    HARDCODED_LAYOUT_VISUAL: 0
  };
  const propFrequency = {};
  const cacheVersionReport = [];
  const inlineCsvRows = [];

  // CSV Headers
  inlineCsvRows.push([
    'File',
    'Line',
    'Tag',
    'ID',
    'Class',
    'AttrIndex',
    'DeclIndex',
    'Category',
    'Property',
    'Value',
    'RawStyleSnippet'
  ].map(csvEscape).join(','));

  const cacheCsvRows = [];
  cacheCsvRows.push([
    'File',
    'Line',
    'CSS_File',
    'Full_Href',
    'Version_Param',
    'Has_Version'
  ].map(csvEscape).join(','));

  reports.forEach(rep => {
    totalInlineAttrs += rep.inlineStyles.length;

    rep.inlineStyles.forEach(st => {
      st.declarations.forEach(d => {
        totalDeclarations++;
        catCounts[d.category] = (catCounts[d.category] || 0) + 1;
        propFrequency[d.property] = (propFrequency[d.property] || 0) + 1;

        inlineCsvRows.push([
          rep.file,
          st.line,
          st.tag,
          st.id,
          st.class,
          st.attrIndex,
          d.declIndex,
          d.category,
          d.property,
          d.value,
          st.rawStyle.slice(0, 100)
        ].map(csvEscape).join(','));
      });
    });

    rep.linkStylesheets.forEach(link => {
      cacheCsvRows.push([
        rep.file,
        link.line,
        link.fileName,
        link.href,
        link.versionParam || 'NONE',
        link.hasVersion ? 'YES' : 'NO'
      ].map(csvEscape).join(','));
    });
  });

  // Top 15 properties
  const topProps = Object.entries(propFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);

  // Write Reports
  if (!fs.existsSync(SCRATCH_DIR)) {
    fs.mkdirSync(SCRATCH_DIR, { recursive: true });
  }

  const jsonSummary = {
    meta: {
      timestamp: new Date().toISOString(),
      rootDir,
      totalFiles: reports.length,
      expectedFiles: EXPECTED_FILES
    },
    totals: {
      inlineStyleAttributes: totalInlineAttrs,
      declarationsTotal: totalDeclarations,
      byCategory: catCounts,
      topProperties: Object.fromEntries(topProps)
    },
    files: reports.map(r => ({
      file: r.file,
      inlineCount: r.inlineStyles.length,
      hardcodedCount: r.inlineStyles.filter(s => s.dominantCategory === 'HARDCODED_LAYOUT_VISUAL').length,
      dynamicBgCount: r.inlineStyles.filter(s => s.dominantCategory === 'DYNAMIC_BACKGROUND').length,
      stateToggleCount: r.inlineStyles.filter(s => s.dominantCategory === 'STATE_TOGGLE').length,
      stylesheets: r.linkStylesheets,
      styleTagsCount: r.styleBlocks.length,
      dynamicDomScriptsCount: r.dynamicScriptMatches.length,
      dynamicDomScripts: r.dynamicScriptMatches
    }))
  };

  fs.writeFileSync(path.join(SCRATCH_DIR, 'phase0-inventory.json'), JSON.stringify(jsonSummary, null, 2), 'utf8');
  fs.writeFileSync(path.join(SCRATCH_DIR, 'phase0-inline-styles.csv'), inlineCsvRows.join('\r\n'), 'utf8');
  fs.writeFileSync(path.join(SCRATCH_DIR, 'phase0-cache-versions.csv'), cacheCsvRows.join('\r\n'), 'utf8');

  // ASCII Console Output
  console.log('\n+------------------------------------------------------+');
  console.log('|               GROUND TRUTH SCAN RESULTS             |');
  console.log('+------------------------------------------------------+');
  console.log(`| Total HTML Files Scanned      : ${String(reports.length).padStart(4)} / ${EXPECTED_FILES}          |`);
  console.log(`| Total Inline Style Elements   : ${String(totalInlineAttrs).padStart(4)}                |`);
  console.log(`| Total CSS Declarations        : ${String(totalDeclarations).padStart(4)}                |`);
  console.log('+------------------------------------------------------+');
  console.log('| CATEGORY BREAKDOWN                                   |');
  console.log(`|   - HARDCODED_LAYOUT_VISUAL   : ${String(catCounts.HARDCODED_LAYOUT_VISUAL).padStart(4)} (Violations)      |`);
  console.log(`|   - DYNAMIC_BACKGROUND        : ${String(catCounts.DYNAMIC_BACKGROUND).padStart(4)} (Images)          |`);
  console.log(`|   - STATE_TOGGLE              : ${String(catCounts.STATE_TOGGLE).padStart(4)} (display:none)    |`);
  console.log('+------------------------------------------------------+');
  console.log('| TOP 10 HARDCODED CSS PROPERTIES                      |');
  topProps.slice(0, 10).forEach(([p, count]) => {
    console.log(`|   * ${p.padEnd(25)} : ${String(count).padStart(4)} occurrences      |`);
  });
  console.log('+------------------------------------------------------+');
  console.log('| ARTIFACTS WRITTEN:                                   |');
  console.log('|   1. scratch/phase0-inventory.json                   |');
  console.log('|   2. scratch/phase0-inline-styles.csv                |');
  console.log('|   3. scratch/phase0-cache-versions.csv               |');
  console.log('+------------------------------------------------------+\n');
}

main();
