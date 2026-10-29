const http = require('http');

const BASE_URL = 'http://127.0.0.1:8088';

function fetchPage(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(BASE_URL + urlPath, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function runTestSuite() {
  console.log('=== LAMS FULL-WEBSITE INTERACTIVE & ROUTING VERIFICATION SUITE ===\n');
  const pages = [
    { path: '/index.html', titleContains: 'คณะศิลปศาสตร์' },
    { path: '/pages/about.html', titleContains: 'เกี่ยวกับคณะ' },
    { path: '/pages/news.html', titleContains: 'รอบรั้ว' },
    { path: '/pages/news-detail.html?id=1', titleContains: 'เด็ก LAMS' },
    { path: '/pages/people.html', titleContains: 'ทำเนียบผู้บริหาร' },
    { path: '/pages/procurement.html', titleContains: 'ข่าวจัดซื้อจัดจ้าง' },
    { path: '/pages/program-detail.html?id=mba', titleContains: 'รายละเอียดหลักสูตร' },
    { path: '/pages/programs.html', titleContains: 'หลักสูตรที่เปิดสอน' },
    { path: '/pages/staff.html', titleContains: 'สำหรับบุคลากร' },
    { path: '/en/index.html', titleContains: 'Faculty of Liberal Arts' },
    { path: '/en/about.html', titleContains: 'About Faculty' },
    { path: '/en/news.html', titleContains: 'News & Campus Highlights' },
    { path: '/en/people.html', titleContains: 'Faculty & Staff Directory' },
    { path: '/en/program-detail.html?id=mba', titleContains: 'Curriculum Details' },
    { path: '/en/programs.html', titleContains: 'Academic Programs' },
    { path: '/en/staff.html', titleContains: 'Faculty & Staff Portal' }
  ];

  let passed = 0;
  let failed = 0;

  for (const p of pages) {
    try {
      const res = await fetchPage(p.path);
      if (res.status === 200 && res.data.includes(p.titleContains)) {
        console.log(`✅ [PASS] HTTP 200 & Title match: ${p.path}`);
        passed++;
      } else {
        console.error(`❌ [FAIL] Status ${res.status} or title mismatch: ${p.path}`);
        failed++;
      }
    } catch (err) {
      console.error(`❌ [ERROR] Could not fetch ${p.path}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n======================================================`);
  console.log(`Results: ${passed} passed, ${failed} failed out of ${pages.length} pages.`);
  if (failed > 0) process.exit(1);
}

runTestSuite();
