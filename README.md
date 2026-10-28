# 🎓 LAMS PSU Surat Thani - Official Website Redesign 2026
**คณะศิลปศาสตร์และวิทยาการจัดการ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตสุราษฎร์ธานี**  
*Project Architecture: BU Creative & Futuristic Structure Adapted Edition*

---

## 📁 โครงสร้างโปรเจกต์ (Project Directory Tree)

```text
D:\Projects\lams-website\
├── index.html              # หน้าแรก LAMS PSU (11 เซกชันเต็มรูปแบบสไตล์ BU + ข่าวจัดซื้อจัดจ้าง)
├── css/
│   ├── style.css           # สไตล์หลัก: Resets, Variables, Typography, Layout
│   └── components.css      # สไตล์คอมโพเนนต์: Header, Hero, Action Bar, Cards, Accordion, Procurement
├── js/
│   ├── main.js             # สคริปต์ควบคุมการทำงาน: Sticky Header, Mobile Nav, Accordion, Procurement Filter
│   └── calculator.js       # โมดูลคำนวณค่าเทอม & กยศ.
├── assets/
│   ├── images/             # โฟลเดอร์เก็บรูปภาพแคมปัสและรูปภาพหลักสูตร
│   └── icons/              # โฟลเดอร์เก็บไอคอนและกราฟิก
└── README.md               # เอกสารคู่มือสำหรับโปรแกรมเมอร์และผู้ดูแลระบบ
```

---

## 🚀 วิธีเปิดใช้งาน (Getting Started)

### วิธีที่ 1: เปิดทดสอบทันที (Zero Configuration)
ดับเบิลคลิกที่ไฟล์ `index.html` เพื่อเปิดดูหน้าเว็บในเว็บเบราว์เซอร์ (Chrome, Edge, Firefox, Safari) ได้ทันทีโดยไม่ต้องติดตั้งโปรแกรมเสริม

### วิธีที่ 2: รันผ่าน Local Web Server (แนะนำสำหรับโปรแกรมเมอร์)
หากใช้งาน VS Code สามารถคลิกขวาที่ไฟล์ `index.html` แล้วเลือก **Open with Live Server** หรือรันผ่านคำสั่ง:
```bash
# Python Built-in Server
python -m http.server 8000

# หรือ Node npx serve
npx serve .
```

---

## 🎨 รหัสสีมาตรฐาน (Design Tokens)

สามารถปรับแต่งโทนสีหลักได้ที่ไฟล์ `css/style.css` ภายใต้ `:root`:

| Token Name | Hex Code | คำอธิบาย |
|---|---|---|
| `--psu-navy` | `#092540` | สีกรมท่าทางการ ม.อ. |
| `--psu-blue` | `#003B71` | สีน้ำเงินมหาวิทยาลัยสงขลานครินทร์ |
| `--psu-teal` | `#00A896` | สีเขียวมิ้นต์ Teal จุดเด่นประจำแบรนด์ |
| `--psu-cyan` | `#38BDF8` | สีฟ้าสว่างไฮไลท์ข้อความสำคัญ |
| `--psu-gold` | `#F59E0B` | สีทองสำหรับแคมเปญนักศึกษาใหม่ |
| `--bu-dark-bg` | `#0F141C` | สีพื้นหลังดำชาร์โคลสไตล์โมเดิร์น |
| `--bu-card-dark` | `#18202A` | สีพื้นหลังการ์ดเนื้อหา |

---

## 🧩 คู่มือการแปลงเป็น WordPress Custom Theme (WordPress Migration Guide)

หากทีมโปรแกรมเมอร์ต้องการนำโปรเจกต์นี้ไปทำเป็นธีมของ **WordPress**:

1. **สร้างโฟลเดอร์ธีม**: ใน `wp-content/themes/lams-psu-2026/`
2. **แยกไฟล์ Header**: นำโค้ดตั้งแต่ `<!DOCTYPE html>` จนถึง `</header>` ไปใส่ใน `header.php`
3. **แยกไฟล์ Footer**: นำโค้ดตั้งแต่ `<footer id="about">` จนถึง `</html>` ไปใส่ใน `footer.php`
4. **สร้างหน้าแรก**: นำเนื้อหาส่วนกลางที่เหลือไปใส่ใน `front-page.php` และเรียกใช้:
   ```php
   <?php get_header(); ?>
   <!-- เนื้อหา 10 เซกชัน -->
   <?php get_footer(); ?>
   ```
5. **Enqueue Styles & Scripts**: ใน `functions.php` เรียกใช้ `css/style.css`, `css/components.css`, และ `js/main.js` ผ่านฟังก์ชัน `wp_enqueue_style()` และ `wp_enqueue_script()`

---

## 📞 ข้อมูลติดต่อและลิขสิทธิ์
* **หน่วยงาน**: คณะศิลปศาสตร์และวิทยาการจัดการ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตสุราษฎร์ธานี
* **ที่อยู่**: 31 หมู่ 6 ต.ขุนทะเล อ.เมือง จ.สุราษฎร์ธานี 84000
* **โทรศัพท์**: 077-278873
* **ปีที่พัฒนา**: 2026
