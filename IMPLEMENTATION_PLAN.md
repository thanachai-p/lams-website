# 🛠️ แผนแม่บทการปรับปรุงเว็บไซต์ทุกระยะ (Multi-Model Engineering Masterplan)
**โปรเจกต์:** LAMS PSU Surat Thani - Official Website Redesign 2026  
**หน่วยงาน:** คณะศิลปศาสตร์และวิทยาการจัดการ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตสุราษฎร์ธานี  
**คณะผู้วางแผน (Multi-Model Architecture Panel):**
- **GPT-5.6 Luna** — Lead UI/UX Architect & Mobile Ergonomics Specialist
- **Qwen 3.8 27B** — Lead Technical Engineer & Code Architect
- **Qwen 3.7 Plus** — Academic Strategy & Static Web Architecture Specialist
- **Gemini 3.8 Flash** — Implementation Engine & Code Writer

---

## 📱 1. มาตรฐานการรองรับมือถือและทุกอุปกรณ์ (Mobile-First & Multi-Device Standards)

เพื่อให้เว็บไซต์ใช้งานได้อย่างสะดวก ราบรื่น สบายตา และมีประสิทธิภาพสูงสุดในทุกหน้าจอ มีการกำหนดเกณฑ์บังคับ (Hard Constraints) ดังนี้:

### 1.1 Responsive Breakpoints System
```css
/* Base: Mobile Small / Compact Mobile (320px - 359px) */
/* Mobile Standard (360px - 767px): 1 Column Flow, Touch-friendly */
/* Tablet & iPad (768px - 1023px): 2 Columns Layout, Collapsible Sidebar */
/* Desktop / Laptop (1024px - 1439px): Full Grid, Max Width 1240px */
/* Large Displays (≥ 1440px): Centered Container with Fluid Margins */
```

### 1.2 Touch Target & Thumb Zone Ergonomics
1. **Minimum Touch Target:** ทุกองค์ประกอบที่คลิก/แตะได้ (ปุ่ม, เมนู, ดรอปดาวน์, ลิงก์, ไอคอน) ต้องมีพื้นที่สัมผัสอย่างน้อย **`44 × 44 px`** (ตามเกณฑ์ Apple HIG & Google Material Design)
2. **Thumb Zone Reachability:** ปุ่ม Action สำคัญ เช่น ปุ่ม "คำนวณค่าเทอม", ปุ่ม "สมัครเรียน", ปุ่ม Hamburger Menu ต้องอยู่ในระยะเอื้อมของนิ้วหัวแม่มือขณะถือสมาร์ตโฟนด้วยมือเดียว
3. **Prevention of iOS Auto-Zoom:** ช่อง Input และ Select ดรอปดาวน์ทั้งหมดต้องมี `font-size: 16px` หรือ `1rem` เป็นอย่างต่ำบนหน้าจอมือถือ เพื่อป้องกันไม่ให้ Safari บน iOS ซูมหน้าจออัตโนมัติขณะพิมพ์

### 1.3 Zero-CLS (Cumulative Layout Shift Guard < 0.1)
1. **Aspect Ratio Preservation:** ทุกกล่องภาพ แบนเนอร์ และวิดีโอต้องกำหนด `aspect-ratio` หรือขนาดความสูงขั้นต่ำล่วงหน้า:
   - Hero Banner: `min-height: 480px`
   - Course Cards: `aspect-ratio: 16 / 9` หรือ `height: 270px`
   - Mosaic Gallery: `aspect-ratio: 1 / 1`
2. **Reserved Container Heights:** ส่วนแสดงผลลัพธ์ของ Calculator และ Accordion ต้องจองพื้นที่ล่วงหน้า หรือใช้ Smooth Transition เพื่อไม่ให้เนื้อหาด้านล่างกระตุกเลื่อน

### 1.4 Smooth Navigation & Scroll Margin
1. กำหนด `scroll-margin-top: 84px` ให้กับทุกเซกชันที่มี `id` เพื่อป้องกันไม่ให้ Sticky Header ลอยลงมาบังหัวข้อเมื่อผู้ใช้กดลิงก์ Anchor Link
2. เมนู Mobile Navigation Drawer ต้องมี `aria-expanded`, `aria-controls`, การขัง Focus (Focus Trap), และรองรับการกดปุ่ม `Escape` เพื่อปิด

---

## 🚀 2. แผนการปรับปรุง 3 ระยะ (3-Phase Actionable Roadmap)

---

### 🔹 เฟสที่ 1: Quick Wins & Interactive Tuition Calculator (สัปดาห์ที่ 1 - 2)
*เป้าหมาย: ยกระดับการใช้งานทันที แก้ปัญหา Dead Code, เติมฟอร์มคำนวณค่าเทอม, ติดตั้ง SEO/OG และปรับแต่ง Mobile UX*

#### [Task 1.1] ติดตั้ง Form UI และเชื่อมต่อ Calculator Widget
* **Target Files:** `index.html` (ใต้ Hero หรือในเซกชัน Degree Explorer), `css/components.css`, `js/calculator.js`
* **โครงสร้าง UI (Mobile-First):**
  - **กล่องอินพุต (Left / Top):**
    - ดรอปดาวน์เลือกหลักสูตร (บธ.บ. การจัดการธุรกิจ, ศศ.บ. ภาษาอังกฤษสื่อสารธุรกิจ, บช.บ. บัญชี, ปวส. เทียบโอน, บธ.ม. MBA)
    - ตัวเลือกวิธีชำระ (ชำระเงินสด / กู้ยืมกองทุน กยศ.)
    - ปุ่มกด "คำนวณยอดประมาณการ"
  - **กล่องแสดงผลลัพธ์ (Right / Bottom):**
    - ค่าเทอมต่อภาคการศึกษา (บาท/เทอม)
    - รวมค่าเล่าเรียนตลอดหลักสูตร
    - วงเงินสนับสนุน กยศ. สูงสุด
    - ยอดชำระจริงส่วนต่างที่ต้องจ่ายเอง
    - ปุ่ม Call-to-Action: **"สมัครเรียน TCAS69 สาขานี้ ✨"**
* **เกณฑ์ตรวจรับ (Acceptance Criteria):**
  - ✅ บนมือถือ (360px): แสดงผล 1 คอลัมน์เรียงจากบนลงล่าง, ปุ่มกด ≥ 48px
  - ✅ บนแท็บเล็ต/เดสก์ท็อป (≥ 768px): แสดงผล 2 คอลัมน์คู่กันอย่างสมดุล
  - ✅ คำนวณถูกต้องตามฐานข้อมูล `LAMS_PROGRAMS` ทั้ง 5 สาขาวิชา
  - ✅ มี Animation ตัวเลขหรือ Transition ที่นุ่มนวล ไม่กระตุก

#### [Task 1.2] ติดตั้ง Meta Tags, Open Graph และ Social Cards
* **Target Files:** `index.html` (`<head>`)
* **สิ่งที่ต้องเพิ่ม:**
  - `<meta name="description" ...>` (ความยาว 150-160 ตัวอักษร)
  - Open Graph Tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type=website`, `og:locale=th_TH`
  - Twitter Card: `twitter:card=summary_large_image`
  - JSON-LD Structured Data: `schema.org/EducationalOrganization`
* **เกณฑ์ตรวจรับ:**
  - ✅ ทดสอบแชร์ลิงก์บน Facebook/LINE แสดงภาพพรีวิว 1200x630 และข้อความครบถ้วน
  - ✅ ผ่านการทดสอบ Google Rich Results Test โดยไม่มี Critical Error

#### [Task 1.3] ปรับปรุง Accessibility (a11y) และ Mobile Navigation
* **Target Files:** `index.html`, `css/components.css`, `js/main.js`
* **สิ่งที่ต้องเพิ่ม:**
  - เพิ่ม `aria-expanded="false"` และ `aria-label="เปิดเมนูการนำทาง"` บน `.mobile-menu-btn`
  - เพิ่ม `scroll-margin-top: 84px` บนทุกเซกชัน (`#programs`, `#experience`, `#apply`, `#pride`, `#procurement`)
  - จัดการ Focus เมื่อเปิด Mobile Nav Drawer และปิดเมนูอัตโนมัติเมื่อกดคลิกลิงก์
* **เกณฑ์ตรวจรับ:**
  - ✅ เมนูนำทางบนมือถือเปิด-ปิดลื่นไหล ไม่เลื่อนทะลุพื้นหลัง (No Background Scrolling)
  - ✅ ผ่านการตรวจสอบ Contrast Ratio ระดับ WCAG 2.1 AA

#### [Task 1.4] จัดการ Zero-CLS (Cumulative Layout Shift)
* **Target Files:** `css/style.css`, `css/components.css`
* **สิ่งที่ต้องเพิ่ม:**
  - กำหนด `aspect-ratio` และ `object-fit: cover` ให้กับการ์ดภาพทั้งหมด
  - เพิ่ม CSS Skeleton / Loading Placeholder ให้กับกล่องภาพขนาดใหญ่
* **เกณฑ์ตรวจรับ:**
  - ✅ คะแนน CLS บน Google Lighthouse ต่ำกว่า 0.05

---

### 🔹 เฟสที่ 2: Asset Optimization, Real Content & Security (เดือนที่ 1 - 2)
*เป้าหมาย: ขจัดความเสี่ยงจากการพึ่งพา CDN ภายนอก, ปรับใช้ภาพถ่ายจริงของแคมปัสสุราษฎร์ฯ และปฏิบัติตามกฎหมาย PDPA*

#### [Task 2.1] การจัดเตรียมและเพิ่มประสิทธิภาพ Local Assets
* **Target Files:** `assets/images/`, `assets/icons/`, `index.html`, `css/components.css`
* **สิ่งที่ต้องทำ:**
  - เตรียมภาพถ่ายจริงของอาคารเรียน คณะ LAMS, ห้องปฏิบัติการดิจิทัล, บรรยากาศริมทะเลสาบ ม.อ.สุราษฎร์ธานี
  - บีบอัดรูปภาพให้อยู่ในฟอร์แมต WebP / AVIF เพื่อลดขนาดไฟล์ลง 60-80%
  - แทนที่ Unsplash URL ด้วยพาธภาพจริงในโฟลเดอร์ `assets/images/`

#### [Task 2.2] Self-hosted Fonts & Subresource Integrity (SRI)
* **Target Files:** `index.html`, `css/`
* **สิ่งที่ต้องทำ:**
  - ดาวน์โหลดฟอนต์ Prompt และ Font Awesome มาเก็บไว้ภายในเครื่อง (Self-host) หรือเพิ่มแท็ก SRI:
    `integrity="sha512-..." crossorigin="anonymous"` เพื่อป้องกัน Supply Chain Attack

#### [Task 2.3] นโยบายความเป็นส่วนตัวและคุ้มครองข้อมูลส่วนบุคคล (PDPA)
* **Target Files:** `index.html` (Footer), `css/components.css`
* **สิ่งที่ต้องทำ:**
  - เพิ่มลิงก์ "นโยบายความเป็นส่วนตัว (Privacy Policy)" และ "นโยบายการใช้คุกกี้ (Cookie Policy)" ของ ม.อ. ในส่วน Footer
  - วางระบบแจ้งเตือนคุกกี้พื้นฐาน (Cookie Banner) ที่ได้มาตรฐาน e-Government

---

### 🔹 เฟสที่ 3: Pure Static Multi-Page Architecture & Design System (เดือนที่ 3 - 4)
*เป้าหมาย: ขยายโครงสร้างจากหน้าแรก ไปสู่ระบบเว็บสแตติกสมบูรณ์ 16 หน้า (ไทย-อังกฤษ) พร้อมระเบียบ BEM และ Token มาตรฐาน*

#### [Task 3.1] การจัดสถาปัตยกรรมหลายหน้า (Multi-Page Architecture)
* **โครงสร้างหน้าเว็บ (16 หน้า):**
  - ภาษาไทย 9 หน้า: `index.html`, `pages/about.html`, `pages/news.html`, `pages/news-detail.html`, `pages/people.html`, `pages/procurement.html`, `pages/program-detail.html`, `pages/programs.html`, `pages/staff.html`
  - ภาษาอังกฤษ 7 หน้า: `en/index.html`, `en/about.html`, `en/news.html`, `en/people.html`, `en/program-detail.html`, `en/programs.html`, `en/staff.html`
  - สไตล์สถาปัตยกรรม: แยกสิทธิ์การควบคุมเป็น `style.css` (Tokens & Base), `components.css` (BEM Components), `pages.css` (Inner Pages & Shared Modals)

#### [Task 3.2] การวางระบบจัดซื้อจัดจ้างและตัวกรองข้อมูลฝั่งไคลเอนต์ (Client-Side Filtering)
1. **ระบบตัวกรอง e-Bidding (`initProcurementFilters`):**
   - แท็บตัวกรอง: ทั้งหมด, e-Bidding, ประกาศราคากลาง, ประกาศผลผู้ชนะ, แผนจัดซื้อจัดจ้าง
   - ควบคุมการแสดงผลการ์ดแบบ Instant DOM Filtering โดยไม่ต้องพึ่งพาเซิร์ฟเวอร์
2. **ระบบการ์ดหลักสูตรและ Modal แสดงรายละเอียด (`initCampusVideoModal`, `initScholarshipModal`):**
   - ผูก Event แบบ Event Delegation หรือ Idempotent Initializer ป้องกัน Memory Leak
3. **ระบบสลับภาษา (Bilingual Navigation):**
   - ลิงก์เชื่อมโยงข้ามหน้าระหว่าง TH ⟷ EN สอดคล้องตรงกันทุกหน้า

#### [Task 3.3] การเชื่อมโยงระบบบุคลากร (Staff Portal & Intranet)
* ปุ่ม "สำหรับบุคลากร" เชื่อมต่อกับระบบยืนยันตัวตนกลางของมหาวิทยาลัยสงขลานครินทร์ (PSU Passport Portal) เพื่อนำอาจารย์และเจ้าหน้าที่เข้าสู่ระบบ Intranet คณะ

---

## 📋 3. ตาราง Actionable Task Checklist สำหรับ Gemini 3.8 Flash

เมื่อได้รับอนุมัติให้เริ่มดำเนินการ โครงสร้างงานจะถูกส่งมอบให้ **Gemini 3.8 Flash** ดำเนินการตามตาราง Checklist นี้อย่างแม่นยำ:

| Task ID | งานที่ต้องทำ (Task Title) | ไฟล์เป้าหมาย (Target Files) | การรองรับอุปกรณ์ (Device Target) | เกณฑ์การตรวจรับ (Acceptance Criteria) |
|---|---|---|---|---|
| **T-1.1** | สร้าง Calculator Widget UI + ผูก Event | `index.html`, `css/components.css`, `js/calculator.js` | Mobile (1-col) / Desktop (2-col) | คำนวณถูกต้องทั้ง 5 สาขา, ปุ่ม Touch ≥ 44px, ป้องกัน iOS Zoom |
| **T-1.2** | ติดตั้ง SEO Meta, OG Tags & Schema | `index.html` (`<head>`) | ทุกอุปกรณ์ / Social Bots | ตรวจผ่าน Google Rich Results, แฮร์ขึ้นการ์ดพรีวิว Facebook/LINE |
| **T-1.3** | ปรับปรุง Accessibility & Mobile Nav | `index.html`, `css/components.css`, `js/main.js` | Mobile Drawer / Keyboard | ผ่าน WCAG AA, มี `aria-expanded`, ล็อกไม่ให้ Scroll พื้นหลัง |
| **T-1.4** | กำหนด Aspect Ratio ป้องกัน CLS | `css/components.css` | ทุกหน้าจอ | CLS < 0.05, ภาพไม่กระตุกขณะดาวน์โหลด |
| **T-2.1** | โครงสร้างรูปภาพ Local WebP/AVIF | `assets/images/`, `index.html` | Retina & High DPI Displays | ภาพคมชัด โหลดไว ไม่พึ่งพา Unsplash ภายนอก |
| **T-2.2** | ติดตั้ง SRI Hash & Security Headers | `index.html` | ทุกเบราว์เซอร์ | มี `integrity` บน CDN Links ทั้งหมด |
| **T-3.1** | โครงสร้าง Pure Static 16 หน้า & BEM Modularization | `css/`, `js/`, `pages/`, `en/` | CMS-Free Production | รองรับ 2 ภาษา 16 หน้า, แยกโมดูล BEM สมบูรณ์, 0 Build Step |
