# 🎓 LAMS PSU Surat Thani — Official Website Redesign 2026

**คณะศิลปศาสตร์และวิทยาการจัดการ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตสุราษฎร์ธานี**  
*Faculty of Liberal Arts and Management Sciences, Prince of Songkla University, Surat Thani Campus*

<p align="center">
  <img src="https://img.shields.io/badge/STATIC%20SITE-25%20PAGES-450A0A?style=for-the-badge&logo=html5&logoColor=white" alt="Static Site: 25 Pages">
  <img src="https://img.shields.io/badge/ASSERTIONS-820%20PASSED-10B981?style=for-the-badge&logo=checkmarx&logoColor=white" alt="820 assertions passed">
  <img src="https://img.shields.io/badge/HTML5%20%2F%20CSS3-VANILLA%20JS-B91C1C?style=for-the-badge&logo=javascript&logoColor=white" alt="HTML5, CSS3 and Vanilla JavaScript">
  <img src="https://img.shields.io/badge/CSS%20ARCHITECTURE-BEM-DC2626?style=for-the-badge&logo=css3&logoColor=white" alt="CSS Architecture: BEM">
  <img src="https://img.shields.io/badge/HOSTING-GITHUB%20PAGES-0284C7?style=for-the-badge&logo=github&logoColor=white" alt="Hosted on GitHub Pages">
</p>

> **Repository**: [`thanachai-p/lams-website`](https://github.com/thanachai-p/lams-website)  
> **Architecture**: Pure Static Multi-Page Web Architecture (HTML5 + Modular CSS BEM + Vanilla ES6+ JavaScript)  
> **Build Pipeline**: Zero Build Step (ไม่มี Node.js bundler, Webpack, หรือ framework runtime dependency)  
> **Language Coverage**: Tri-Lingual (ไทย 9 หน้า | English 8 หน้า | 简体中文 8 หน้า — รวม 25 หน้า)

---

## 📌 ข้อมูลภาพรวมโครงการ (Project Overview)

เว็บไซต์อย่างเป็นทางการของคณะศิลปศาสตร์และวิทยาการจัดการ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตสุราษฎร์ธานี ได้รับการออกแบบและพัฒนาขึ้นใหม่ในปี 2026 ด้วยสถาปัตยกรรม **Pure Static Web Architecture** โดยเน้นการส่งมอบเนื้อหาที่รวดเร็ว ลดภาระ Client-side processing, ไม่มี Application Server-side Runtime ในตัวโปรเจกต์จึงลด Attack Surface ฝั่ง Server ลงอย่างมีนัยสำคัญ และมีความยืดหยุ่นสูงในการนำไฟล์ Static ไปโฮสต์บน Web Server ใดๆ ได้ทันทีโดยไม่ต้องผ่านกระบวนการ Compile หรือ Build Pipeline

---

## 🌟 จุดเด่นและคุณสมบัติหลัก (Key Features)

1. **Tri-Lingual Multilingual Coverage (25 หน้า)**:
   - ครอบคลุม 3 ภาษา: ภาษาไทย (TH), ภาษาอังกฤษ (EN), และภาษาจีนตัวย่อ (ZH-Hans)
   - มี **24 หน้าที่จัดทำเป็นชุดข้ามภาษา TH/EN/ZH** พร้อมระบบ **3-Way Language Switcher** ซิงก์ตำแหน่งหน้าและ URL ข้ามภาษา
   - มี **1 หน้าเฉพาะภาษาไทย** คือ ประกาศจัดซื้อจัดจ้าง (`pages/procurement.html`) ตามข้อกำหนดทางกฎหมายและระเบียบ e-GP ของภาครัฐ
   - เชื่อมโยง SEO สากลด้วย `<link rel="canonical">` และ `<link rel="alternate" hreflang="...">` แบบ reciprocal สำหรับ 24 หน้าที่มีคู่ภาษา
2. **Pure Static & Zero Build Step**:
   - พัฒนาด้วยมาตรฐาน Web Platform พื้นฐาน: Semantic HTML5, Modular CSS (BEM), และ Vanilla ES6+ JavaScript
   - ไม่ต้องติดตั้ง `npm dependencies`, ไม่ต้องรัน build bundler และไม่มี framework overhead โดยมีเพียง external font resource คือ Google Fonts (`Prompt`) สำหรับระบบ Typography
3. **Defensive Component Engine (`js/main.js`)**:
   - ควบคุมการทำงานของ Interactive Components ทั้งหมด 17 Initializers ผ่าน Master Chain `runMasterInit()`
   - ทำงานแบบ One-Time Lifecycle ผ่าน `{ once: true }` บน Event `DOMContentLoaded` เพื่อป้องกัน Duplicate Event Listeners
   - ทุก Initializer มี Selector Guard (`if (!element) return;`) และครอบด้วย `try...catch` เพื่อแยกความรับผิดชอบอย่างปลอดภัย (Graceful Error Isolation) แม้หน้านั้นจะไม่มี Element ดังกล่าว
4. **Decoupled Curriculum Data Layer (`js/programs-data.js`)**:
   - แยกชุดข้อมูลหลักสูตร (จำนวนหน่วยกิต, แผนการศึกษา, ไฮไลท์วิชา) ออกจาก Markup เพื่อการบำรุงรักษาที่แม่นยำและแสดงผลผ่าน Dynamic Modal ได้อย่างรวดเร็ว
5. **Interactive Tuition & Loan Utility (`js/calculator.js`)**:
   - โมดูลอิสระสำหรับจำลองค่าธรรมเนียมการศึกษาและสิทธิประโยชน์การกู้ยืม กยศ. ในหน้าแรก
6. **Accessibility & Usability Engineering**:
   - ควบคุมสถานะ `aria-expanded`, `aria-selected`, และ `aria-hidden` ตามสถานะของ UI
   - Modal Dialogs รองรับ Keyboard Navigation, Focus Trap (Tab / Shift+Tab), ปิดด้วยปุ่ม `Escape`, และคืน Focus กลับไปยัง Trigger Element เดิม (`lastFocusedElement.focus()`) เสมอ
7. **Automated Quality Gates & Test Suite (`scripts/`)**:
   - ชุดสคริปต์ Node.js สำหรับตรวจสอบมาตรฐานสถาปัตยกรรม (13 Architectural Gates) และตรวจเช็กความพร้อมก่อน Release (540 Internal Link/Anchor checks, Reciprocal Hreflang, Card Parity, Cache Versions)

---

## 🛠️ ผังเทคโนโลยีและสถาปัตยกรรม (Technology & Tooling Stack)

| Layer / ส่วนประกอบ | เทคโนโลยีและเครื่องมือ (Tech Badges) | หน้าที่และบทบาทในระบบ |
|---|---|---|
| **Presentation** | ![HTML5](https://img.shields.io/badge/HTML5-B91C1C?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-0284C7?style=flat-square&logo=css3&logoColor=white) | โครงสร้าง Semantic Web และสไตล์แสดงผล |
| **CSS Architecture** | ![BEM](https://img.shields.io/badge/Architecture-BEM-DC2626?style=flat-square) | การจัดโครงสร้างคลาส BEM ไร้ Inline Styles |
| **Client-Side Logic** | ![Vanilla JS](https://img.shields.io/badge/Vanilla%20JS-F7DF1E?style=flat-square&logo=javascript&logoColor=000000) | การโต้ตอบผ่าน 17 Component Initializers |
| **Curriculum Data** | ![Data Layer](https://img.shields.io/badge/Data%20Layer-programs--data.js-450A0A?style=flat-square) | แยกชุดข้อมูลหลักสูตรสำหรับ Dynamic Catalog & Modal |
| **Site Architecture** | ![Multi-Page](https://img.shields.io/badge/Multi--Page-25%20Pages-450A0A?style=flat-square) | เว็บไซต์ Static 25 หน้า (ไทย 9, อังกฤษ 8, จีน 8) |
| **Hosting & Deploy** | ![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Direct%20Publish-181717?style=flat-square&logo=github&logoColor=white) | โฮสต์ไฟล์ Static บน GitHub Pages ผ่าน `.nojekyll` |
| **Quality Verification** | ![Assertions](https://img.shields.io/badge/Assertions-820%20Passed-10B981?style=flat-square) | ผ่านการตรวจสอบทุกลิงก์และ DOM Parity ครบ 100% |

---

## 🌐 โครงสร้างภาษาและหน้าเว็บไซต์ (Page Structure)

เว็บไซต์ครอบคลุมเนื้อหาทั้งสิ้น **25 หน้า** แบ่งตามภาษาดังนี้:

| ภาษา (Language) | โฟลเดอร์ (Path) | จำนวนหน้า | รายการหน้าเว็บ |
|---|---|:---:|---|
| **ภาษาไทย (TH)** | `/` และ `pages/` | **9** | `index.html`, `pages/about.html`, `pages/news.html`, `pages/news-detail.html`, `pages/people.html`, `pages/procurement.html`, `pages/programs.html`, `pages/program-detail.html`, `pages/staff.html` |
| **English (EN)** | `en/` | **8** | `en/index.html`, `en/about.html`, `en/news.html`, `en/news-detail.html`, `en/people.html`, `en/programs.html`, `en/program-detail.html`, `en/staff.html` |
| **简体中文 (ZH)** | `zh/` | **8** | `zh/index.html`, `zh/about.html`, `zh/news.html`, `zh/news-detail.html`, `zh/people.html`, `zh/programs.html`, `zh/program-detail.html`, `zh/staff.html` |
| **รวมทั้งหมด** | | **25 หน้า** | **24 หน้าชุดภาษา TH/EN/ZH + 1 หน้าเฉพาะภาษาไทย (Procurement)** |

---

## 📁 โครงสร้างโปรเจกต์ (Project Directory Tree)

```text
D:\Projects\lams-website\
├── index.html                   # หน้าแรกภาษาไทย (TH Homepage - 11 เซกชันเต็มรูปแบบ)
├── pages/                       # หน้าภายในภาษาไทย (Thai Inner Pages - 8 หน้า)
│   ├── about.html               # เกี่ยวกับคณะ / ผู้บริหาร / ปณิธาน / วิสัยทัศน์
│   ├── news.html                # ศูนย์รวมข่าวสารและกิจกรรมคณะ
│   ├── news-detail.html         # รายละเอียดบทความข่าวและประกาศ
│   ├── people.html              # ทำเนียบคณาจารย์และนักวิจัยแยกตามสาขาวิชา
│   ├── procurement.html         # ประกาศจัดซื้อจัดจ้าง e-Bidding และราคากลาง (หน้าเฉพาะภาษาไทย)
│   ├── program-detail.html      # รายละเอียดโครงสร้างหลักสูตรและแผนการเรียน
│   ├── programs.html            # รวมหลักสูตรระดับปริญญาตรีและโท
│   └── staff.html               # ทำเนียบบุคลากรสายสนับสนุนและงานบริการ
├── en/                          # เว็บไซต์ภาษาอังกฤษ (English Portal - 8 หน้า)
│   ├── index.html               # English Homepage
│   ├── about.html               # About the Faculty, Vision, and Leadership
│   ├── news.html                # News & Announcements
│   ├── news-detail.html         # News Article Details
│   ├── people.html              # Academic Faculty Directory
│   ├── program-detail.html      # Academic Curriculum & Program Details
│   ├── programs.html            # Undergraduate & Graduate Programs
│   └── staff.html               # Professional & Supporting Staff Directory
├── zh/                          # เว็บไซต์ภาษาจีน (Chinese Portal - 8 หน้า)
│   ├── index.html               # 学院首页 (Chinese Homepage)
│   ├── about.html               # 学院概况、愿景与领导团队
│   ├── news.html                # 新闻动态与学术公告
│   ├── news-detail.html         # 新闻文章详情
│   ├── people.html              # 专任教师名录与研究方向
│   ├── program-detail.html      # 本科及研究生专业详情
│   ├── programs.html            # 专业介绍与招生信息
│   └── staff.html               # 行政与教学辅助人员名录
├── css/
│   ├── style.css                # สไตล์แกนหลัก: CSS Custom Properties Tokens, Reset, Typography, Semantic Colors
│   ├── components.css           # สไตล์คอมโพเนนต์ BEM: Header, Nav, Hero, Cards, Accordion, Modal, Footer
│   └── pages.css                # สไตล์เฉพาะหน้าภายใน (Inner Pages) และแชร์เลย์เอาต์เฉพาะหมวด
├── js/
│   ├── main.js                  # สคริปต์หลัก ควบคุม 17 Component Initializers ผ่าน runMasterInit()
│   ├── programs-data.js         # โมดูลฐานข้อมูลหลักสูตรสำหรับ Dynamic Catalog & Modal Rendering
│   └── calculator.js            # ยูทิลิตีคำนวณค่าเทอม & กยศ. (Self-initializing บน index.html)
├── assets/
│   ├── images/                  # ไฟล์ภาพตราสัญลักษณ์ทางการ, แคมปัส, ผู้บริหาร, และคณาจารย์
│   └── icons/                   # ไฟล์ไอคอนและ SVG assets
├── scripts/                     # สคริปต์ Node.js สำหรับตรวจสอบคุณภาพสถาปัตยกรรม (Quality Gates)
│   ├── audit-architecture.js    # ตรวจสอบ 13 ข้อกำหนดสถาปัตยกรรม (CSS tokens, zero inline script/event)
│   ├── validate-release.js      # ตรวจสอบความพร้อมก่อน Release (540 ลิงก์, hreflang, Card Parity)
│   ├── verify-full-site.js      # ทดสอบการตอบสนองและ HTTP Status Code ทุกหน้าผ่าน Dev Server
│   └── test-all-interactions.js # ทดสอบ Event Handlers และ Client-side Interactions
├── scratch/                     # โฟลเดอร์เครื่องมือสำหรับพัฒนาในเครื่อง (Local Dev Tools)
│   └── dev-server.js            # Node.js Static Server ขนาดกะทัดรัด (Zero npm dependencies, Port 8088)
├── tone for web/                # คลังศึกษาและเปรียบเทียบโทนสี (Reference Design Assets — ไม่ใช่ runtime dependency)
├── .nojekyll                    # ปิด Jekyll บน GitHub Pages เพื่อให้โหลดโฟลเดอร์และไฟล์ทั้งหมดได้อย่างสมบูรณ์
├── robots.txt                   # ข้อกำหนดสำหรับ Search Engine Crawlers ครอบคลุมทั้ง 3 ภาษา
├── sitemap.xml                  # Multilingual XML Sitemap พร้อม alternate hreflang ครบถ้วนทั้ง 25 หน้า
└── README.md                    # คู่มือสถาปัตยกรรมและการพัฒนาเว็บไซต์สำหรับผู้ดูแลระบบ
```

---

## ⚙️ สถาปัตยกรรม JavaScript (`js/`)

### 1. `js/main.js` (Master Chain & 17 Component Initializers)
ระบบ Client-side Behavior เริ่มต้นการทำงานผ่าน `runMasterInit()` ซึ่งผูกด้วย `{ once: true }` บน Event `DOMContentLoaded` (หรือรันทันทีหาก `readyState !== 'loading'`) เพื่อรับประกันการรันเพียงครั้งเดียวต่อ Lifecycle หน้าเว็บ ฟังก์ชัน initializers แต่ละตัวมี Selector Guard (`if (!el) return;`) และห่อหุ้มด้วย `try...catch`:

| ลำดับ | Initializer | หน้าที่การทำงาน |
|:---:|---|---|
| 1 | `initSiteHeader()` | ควบคุม Header Scroll State, แถบ Sticky Header, และการย่อ/ขยายตามตำแหน่งหน้า |
| 2 | `initSiteNav()` | ควบคุม Mobile Drawer Navigation Menu, ปุ่ม Hamburger, และการปิดเมนูอัตโนมัติ |
| 3 | `initInfoAccordion()` | จัดการ FAQ / Quick Info Accordion แบบ Accessible Toggle (`aria-expanded`) |
| 4 | `initVideoCampaign()` | ควบคุมการเล่นวิดีโอแนะนำคณะและ Event Tracking |
| 5 | `initFloatingMessenger()` | จัดการปุ่มติดต่อด่วนมุมขวาล่าง และการโต้ตอบกับผู้เยี่ยมชม |
| 6 | `initSmoothScroll()` | จัดการ Smooth Scrolling สำหรับ Anchor Links ภายในหน้า |
| 7 | `initProcurementFilters()` | ระบบกรองประกาศจัดซื้อจัดจ้างตามปีงบประมาณและหมวดหมู่งาน |
| 8 | `initToastHelper()` | Helper สำหรับแสดง Notification Toast แจ้งสถานะแก่ผู้ใช้งาน |
| 9 | `initScholarshipModal()` | จัดการ Modal ทุนการศึกษา พร้อมระบบ Focus Trap และ Escape key handling |
| 10 | `initResearchHandlers()` | จัดการแท็บข้อมูลงานวิจัยและผลงานวิชาการของคณาจารย์ |
| 11 | `initLanguageSwitcher()` | จัดการระบบสลับ 3 ภาษา (TH \| EN \| 中文) ให้ตรงกับหน้าที่กำลังเปิดอยู่ |
| 12 | `initCampusVideoModal()` | จัดการ Modal แสดงวิดีโอบรรยากาศมหาวิทยาลัย พร้อม Focus Trap และ Keydown cycle |
| 13 | `initSocialShareSystem()` | ระบบคัดลอกลิงก์และแชร์บทความไปยัง Social Media (Facebook, X, Line) พร้อม Focus Trap |
| 14 | `initNewsFilter()` | ระบบกรองหมวดหมู่ข่าวสารและกิจกรรม (News & Events Filtering) |
| 15 | `initPeopleFilter()` | ระบบค้นหาและคัดกรองบุคลากร/คณาจารย์ตามสาขาวิชาและคำค้น |
| 16 | `initProgramCatalog()` | ระบบแสดงบัตรหลักสูตรและเชื่อมโยงกับฐานข้อมูลหลักสูตร |
| 17 | `initProgramDetail()` | ระบบดึงรายละเอียดหลักสูตรมาแสดงผลในหน้าเจาะลึก |

*(หมายเหตุ: รายการ Initializer ทั้ง 17 ตัวนี้ถูกตรวจสอบและผูกไว้กับ Automated Architecture Audit ใน `scripts/audit-architecture.js` เพื่อรับประกันว่าโค้ดจริงกับเอกสารต้องตรงกันเสมอ)*

### 2. `js/programs-data.js`
ฐานข้อมูลโครงสร้างหลักสูตร (Curriculum Data Layer) ระดับปริญญาตรีและโท ทั้งภาษาไทย ภาษาอังกฤษ และภาษาจีน บรรจุข้อมูลชื่อหลักสูตร, ชื่อปริญญา, จำนวนหน่วยกิต, ค่าธรรมเนียม, อาชีพที่รองรับ, และโครงสร้างหมวดวิชา

### 3. `js/calculator.js`
ยูทิลิตีคำนวณค่าธรรมเนียมการศึกษาและสิทธิประโยชน์ กยศ. แบบ Standalone Module โดยจะแนบออบเจกต์เข้ากับ `window.LamsCalculator = { programs, calculate }` และถูกเรียกใช้งานเฉพาะบนหน้าแรก (`index.html`)

---

## 🎨 รหัสสีมาตรฐานและ Design Tokens (Crimson-Burgundy Aesthetic)

ชุดสีมาตรฐานถูกกำหนดผ่าน CSS Custom Properties ใน `:root` ของ `css/style.css` ภายใต้แนวคิด **REDVOLUTION Collegiate Aesthetic** โดยตั้งเป้าหมาย Contrast Ratio ตามแนวทาง **WCAG 2.2**:

| Token Name | Hex Code | คำอธิบายและวัตถุประสงค์การใช้งาน | บริบทและ Contrast Ratio |
|---|---|---|---|
| `--theme-red-primary` | `#B91C1C` | สีแดงคริมสันหลัก (Primary Crimson) สำหรับหัวข้อสำคัญและปุ่มหลัก | ใช้กับพื้นหลังปุ่มหลักและขอบเน้น |
| `--theme-red-bright` | `#DC2626` | สีแดงสด (Vibrant Ruby) สำหรับสถานะ Hover, Focus และปุ่ม Action | ใช้กับปุ่ม Call-to-Action และสถานะ Active |
| `--theme-red-dark` | `#7F1D1D` | สีแดงไวน์เข้มสำหรับกรอบและการเน้นเลเยอร์รอง | ใช้เป็นสีพื้นหลังการ์ดรองและขอบแบ่งส่วน |
| `--theme-red-deep` | `#450A0A` | สีแดงเบอร์กันดีเข้มลึกสำหรับเงาและขอบการ์ด | ใช้เป็นสีพื้นหลังส่วนล่างและแถบ Dropdown |
| `--theme-ruby` | `#991B1B` | สีแกนทับทิมสำหรับ Accent Badge และป้ายระบุหมวดหมู่ | ใช้กับ Badge หมวดหมู่และไอคอนเสริม |
| `--theme-amber` | `#F59E0B` | สีทองคบเพลิง ม.อ. สำหรับไฮไลท์สำคัญ, การแจ้งเตือน และดาวเด่น | ใชักับ Tag เน้นย้ำ และไอคอน (ไม่ใช่ข้อความบนพื้นขาว) |
| `--theme-success` | `#10B981` | สีเขียวมรกตสำหรับสถานะสำเร็จและเปิดรับสมัคร | ใช้กับป้ายสถานะ TCAS เปิดรับสมัคร |
| `--surface-page` | `#140406` | สีพื้นหลังหน้าเว็บ (Dark Burgundy Charcoal) สบายตาและมีมิติ | พื้นหลังหลักของทุกหน้าเว็บ |
| `--surface-header` | `#0E0204` | สีพื้นหลัง Sticky Header และ Drawer Navigation Menu | พื้นหลังแถบนำทางด้านบน |
| `--surface-card` | `#22080D` | สีพื้นหลังการ์ดเนื้อหา (Wine Card Surface) | พื้นหลังสำหรับ Content Cards ทั้งหมด |
| `--surface-band` | `#2E0D13` | สีพื้นหลังแถบประกาศและ Call-to-Action Band | พื้นหลังสำหรับแถบประชาสัมพันธ์ |
| `--text-primary` | `#FFFFFF` | สีข้อความหัวข้อหลัก (Pure White) | Contrast Ratio > 18.5:1 บน `--surface-page` (ผ่าน WCAG AAA) |
| `--text-secondary` | `#FECDD3` | สีข้อความรอง (Soft Pale Rose) นุ่มนวล สบายสายตา | Contrast Ratio > 12.0:1 บน `--surface-page` (ผ่าน WCAG AAA) |
| `--text-muted` | `#CBD5E1` | สีข้อความเนื้อหาทั่วไป (Slate Clean Muted) | Contrast Ratio > 11.0:1 บน `--surface-page` (ผ่าน WCAG AAA) |

* **Typography**: ใช้ฟอนต์ **Prompt** (Google Fonts) น้ำหนัก `300, 400, 500, 600, 700, 800, 900` เพียงครอบครัวเดียวทั้งระบบ เพื่อความเป็นเอกภาพและประสิทธิภาพในการเรนเดอร์
* **Asset Cache Busting**: ทุกหน้าเชื่อมโยงไฟล์สไตล์และสคริปต์ผ่าน Parameter `?v=20261105_1345` อย่างสอดคล้องกันทั้ง 25 หน้า
* **Visual Exploration Assets**: ในโฟลเดอร์ `tone for web/` ได้รวบรวมภาพตัวอย่างหน้าจอจริงจากการทดลอง 6 โทนสีและคู่สีอ้างอิง เพื่อใช้เป็นข้อมูลประกอบการตัดสินใจเชิงออกแบบ (Reference Assets เท่านั้น ไม่ใช่ runtime dependency)

---

## 💻 การรองรับเบราว์เซอร์ (Browser Compatibility)

เว็บไซต์ทำงานบนมาตรฐาน Web Platform สมัยใหม่ (Modern Evergreen Browsers):

| เบราว์เซอร์ | เวอร์ชันขั้นต่ำที่รองรับ | ฟีเจอร์หลักที่ใช้งาน |
|---|:---:|---|
| **Google Chrome** | 90+ | CSS Custom Properties, CSS Grid, Flexbox, ES6+ Modules |
| **Microsoft Edge** | 90+ | CSS Custom Properties, CSS Grid, Flexbox, ES6+ Modules |
| **Mozilla Firefox** | 88+ | CSS Custom Properties, CSS Grid, Flexbox, ES6+ Modules |
| **Apple Safari** | 14+ | CSS Custom Properties, CSS Grid, Flexbox, ES6+ Modules |

---

## 🚀 วิธีเปิดใช้งานและทดสอบในเครื่อง (Local Development & Testing)

### การเปิดทดสอบ:
* **เปิดดู Static Markup เบื้องต้น**: ดับเบิลคลิกเปิดไฟล์ `index.html` หรือเปิดในเว็บเบราว์เซอร์ใดก็ได้ผ่านโปรโตคอล `file://` เพื่อดูโครงร่างและเนื้อหาเบื้องต้น
* **เปิดทดสอบเต็มรูปแบบ (แนะนำ)**: เนื่องจากการทำงานบางส่วน เช่น การโหลดข้อมูลหลักสูตรจาก `programs-data.js`, Modal Dialogs, และการเปลี่ยนเส้นทางข้ามหน้า แนะนำให้รันผ่าน Local HTTP Server:

```bash
# วิธีที่ 1: รันผ่าน Node.js Dev Server ใน scratch/ (Zero npm dependency, แนะนำ)
node scratch/dev-server.js

# หรือ Python Built-in Server
python -m http.server 8088

# หรือ Node npx serve (ต้องมีอินเทอร์เน็ตในการเรียกแพ็กเกจครั้งแรก)
npx serve -l 8088 .
```
จากนั้นเปิดเบราว์เซอร์ไปที่: `http://localhost:8088`

---

## 🛡️ การตรวจสอบคุณภาพด้วยชุดสคริปต์ (Quality Gate Test Suites)

โปรเจกต์มีชุดสคริปต์ Node.js สำหรับตรวจสอบคุณภาพโค้ดก่อน Release (Zero npm package dependencies):

```bash
# 1. ตรวจสอบมาตรฐานสถาปัตยกรรมและกฎความปลอดภัยทั้ง 13 ข้อ
# (CSS Custom Properties tokens, Zero inline scripts/events, 17 initializers registry)
node scripts/audit-architecture.js

# 2. ตรวจสอบความพร้อมระดับ Release (540 Link & Fragment checks, Hreflang, Card Parity, Cache Query Strings)
# เกณฑ์ตรวจรับ: 0 errors (820 assertions passed)
node scripts/validate-release.js

# 3. ทดสอบการตอบสนองและ HTTP Status Code ของทั้ง 25 หน้า (ต้องเปิดเซิร์ฟเวอร์พอร์ต 8088 ไว้ก่อน)
node scripts/verify-full-site.js

# 4. ทดสอบ Client-side Interaction & Routing (ต้องเปิดเซิร์ฟเวอร์พอร์ต 8088 ไว้ก่อน)
node scripts/test-all-interactions.js
```

---

## 🌐 การนำขึ้นโฮสต์และการ Deploy (Static Hosting & GitHub Pages)

1. **GitHub Pages Deployment**:
   - โปรเจกต์มีไฟล์ `.nojekyll` ที่ Root Directory เพื่อสั่งให้ GitHub Pages ส่งมอบไฟล์ Static โดยตรงโดยไม่ผ่าน Jekyll Processing ทำให้โครงสร้างโฟลเดอร์ภาษาทั้งหมด (`en/`, `zh/`, `pages/`) ทำงานได้อย่างสมบูรณ์
   - เพียงตั้งค่า GitHub Pages ใน Repository Settings ให้ชี้ไปที่ Branch `main` (Root `/`)
2. **Search Engine Optimization (SEO)**:
   - มีไฟล์ `robots.txt` ที่กำหนดสิทธิ์การเข้าถึงสำหรับ Search Engine Crawlers ครอบคลุมทั้ง 3 ภาษา
   - มีไฟล์ `sitemap.xml` ที่ระบุ URL ทั้ง 25 หน้า โดยมี reciprocal `xhtml:link` ครบถ้วนสำหรับ 24 หน้าที่มีคู่ภาษา และระบุเฉพาะ canonical loc สำหรับหน้า Procurement ภาษาไทย

---

## 📞 ข้อมูลติดต่อและหน่วยงานผู้รับผิดชอบ (Contact & Attribution)

* **หน่วยงาน**: คณะศิลปศาสตร์และวิทยาการจัดการ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตสุราษฎร์ธานี  
* **ที่อยู่**: 31 หมู่ 6 ถนนสุราษฎร์-นาสาร ต.ขุนทะเล อ.เมือง จ.สุราษฎร์ธานี 84000  
* **โทรศัพท์**: [077-278873](tel:077-278873)  
* **เว็บไซต์ทางการ**: [https://lams.surat.psu.ac.th](https://lams.surat.psu.ac.th)  
* **ผู้พัฒนา**: นายธนาชัย พรหมแก้ว นักวิชาการอุดมศึกษา  
* **ปีที่พัฒนา**: 2026
