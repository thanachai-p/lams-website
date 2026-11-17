'use strict';

const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const assert = require('node:assert/strict');

const read = (file) => readFileSync(path.join(__dirname, '..', file), 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(read('js/programs-data.js'), sandbox);
const dataList = JSON.parse(JSON.stringify(sandbox.window.LAMS_PROGRAMS_DATA));
const data = Object.fromEntries(dataList.map((p) => [p.id, p]));
const ids = ['bba-mgmt', 'bba-tourism', 'b-acc', 'b-econ', 'b-pa', 'ba-eng', 'ba-chinese', 'mba'];
const expectedTracks = {
  'bba-mgmt': [
    'การบริหารธุรกิจดิจิทัลเพื่อการประกอบการ',
    'การบริหารธุรกิจระหว่างประเทศและโลจิสติกส์',
    'การบริหารทรัพยากรมนุษย์และการสื่อสารองค์กร'
  ],
  'bba-tourism': [
    'กลุ่มวิชาชีพธุรกิจที่พักแรม',
    'กลุ่มวิชาชีพธุรกิจนันทนาการ',
    'กลุ่มวิชาชีพธุรกิจไมซ์',
    'กลุ่มวิชาชีพธุรกิจท่องเที่ยวเชิงสุขภาพ',
    'กลุ่มวิชาชีพธุรกิจนำเที่ยว'
  ],
  'b-acc': [],
  'b-econ': ['กลุ่มวิชาธุรกิจและการจัดการ', 'กลุ่มวิชาการเงินและหลักทรัพย์', 'กลุ่มเศรษฐศาสตร์ในโลกธุรกิจ (เฉพาะ นศ.)'],
  'b-pa': ['นโยบายสาธารณะ', 'การจัดการทรัพยากรมนุษย์', 'การบริหารท้องถิ่น'],
  'ba-eng': [
    'ภาษาอังกฤษเพื่อธุรกิจโรงแรมและการบริการลูกค้า',
    'ภาษาอังกฤษเพื่อธุรกิจท่องเที่ยวและการบิน',
    'ภาษาอังกฤษเพื่องานต่างประเทศและการสื่อสารระดับโลก'
  ],
  'ba-chinese': [],
  mba: []
};
const credits = {
  'bba-mgmt': '128 หน่วยกิต',
  'bba-tourism': '126 หน่วยกิต',
  'b-acc': '132 หน่วยกิต',
  'b-econ': '128 หน่วยกิต',
  'b-pa': '126 หน่วยกิต',
  'ba-eng': '128 หน่วยกิต',
  'ba-chinese': '128 หน่วยกิต',
  mba: '36 หน่วยกิต'
};
const fees = {
  'bba-mgmt': 'ประมาณการ 16,000 บาท/ภาคการศึกษา',
  'bba-tourism': 'ประมาณการ 21,000 บาท/ภาคการศึกษา',
  'b-acc': 'ประมาณการ 16,000 บาท/ภาคการศึกษา',
  'b-econ': 'ประมาณการ 16,000 บาท/ภาคการศึกษา',
  'b-pa': 'ประมาณการ 16,000 บาท/ภาคการศึกษา',
  'ba-eng': 'ประมาณการ 16,000 บาท/ภาคการศึกษา',
  'ba-chinese': 'ประมาณการ 32,000 บาท/ภาคการศึกษา',
  mba: 'ประมาณการ 35,000 บาท/ภาคการศึกษา (รอประกาศทางการ)'
};
const joined = (value) => (Array.isArray(value) ? value : [value]).join(' ');
const trackTitles = (program) => (program.tracks || []).map((t) => (typeof t === 'string' ? t : t.title).replace(/^\d+\.\s*/, ''));
const hasAll = (value, parts) => parts.forEach((part) => assert.ok(joined(value).includes(part), `Missing "${part}"`));

test('Thai program data is synced and preserved', () => {
  for (const id of ids) {
    const p = data[id];
    assert.ok(p, `Missing program ${id}`);
    assert.equal(p.credits, credits[id]);
    assert.equal(p.tuitionFeeEstimate, fees[id]);
    assert.ok(typeof p.pdfCurriculum === 'string' && p.pdfCurriculum.startsWith('https://'));
    assert.ok(
      ['nameEn', 'philosophyEn', 'tracksEn', 'careersEn', 'nameZh', 'philosophyZh', 'tracksZh', 'careersZh']
        .every((k) => (typeof p[k] === 'string' && p[k].trim()) || (Array.isArray(p[k]) && p[k].length)),
      `${id}: missing translated field`
    );
    assert.deepEqual(trackTitles(p), expectedTracks[id]);
  }
  assert.ok(data['bba-mgmt'].pdfCurriculum.endsWith('BM%2069-Final.pdf'));
  assert.ok(data.mba.pdfCurriculum.endsWith('MBA%2069.pdf'));
  assert.ok(joined(data.mba.duration).includes('แผน 1'));
  assert.ok(joined(data.mba.duration).includes('แผน 2'));
  assert.ok(!joined(data.mba.duration).includes('แผน ก'));
});

test('Thai philosophy and careers are synced', () => {
  const checks = {
    'bba-mgmt': { careers: 9, careerText: ['พิธีการศุลกากร', 'นักจัดการงานทั่วไป'] },
    'bba-tourism': { philosophy: ['Life-long Learning', 'การเป็นผู้ประกอบการ'], careers: 8, careerText: ['ธุรกิจสปา', 'แผนกส่วนหน้า'] },
    'b-acc': { philosophy: ['Outcome Based Education', 'Work Integrated Learning', 'วางแผนภาษี'], careers: 8, careerText: ['การบัญชีบริหาร', 'การศึกษาและเทคโนโลยีทางการบัญชี', '2547'] },
    'b-econ': { philosophy: ['พิพัฒนาการนิยม', 'Active Learning', 'ยั่งยืน'], careers: 4, careerText: ['การบริหารธนาคาร', 'ผู้ประกอบการธุรกิจ'] },
    'b-pa': { philosophy: ['พิพัฒนาการนิยม', 'พื้นฐานของการวิจัย', 'ปฏิบัติงานจริง'], careers: 5, careerText: ['ฝ่ายบริหารงานบุคคลทั้งภาครัฐและเอกชน', 'พนักงานรัฐวิสาหกิจ'] },
    'ba-eng': { philosophy: ['พิพัฒนาการนิยม', 'Work-integrated Learning', 'การโรงแรม', 'การท่องเที่ยว', 'การบิน'], careerText: ['พนักงานต้อนรับส่วนหน้า', 'มัคคุเทศก์', 'พนักงานบริการภาคพื้นดิน', 'ผู้ประกอบการ', 'รัฐวิสาหกิจ'] },
    'ba-chinese': { philosophy: ['สถาบันขงจื่อภูเก็ต', '3+1'], careerText: ['มัคคุเทศก์', 'เลขานุการ', 'แปลและล่าม', 'รัฐวิสาหกิจ'] },
    mba: {
      philosophy: ['Outcome Based Education', 'Work Integrated Learning', 'กระบวนการวิจัย', 'แผน 1 แบบวิชาการ (ก1)', 'แผน 1 แบบวิชาการ (ก2)', 'แผน 2 แบบวิชาชีพ'],
      careers: 4,
      careerText: ['นักวิชาการ', 'อาจารย์ด้านบริหารธุรกิจ']
    }
  };
  for (const [id, c] of Object.entries(checks)) {
    const p = data[id];
    if (c.philosophy) hasAll(p.philosophy, c.philosophy);
    if (c.careers !== undefined) assert.equal(p.careers.length, c.careers, `${id} careers count`);
    hasAll(p.careers, c.careerText);
  }
});

test('program cards and detail careers reflect synced Thai content', () => {
  const expectedCardSummaries = {
    'bba-mgmt': 'ผลิตบัณฑิตที่มีทักษะความเป็นผู้ประกอบการ ประยุกต์ใช้เครื่องมือบริหารธุรกิจเพื่อจัดการอย่างยั่งยืน มีภาวะผู้นำ คุณธรรม และรับผิดชอบต่อสังคม',
    'bba-tourism': 'สร้างบัณฑิตที่มีความรู้ ทักษะวิชาชีพ ดิจิทัล ภาษา และความเป็นผู้ประกอบการ เพื่อตอบสนองการทำงานในอุตสาหกรรมการท่องเที่ยวและบริการภายใต้ความเปลี่ยนแปลงของสถานการณ์โลก',
    'b-acc': 'ผลิตนักบัญชีมืออาชีพที่เชี่ยวชาญการวิเคราะห์ข้อมูลธุรกิจ วางแผนภาษี ใช้เทคโนโลยี และสื่อสารภาษาอังกฤษในที่ทำงานได้อย่างมีจรรยาบรรณวิชาชีพ',
    'b-econ': 'ผลิตบัณฑิตทางเศรษฐศาสตร์ที่แก้ปัญหาและค้นคว้าด้วยตนเอง พัฒนาทักษะการปรับตัวทันต่อสถานการณ์ คำนึงถึงเศรษฐกิจยั่งยืนและการใช้ทรัพยากรอย่างมีประสิทธิภาพ',
    'b-pa': 'สร้างนักจัดการภาครัฐที่นำหลักรัฐประศาสนศาสตร์มาพัฒนานวัตกรรมบริหาร แก้ปัญหาองค์กร และจัดการภาวะวิกฤติ โดยยึดหลักธรรมาภิบาลและจิตสำนึกสาธารณะ',
    'ba-eng': 'ผลิตบัณฑิตที่สื่อสารภาษาอังกฤษสำหรับธุรกิจบริการได้อย่างถูกต้อง ครอบคลุมงานการโรงแรม การท่องเที่ยว และการบิน พร้อมคิดอย่างเป็นระบบและใช้เทคโนโลยี',
    'ba-chinese': 'ผลิตบัณฑิตผู้เชี่ยวชาญภาษาและวัฒนธรรมจีนเพื่อการสื่อสารทางธุรกิจอย่างมีประสิทธิภาพ ใช้เทคโนโลยีทำงานร่วมกับผู้อื่นได้อย่างมีคุณธรรมในระดับสากล',
    mba: 'พัฒนาทรัพยากรบุคคลด้านบริหารธุรกิจให้นำเทคโนโลยีดิจิทัล นวัตกรรม เครื่องมือทางธุรกิจ และการวิจัยมาพัฒนากลยุทธ์ แก้ปัญหา และต่อยอดความสามารถในการแข่งขันอย่างยั่งยืน'
  };
  const html = read('pages/programs.html');
  const cards = new Map();
  for (const match of html.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/g)) {
    const id = match[0].match(/\bdata-id=["']([^"']+)["']/);
    if (id) cards.set(id[1], match[0]);
  }
  for (const id of ids) assert.ok(cards.has(id), `Missing card ${id}`);
  assert.ok(cards.get('b-acc').includes('หลักสูตรบัญชีบัณฑิต (Accounting)'));
  assert.ok(!cards.get('mba').includes('แผน ก / ข'));
  assert.ok(cards.get('mba').includes('แผน 1'));
  for (const id of ids) {
    const card = cards.get(id);
    const section = card.match(/<div[^>]+class=["'][^"']*\bprogram-card-tracks\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/);
    assert.ok(section, `${id}: missing program-card-tracks`);
    assert.ok(section[1].includes('<strong>ปรัชญาและวัตถุประสงค์ของหลักสูตรโดยย่อ:</strong>'), `${id}: missing concise philosophy heading`);
    assert.ok(!section[1].includes('กลุ่มวิชาเอกเลือกเด่น:'), `${id}: unexpected track heading`);
    assert.doesNotMatch(section[1], /<\/?(?:ul|li)\b/i, `${id}: unexpected list in program-card-tracks`);
    const paragraph = section[1].match(/<p\b[^>]*>([\s\S]*?)<\/p>/);
    assert.ok(paragraph, `${id}: missing card summary paragraph`);
    const actualSummary = paragraph[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    assert.equal(actualSummary, expectedCardSummaries[id], `${id} card summary`);
  }
  const detail = read('pages/program-detail.html');
  assert.match(detail, /id=["']detail-careers-container["']/);
  for (const text of ['พิธีการศุลกากร', 'นักจัดการงานทั่วไป', 'การท่าเรือฯ']) {
    assert.ok(detail.includes(text), `Missing detail career "${text}"`);
  }
});
