# 🛠️ แผนแม่บทการพัฒนาเว็บไซต์เวอร์ชันภาษาจีน (LAMS PSU Chinese Localization Masterplan)
**โปรเจกต์:** PSU LAMS Official Website (lams-website) — Multi-Model Engineering Specification  
**คณะผู้จัดทำและผู้ตรวจรับรองแผน:**
- **GPT-5.6 Luna** — Lead UI/UX Architect, Supreme Gatekeeper & Quality Guard
- **Qwen 3.7 Plus** — CJK Typography, CSS Architecture & BEM Specialist
- **GLM-5.3** — Defensive Logic, Additive Data Schema & Anti-Slop Specialist
- **Claude Haiku 5.5** — Pipeline Coordinator, Consistency Auditor & Spec Gatekeeper
- **Gemini 3.8 Flash** — Strict Assembler & Test Runner (Non-Authoring Execution Unit)
- **Human Chinese Expert** — Official Academic Terminology & Natural Phrasing Final Authority

---

## 📌 1. บทนำและวัตถุประสงค์ (Executive Objective & Scope)

### 1.1 วัตถุประสงค์หลัก
1. **Curriculum-First Focus**: มุ่งเน้นให้ผู้สนใจชาวจีน (นักเรียน, ผู้ปกครอง, สถาบันพันธมิตร) สามารถเข้าถึงและอ่าน **ข้อมูลหลักสูตร (Curriculum Details)** ได้อย่างถูกต้อง ชัดเจน และเป็นธรรมชาติที่สุด
2. **Streamlined UX (No-TCAS Slop)**: ตัดความซับซ้อนของระบบรับสมัครในประเทศ (เช่น ระบบ TCAS) ออกจากเวอร์ชันภาษาจีน เปลี่ยนเป็นข้อมูลการติดต่อรับสมัครตรงและข้อมูลหลักสูตรที่เข้าใจง่าย
3. **Zero Regression & Backward Compatibility**: การเพิ่มภาษาจีนต้องไม่กระทบ หรือทำให้โครงสร้างภาษาไทย (`/`, `pages/`) และภาษาอังกฤษ (`en/`) เกิดความเสียหายแม้แต่จุดเดียว
4. **Anti-Slop & Asset Reuse**: ใช้ประโยชน์สูงสุดจากสถาปัตยกรรม Static Multi-Page เดิม (Vanilla JS, CSS Tokens, BEM) โดยไม่เพิ่ม Library ภายนอก และไม่สร้างความซับซ้อนเกินจำเป็น

---

## 👥 2. บทบาทและกฎเหล็กการทำงานของทีม (Team Authority & Ironclad Rules)

```
[Claude Haiku 5.5 (Coordination)] ➔ [GLM-5.3 / Qwen (Logic & CSS)] ➔ [Gemini Flash (Assemble & Test)] ➔ [GPT-5.6 Luna (Audit Gate)] ➔ [Human Expert (Language Sign-off)]
```

| บทบาท | ผู้รับผิดชอบ | ขอบเขตหน้าที่ | สิ่งที่ห้ามทำโดยเด็ดขาด (Restrictions) |
|---|---|---|---|
| **Supreme Gatekeeper** | **GPT-5.6 Luna** | • ตรวจสอบ Visual Parity & Layout Symmetry<br>• ตรวจสอบ Accessibility (WCAG 2.1/2.2 AA)<br>• ถือสิทธิ์ Veto และอนุมัติขั้นสุดท้ายก่อน Release | • ห้ามปล่อยผ่านหากมี Layout เหลื่อมล้ำ หรือมี Console Error |
| **Typography & CSS** | **Qwen 3.7 Plus** | • ออกแบบ CJK Font Stack สำหรับภาษาจีนตัวย่อ<br>• ปรับแต่ง Line-height, Text-wrapping และ Spacing<br>• ออกแบบ BEM modifier (`.lang--zh`) ใน `components.css` | • ห้ามเขียน Inline Styles ใน HTML<br>• ห้ามโหลด Webfont จีนขนาดใหญ่ที่หน่วงเว็บ |
| **Logic & Data Schema** | **GLM-5.3** | • ขยาย `programs-data.js` แบบ Additive (`*Zh`)<br>• ปรับปรุง `initLanguageSwitcher()` ใน `main.js` (3 ภาษา)<br>• ออกแบบ Safe DOM Renderer แบบ Zero-innerHTML | • ห้ามแก้ไขฟิลด์เดิมของ TH และ EN<br>• ห้ามใช้ `innerHTML` กับข้อมูลไดนามิก |
| **Pipeline Coordinator** | **Claude Haiku 5.5** | • กำกับขั้นตอน P0 – P7 และตรวจสอบความสอดคล้องข้ามหน้า<br>• ตรวจสอบ Checklist ความถูกต้องของ ID, ลิงก์ และ Breadcrumb<br>• จัดทำ Translation Inventory Sheet ส่งให้มนุษย์ตรวจ | • ห้ามแก้ไขโค้ดเชิงลึกนอกเหนือจากพิมพ์เขียวที่ตกลงกัน |
| **Assembler & Runner** | **Gemini 3.8 Flash** | • นำโค้ดพิมพ์เขียวที่ผ่านการอนุมัติมาประกอบลงในไฟล์จริง<br>• รันคำสั่ง Terminal (`node scripts/verify-full-site.js`)<br>• ตรวจสอบ Runtime ด้วย Chrome DevTools MCP | ⛔ **ห้ามคิดโค้ดเอง ห้ามเดา logic ห้าม refactor ตามใจชอบ** รายงาน log ตามจริงเท่านั้น |
| **Language Sign-off** | **Human Expert** | • ตรวจสอบความถูกต้องของคำศัพท์วิชาการและชื่อหลักสูตร<br>• รับรองความเป็นธรรมชาติของสำนวนภาษาจีนขั้นสุดท้าย | *(ผู้มีอำนาจสูงสุดในการอนุมัติคำแปล)* |

---

## 🗺️ 3. แผนการทำงาน 8 ขั้นตอน (Master Workflow: P0 – P7)

### 🔹 P0: Scope Lock & Baseline Audit
* **เป้าหมาย:** บันทึกสภาพเดิมของเว็บไซต์ และจำกัดขอบเขตหน้าเป้าหมาย
* **ขอบเขตหน้าที่ทำในระยะที่ 1 (Core Curriculum Phase):**
  1. `/zh/index.html` (หน้าแรกภาษาจีน)
  2. `/zh/programs.html` (ศูนย์รวมหลักสูตรทั้งหมด)
  3. `/zh/program-detail.html` (หน้ารายละเอียดหลักสูตรแบบเจาะลึก 8 สาขา)
  4. `/zh/about.html` (ข้อมูลแนะนำคณะและวิทยาเขต)
* **ขอบเขตหน้าที่ทำในระยะที่ 2 (Secondary Phase):**
  - `/zh/people.html`, `/zh/news.html`, `/zh/staff.html`
* **Gate Check:** ผ่านเมื่อบันทึก Baseline และ Route ทั้งหมดครบถ้วน

---

### 🔹 P1: Content Inventory & Glossary Matrix (จัดทำคู่คำแปล)
* **เป้าหมาย:** สร้างตารางคำศัพท์ทางการ (Official Glossary) เพื่อใช้ร่วมกันทุกโมเดล และเตรียมให้ผู้เชี่ยวชาญมนุษย์ตรวจ
* **ตารางคำศัพท์หลักเบื้องต้น (Glossary Standard):**
  - **มหาวิทยาลัย:** 宋卡王子大学 (Prince of Songkla University)
  - **วิทยาเขต:** 素拉他尼校区 (Surat Thani Campus)
  - **คณะ:** 文学院与管理科学学院 (Faculty of Liberal Arts and Management Sciences - LAMS)
  - **ระดับการศึกษา:** 本科课程 (Bachelor's Degree), 硕士课程 (Master's Degree)
  - **ปุ่ม Action:** 了解更多 (Learn More), 申请咨询 (Admission Inquiry), 返回 (Back)
* **Gate Check:** มีตาราง Glossary ที่ครบถ้วน ไม่มีการใช้คำแปลแบบสุ่ม

---

### 🔹 P2: Data Schema Extension (`js/programs-data.js`)
* **เป้าหมาย:** ขยายข้อมูลหลักสูตรทั้ง 8 สาขาให้มีภาษาจีน โดยไม่กระทบภาษาเดิม
* **หลักการ:** Additive-only (เพิ่มต่อท้ายฟิลด์เดิม 100%)
* **Fallback Safety:** กำหนด Helper ฟังก์ชัน `getProgramField(program, field, lang)`:
  - หาก `lang === 'zh'` และมี `fieldZh` ➔ แสดงค่า `fieldZh`
  - หากไม่มี `fieldZh` ➔ ดึง `fieldEn` มาแสดงสำรอง (ห้ามจอขาวหรือเกิด `undefined`)
* **Gate Check:** รัน Node.js ตรวจสอบว่าทุก Object ใน `programs-data.js` ยังอ่านค่าภาษาไทยและอังกฤษได้สมบูรณ์ 100%

---

### 🔹 P3: Router & Zero-innerHTML DOM Safe Rendering (`js/main.js`)
* **เป้าหมาย:** ปรับปรุงระบบสลับภาษาให้รองรับ 3 ทาง และเรนเดอร์รายละเอียดหลักสูตรอย่างปลอดภัย
* **การปรับปรุง `initLanguageSwitcher()`:**
  - รองรับปุ่ม 3 ภาษา: `<a class="lang-switch-btn" hreflang="zh" data-lang="zh">中文</a>`
  - จดจำค่าใน `localStorage.setItem('lams_lang', 'zh')`
  - แปลง Path แม่นยำ:
    - จาก `/index.html` หรือ `/en/index.html` ➔ ไปยัง `/zh/index.html`
    - จาก `/pages/program-detail.html?id=mba` ➔ ไปยัง `/zh/program-detail.html?id=mba` (คง Query String เดิม)
* **การปรับปรุง `initProgramDetail()`:**
  - ตรวจจับภาษา: `const isZh = document.documentElement.lang === 'zh-Hans' || window.location.pathname.includes('/zh/');`
  - เรนเดอร์ด้วย `document.createElement()` และ `textContent` เท่านั้น (ห้ามต่อ String ลง `innerHTML` เพื่อป้องกัน Injection 100%)
* **Gate Check:** ทดสอบกดสลับภาษาไปมา 3 ทางโดยที่ `id` ใน URL ไม่หลุด และไม่มี Error ใน Console

---

### 🔹 P4: CJK Typography & CSS Tuning (`css/components.css`)
* **เป้าหมาย:** ทำให้ข้อความภาษาจีนแสดงผลสวยงาม สบายตา ไม่เกิดปัญหาข้อความล้นหรือปุ่มลีบ
* **กฎเกณฑ์ CSS ที่ต้องเพิ่ม:**
  ```css
  /* CJK Typography & Layout Optimization for Chinese Version */
  html[lang="zh-Hans"] body {
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif;
  }

  html[lang="zh-Hans"] {
    line-height: 1.6;
    word-break: normal;
    overflow-wrap: anywhere;
  }

  html[lang="zh-Hans"] .hero-title {
    line-height: 1.35;
    text-wrap: balance;
  }

  /* รักษาสมดุลของปุ่ม Action ไม่ให้ลีบเล็กตามความสั้นของอักษรจีน */
  html[lang="zh-Hans"] .btn-apply-sparkle,
  html[lang="zh-Hans"] .btn-detail,
  html[lang="zh-Hans"] .bar-item {
    min-width: 130px;
    padding-inline: 1.25rem;
    text-align: center;
  }
  ```
* **Gate Check:** วัดขนาด Bounding Box ผ่าน Chrome DevTools ยืนยันว่าปุ่มในภาษาจีนมีความสมดุลเท่าเทียมกับภาษาอังกฤษและไทย

---

### 🔹 P5: File Assembly (Clone & Localize)
* **เป้าหมาย:** ประกอบไฟล์ในโฟลเดอร์ `/zh/` โดยคัดลอกโครงร่างจาก `/en/`
* **ผู้ปฏิบัติงาน:** Gemini 3.8 Flash (ทำตามพิมพ์เขียวอย่างเคร่งครัด)
* **รายการไฟล์ที่สร้าง:**
  - `zh/index.html`
  - `zh/programs.html`
  - `zh/program-detail.html`
  - `zh/about.html`
* **การตั้งค่า Head Tag ทุกหน้าใน `/zh/`:**
  - `<html lang="zh-Hans">`
  - `<link rel="canonical" href="https://lams.surat.psu.ac.th/zh/...">`
  - `<link rel="alternate" hreflang="th" href="...">`
  - `<link rel="alternate" hreflang="en" href="...">`
  - `<link rel="alternate" hreflang="zh-Hans" href="...">`
  - `<link rel="alternate" hreflang="x-default" href="https://lams.surat.psu.ac.th/en/...">`
* **Gate Check:** ลิงก์ภายในทุกหน้าใน `/zh/` ต้องชี้ไปยัง `/zh/...` ไม่หลุดกลับไปที่ `/en/` หรือ `/` โดยไม่ตั้งใจ

---

### 🔹 P6: Automated Testing & Luna Gate
* **เป้าหมาย:** ทดสอบความสมบูรณ์เชิงเทคนิคและการแสดงผลจริง
* **รายการทดสอบ (Verification Checklist):**
  1. **Automated Verification:** รัน `node scripts/verify-full-site.js` ครอบคลุมหน้าใน `/zh/`
  2. **Console Cleanliness:** ตรวจสอบผ่าน Chrome DevTools MCP ต้องพบ `errors === 0` และ `failed_requests === 0`
  3. **Visual Parity:** ตรวจสอบความสมบูรณ์ทั้ง Desktop (1440px), iPad/Tablet (768px) และ Mobile (375px)
  4. **Regression Gate:** ยืนยันว่าหน้า `/index.html` และ `/en/index.html` ยังทำงานถูกต้อง 100%
* **Gate Check:** GPT-5.6 Luna ออกใบรับรอง `PASS ✅` พร้อมบันทึกหลักฐานการวัดขนาดทางเรขาคณิต

---

### 🔹 P7: Human Chinese Expert Sign-off & Polish
* **เป้าหมาย:** ส่งมอบระบบในสภาพสมบูรณ์ให้ผู้เชี่ยวชาญภาษาจีนของคุณเข้าตรวจรับรอง
* **สิ่งที่ผู้เชี่ยวชาญจะได้รับ:**
  1. ลิงก์เปิดดูเว็บไซต์เวอร์ชัน `/zh/` บน Browser จริง
  2. ตารางเทียบเคียงคำแปล (Translation Inventory Spreadsheet/Markdown)
  3. ช่องทางส่งบันทึกคำแนะนำ เพื่อให้ทีมปรับแก้คำศัพท์ได้อย่างแม่นยำ
* **Gate Check:** ผู้เชี่ยวชาญมนุษย์ลงนามรับรองคำแปลภาษาจีน ➔ พร้อมเข้าสู่สถานะ Production

---

## 🛡️ 4. ตารางประเมินคุณภาพ (Quality Gates Matrix)

| รหัส Gate | ชื่อจุดตรวจ | ผู้ตรวจหลัก | เกณฑ์ผ่าน (Pass Criteria) |
|:---:|---|:---:|---|
| **GATE-01** | Additive Data Integrity | `GLM-5.3` | `programs-data.js` รองรับภาษาจีนครบ 8 สาขา โดยข้อมูลไทยและอังกฤษเดิมไม่เปลี่ยนแม้แต่ตัวอักษรเดียว |
| **GATE-02** | Zero-innerHTML Security | `GLM-5.3` | ไม่มีโค้ดต่อ String ลง `innerHTML` ในส่วนของหลักสูตรภาษาจีน ใช้ `textContent` และ `createElement` 100% |
| **GATE-03** | CJK Visual Balance | `Qwen 3.7+` | ปุ่มภาษาจีนไม่ลีบ, หัวข้อไม่ซ้อนทับ, Line-height อ่านสบายตา, ไม่มีข้อความล้นกรอบ (Zero Horizontal Scroll) |
| **GATE-04** | 3-Way Switching Flow | `Claude Haiku` | สลับ TH ➔ EN ➔ ZH ในหน้าเดียวกันได้สมบูรณ์ โดยเฉพาะหน้าหลักสูตรที่มี Query ID (`?id=...`) |
| **GATE-05** | Console & Regression | `GPT-5.6 Luna` | `verify-full-site.js` ผ่าน 100%, Console Error = 0, หน้าไทยและอังกฤษเดิมไม่ได้รับผลกระทบ |
| **GATE-06** | Human Chinese Sign-off | `Human Expert` | ผู้เชี่ยวชาญภาษาจีนตรวจรับรองความถูกต้องของสำนวนและชื่อทางการ |

---

## 📅 5. ลำดับเวลาในการปฏิบัติงาน (Actionable Timeline)

```
[Day 1: P0-P2 Data & Glossary] ➔ [Day 2: P3-P5 Router & Assembly] ➔ [Day 3: P6 Verification & Luna Gate] ➔ [Day 4: P7 Human Review]
```

* **Day 1 (รากฐานข้อมูลและศัพท์):**
  - ล็อกสเปค P0 และร่างตารางคำแปล P1
  - GLM-5.3 ขยายข้อมูลภาษาจีนใน `programs-data.js` (P2)
* **Day 2 (ตรรกะและประกอบหน้าเว็บ):**
  - GLM-5.3 ปรับปรุง Router ใน `main.js` (P3)
  - Qwen เสริม CJK CSS Rules ใน `components.css` (P4)
  - Gemini Flash ประกอบไฟล์ `zh/index.html`, `zh/programs.html`, `zh/program-detail.html` (P5)
* **Day 3 (ทดสอบความสมบูรณ์และตรวจรับรอง):**
  - Gemini Flash รัน `verify-full-site.js` และเปิดทดสอบบน Chrome DevTools (P6)
  - GPT-5.6 Luna ตรวจสอบ Visual Parity และออกใบรับรอง Gate
* **Day 4 (ตรวจภาษาโดยผู้เชี่ยวชาญมนุษย์):**
  - ส่งมอบ Live Preview ให้ผู้เชี่ยวชาญภาษาจีนของคุณตรวจทานและปรับจูนสำนวน (P7)

---
*เอกสารนี้ได้รับการเห็นชอบและลงนามรับรองร่วมกันโดยคณะผู้สถาปัตยกรรม Multi-Model AI Panel เพื่อใช้เป็นกรอบควบคุมการพัฒนา ไม่ให้มีการออกนอกแผนโดยเด็ดขาด*
