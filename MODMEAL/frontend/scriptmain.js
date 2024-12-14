let slideIndex = 0; // กำหนดค่าตัวแปรเริ่มต้น

// ฟังก์ชันสำหรับแสดงสไลด์
function showSlides() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  
  // ซ่อนทุกสไลด์
  slides.forEach((slide) => (slide.style.display = "none"));
  
  // ลบคลาส active จากทุก dot
  dots.forEach((dot) => dot.classList.remove("active"));
  
  // เพิ่ม index เพื่อแสดงสไลด์ถัดไป
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1; // หากสไลด์หมด ให้กลับไปที่สไลด์แรก
  
  slides[slideIndex - 1].style.display = "block"; // แสดงสไลด์ปัจจุบัน
  dots[slideIndex - 1].classList.add("active"); // เพิ่มคลาส active ให้ dot ปัจจุบัน
  
  setTimeout(showSlides, 4000); // เปลี่ยนสไลด์ทุก 4 วินาที
}

// เรียกใช้ Slideshow เมื่อโหลดหน้า
document.addEventListener("DOMContentLoaded", showSlides);

// ฟังก์ชันสำหรับเลือกสไลด์ด้วยปุ่ม Dot
function currentSlide(index) {
  slideIndex = index - 1; // ตั้งค่า slideIndex ตามที่ผู้ใช้เลือก
  showSlides();
}
