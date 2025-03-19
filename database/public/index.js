var swiper = new Swiper(".mySwiper", {
  loop: true,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 300,
    modifier: 1,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: '.nut-next',
    prevEl: '.nut-prev',
  },
});

document.getElementById('nextButton').addEventListener('click', function() {
    swiper.slideNext();
});

// Thêm sự kiện click cho nút "lùi"
document.getElementById('prevButton').addEventListener('click', function() {
    swiper.slidePrev();
});

document.addEventListener("scroll", function() {
  const element = document.querySelector(".mid-content");
  const elementPosition = element.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3; // Điều chỉnh vị trí kích hoạt hiệu ứng

  if (elementPosition < screenPosition) {
      element.classList.add("visible");
  }
});


document.addEventListener("DOMContentLoaded", () => {
  // Hiệu ứng hiển thị khi load trang
  const frame = document.querySelector(".thank-you-frame");
  frame.classList.add("mounted");

  // Xử lý sự kiện click vào biểu tượng hoa để xoay
  const flowerIcons = document.querySelectorAll(".flower-icon");
  flowerIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      icon.classList.toggle("rotate");
    });
  });
});
