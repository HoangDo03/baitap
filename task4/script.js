const topHeader = document.querySelector(".top-header-wrapper");
const bottomHeader = document.querySelector(".bottom-header-wrapper");
const menuBtn = document.querySelector(".icon-menu");
const mobileMenu = document.getElementById("mobile-menu");
const btnclose = document.querySelector(".close-btn");
const overlay = document.getElementById("overlay");
const tabs = document.querySelectorAll(".tab");
const posts_tab = document.querySelectorAll(".posts");
const slider = document.querySelector(".container-section");
const slidesContainer = slider.querySelector(".tab-content");
const slides = slider.querySelectorAll("post");
const dotsContainer = slider.querySelector(".slider-dots");
const dots = slider.querySelectorAll("dot");

let lastScroll = 0;
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        bottomHeader.classList.add("sticky");
      } else {
        bottomHeader.classList.remove("sticky");
      }
      ticking = false;
    });
    ticking = true;
  }
});

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  overlay.classList.toggle("active");
});

btnclose.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    posts_tab.forEach((p) => p.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
    mobileMenu.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document
    .querySelectorAll(
      "\
                    .gallery,\
                    .banner-slideshow  .banner-content h1,\
                    .banner-slideshow  .banner-content h2,\
                    .banner-slideshow  .banner-content button,\
                    .text,\
                    .about-row-top .about-text,\
                    .about-img,\
                    .grid-about-text .row,\
                    .about-graphic,\
                    .wrapper-sub-container .title,\
                    .short-line,\
                    .tall-line,\
                    .text-container,\
                    .stock-title,\
                    .stock-chart,\
                    .report-card,\
                    .post-title,\
                    .card,\
                    .slide-img .slide,\
                    .footer > div\
                    "
    )
    .forEach((el) => observer.observe(el));

  renderDots();
  showSlide(0);
  startAutoSlide();
});

let currentIndex = 0;
let timer = null;

function getPerView() {
  if (window.innerWidth > 768) return 3;
  if (window.innerWidth > 576) return 2;
  return 1;
}
function getTotalSlides() {
  return Math.ceil(slides.length / getPerView());
}
function renderDots() {
  dotsContainer.innerHTML = "";
  const total = getTotalSlides();
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i == currentIndex) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = i;
      showSlide(currentIndex);
      startAutoSlide();
    });
    dotsContainer.appendChild(dot);
  }
}
function showSlide(index) {
  const preView = getPerView();
  const total = getTotalSlides();

  if (index > total) index = 0;
  if (index < 0) index = total - 1;
  currentIndex = index;

  const translatePercent = 100 * index;
  slidesContainer.style.transform = `translateX(-${translatePercent}%)`;
  const dots = dotsContainer.querySelectorAll(".dot");
  dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
}

function nextSlide() {
  const total = getTotalSlides();
  currentIndex = (currentIndex + 1) % total;
  showSlide(currentIndex);
}

function startAutoSlide() {
  stopAutoSlide();
  timer = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
  clearInterval(timer);
}

window.addEventListener("resize", () => {
  const total = getTotalSlides();
  if (currentIndex >= total) currentIndex = 0;
  renderDots();
  showSlide(currentIndex);
});
