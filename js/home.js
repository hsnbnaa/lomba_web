const swiper = new Swiper(".slider-wrapper", {
  loop: true,
  grabCursor: true,
  spaceBetween: 30,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  autoplay: {
    delay: 3000, 
    disableOnInteraction: false, // Tetap melanjutkan autoplay setelah interaksi pengguna
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    620: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1440: {
      slidesPerView: 4,
    },
  },
});

const textInputs = document.querySelectorAll(
  'input[type="text"], input[type="password"]'
);

textInputs.forEach((input) => {
  input.addEventListener("input", function () {
    if (this.value) {
      this.style.color = "black";
    }
  });
});