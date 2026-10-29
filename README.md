# 🎓 LAMS PSU Surat Thani - Official Website Redesign 2026
**คณะศิลปศาสตร์และวิทยาการจัดการ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตสุราษฎร์ธานี**  
*Project Architecture: Pure Static Multi-Page Website & Crimson-Burgundy (REDVOLUTION Aesthetic)*

---

## 📁 โครงสร้างโปรเจกต์ (Project Directory Tree)

เว็บไซต์พัฒนาด้วยสถาปัตยกรรม **Pure Static Web Architecture** (HTML5 + Modular CSS + Vanilla ES6+ JavaScript) ปราศจาก Build Step หรือภาระการคอมไพล์ ทำให้โหลดได้เร็วสูงสุดและโฮสต์บน Web Server ใดก็ได้ทันที รองรับ 2 ภาษา (ไทย และ อังกฤษ) รวม 16 หน้า:

```text
D:\Projects\lams-website\
├── index.html              # หน้าแรก LAMS PSU (ภาษาไทย - 11 เซกชันเต็มรูปแบบ)
├── pages/                  # หน้าภายในภาษาไทย (Thai Inner Pages)
│   ├── about.html          # เกี่ยวกับคณะ / ผู้บริหาร / ปณิธาน
│   ├── news.html           # ศูนย์รวมข่าวสาร / ประกาศ
│   ├── news-detail.html    # หน้ารายละเอียดข่าว
│   ├── people.html         # บุคลากร / คณาจารย์
│   ├── procurement.html    # ข่าวจัดซื้อจัดจ้าง e-Bidding
│   ├── program-detail.html # รายละเอียดหลักสูตร
│   ├── programs.html       # รวมหลักสูตรระดับปริญญาตรีและโท
│   └── staff.html          # สายสนับสนุนและบุคลากร
├── en/                     # หน้าภาษาอังกฤษ (English Pages)
│   ├── index.html          # Homepage (English)
│   ├── about.html          # About the Faculty
│   ├── news.html           # News & Events
│   ├── people.html         # Faculty Members
│   ├── program-detail.html # Academic Program Detail
│   ├── programs.html       # Academic Programs
│   └── staff.html          # Supporting Staff
├── css/
│   ├── style.css           # สไตล์แกนหลัก: Tokens, Resets, Typography, Semantic Colors
│   ├── components.css      # สไตล์คอมโพเนนต์ BEM: Header, Nav, Hero, Cards, Accordion, Modal
│   └── pages.css           # สไตล์เฉพาะหน้าภายใน (Inner Pages) และแชร์คอมโพเนนต์
├── js/
│   ├── main.js             # สคริปต์แบบแยกฟังก์ชันคอมโพเนนต์ (Idempotent Component Initializers)
│   └── calculator.js       # โมดูลคำนวณค่าเทอม & กยศ.
├── assets/
│   ├── images/             # รูปภาพแคมปัส บุคลากร และหลักสูตร
│   └── icons/              # ไอคอนและกราฟิก
├── scripts/
│   └── audit-architecture.js # สคริปต์ตรวจสอบคุณภาพสถาปัตยกรรม (Architectural Quality Gate)
└── README.md               # เอกสารคู่มือสำหรับนักพัฒนาและผู้ดูแลระบบ
```

---

## 🚀 วิธีเปิดใช้งานและทดสอบ (Getting Started)

### วิธีที่ 1: เปิดทดสอบทันที (Zero Configuration)
ดับเบิลคลิกที่ไฟล์ `index.html` หรือเปิดในเว็บเบราว์เซอร์ใดก็ได้ (Chrome, Edge, Firefox, Safari) ทันทีโดยไม่ต้องรันเซิร์ฟเวอร์

### วิธีที่ 2: รันผ่าน Local Web Server (แนะนำสำหรับการทดสอบ)
```bash
# Node.js Dev Server
node scratch/dev-server.js

# หรือ Python Built-in Server
python -m http.server 8088

# หรือ Node npx serve
npx serve -l 8088 .
```

### วิธีที่ 3: ตรวจสอบคุณภาพสถาปัตยกรรม (Quality Gate Audit)
```bash
node scripts/audit-architecture.js
```

---

## 🎨 รหัสสีมาตรฐานและ Design Tokens (Crimson-Burgundy Aesthetic)

ชุดสีมาตรฐานถูกนิยามผ่าน CSS Custom Properties ใน `:root` ของไฟล์ `css/style.css`:

| Token Name | Hex / RGBA Code | คำอธิบายและวัตถุประสงค์ |
|---|---|---|
| `--theme-red-primary` | `#B91C1C` | สีแดงคริมสันหลัก (Primary Crimson - WCAG AAA Contrast) |
| `--theme-red-bright` | `#DC2626` | สีแดงทับทิมสดสำหรับปุ่ม Action และสถานะ Active |
| `--theme-red-dark` | `#7F1D1D` | สีแดงไวน์เข้มสำหรับพื้นหลังรอง |
| `--theme-red-deep` | `#450A0A` | สีแดงเบอร์กันดีเข้มลึกสำหรับแถบและขอบเงา |
| `--theme-ruby` | `#991B1B` | สีแกนทับทิมสำหรับ Accent & Badges |
| `--theme-amber` | `#F59E0B` | สีทองคบเพลิงสำหรับไฮไลท์สำคัญและสถานะรอดำเนินการ |
| `--theme-success` | `#10B981` | สีเขียวมรกตสำหรับสถานะสำเร็จ |
| `--surface-page` | `#140406` | สีพื้นหลังหน้าเว็บ (Dark Burgundy Charcoal) |
| `--surface-header` | `#0E0204` | สีพื้นหลัง Sticky Header และ Drawer Nav |
| `--surface-card` | `#22080D` | สีพื้นหลังการ์ดเนื้อหา (Wine Card Surface) |
| `--surface-band` | `#2E0D13` | สีพื้นหลังแถบข้อความสำคัญ |
| `--text-primary` | `#FFFFFF` | สีข้อความหัวข้อหลัก (Pure White High Contrast) |
| `--text-secondary` | `#FECDD3` | สีข้อความรอง (Soft Pale Rose) |
| `--text-muted` | `#CBD5E1` | สีข้อความเนื้อหาทั่วไป (Slate Clean Muted) |

---

## 🧩 มาตรฐานการเขียนโค้ดและ BEM Conventions (CSS / JS Guidelines)

1. **BEM Class Naming**:
   - Block: `.site-header`, `.site-nav`, `.brand-logo`, `.hero-banner`, `.programs-showcase`, `.info-accordion`, `.quick-links`, `.site-footer`, `.site-modal`
   - Element: `.site-modal__dialog`, `.quick-links__col`, `.brand-logo__icon`
   - Modifier / State: `.site-nav.is-open`, `.site-nav--open`, `.site-header--scrolled`
2. **Modular JS Initializers**:
   - `main.js` ทำงานผ่าน 13 Initializers แยกตามความรับผิดชอบ เช่น `initSiteHeader()`, `initSiteNav()`, `initInfoAccordion()`, `initProcurementFilters()`, `initCampusVideoModal()`
   - ทุกฟังก์ชันเป็น **Idempotent** (ตรวจสอบ selector ก่อนทำงาน ปลอดภัยแม้หน้านั้นไม่มี element)
3. **Typography & Assets**:
   - ฟอนต์มาตรฐานเดียวทั่วทั้งเว็บ: `Prompt` (Google Fonts, น้ำหนัก 300, 400, 500, 600, 700, 800, 900)
   - Asset Versioning: ทุก `<link>` และ `<script>` อ้างอิงผ่าน `?v=20261029_0900` เพื่อป้องกันปัญหา Browser Cache ค้าง

---

## 📞 ข้อมูลติดต่อและลิขสิทธิ์
* **ผู้พัฒนา**: นายธนาชัย พรหมแก้ว นักวิชาการอุดมศึกษา
* **หน่วยงาน**: คณะศิลปศาสตร์และวิทยาการจัดการ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตสุราษฎร์ธานี
* **ที่อยู่**: 31 หมู่ 6 ต.ขุนทะเล อ.เมือง จ.สุราษฎร์ธานี 84000
* **โทรศัพท์**: 077-278873
* **ปีที่พัฒนา**: 2026
