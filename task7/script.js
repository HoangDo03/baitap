const topHeader = document.querySelector(".header-top-wrapper");
const bottomHeader = document.querySelector(".header-bottom-wrapper");
let lastScroll = 0;
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        bottomHeader.classList.add("sticky");
      } else {
        bottomHeader.classList.remove("sticky");
      }
      ticking = false;
    });
    ticking = true;
  }
});

const btn_mobile_menu = document.querySelector(".btn-mobile-menu");
const menu_mobile = document.querySelector(".menu-mobile");
const btn_close = document.querySelector(".fa-circle-xmark");
const overlay = document.querySelector(".overlay");
btn_mobile_menu.addEventListener("click", () => {
  menu_mobile.classList.add("active");
  overlay.classList.add("active");
});
btn_close.addEventListener("click", () => {
  menu_mobile.classList.remove("active");
  overlay.classList.remove("active");
});

const ctx = document.getElementById("myChart").getContext("2d");
const data = {
  labels: ["2010", "2011", "2012", "2013"],
  datasets: [
    {
      label: "Nhóm A",
      data: [350000, 400000, 420000, 370000],
      backgroundColor: "#04447F",
    },
    {
      label: "Nhóm B",
      data: [300000, 350000, 340000, 290000],
      backgroundColor: "#B41E24",
    },
    {
      label: "Nhóm C",
      data: [50000, 40000, 80000, 90000],
      backgroundColor: "#43A047",
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      // title: {
      //   display: true,
      //   text: 'Thống kê theo năm (2010–2013)'
      // }
    },
  },
};
new Chart(ctx, config);

document.addEventListener("DOMContentLoaded", () => {
  const newsFlex = document.querySelector(".news-flex");
  const items = document.querySelectorAll(".news-item");
  const prevBtn = document.querySelector(".pre");
  const nextBtn = document.querySelector(".next");
  let currentSlide = 0;
  function getItemsPerView() {
    if (window.innerWidth < 576) return 1;
    if (window.innerWidth < 992) return 2;
    return 2;
  }
  function totalSlides() {
    return Math.ceil(items.length / getItemsPerView());
  }

  function updateSlide() {
    const shift = -(100 / getItemsPerView()) * currentSlide;
    newsFlex.style.transform = `translateX(${shift}%)`;
  }

  nextBtn.addEventListener("click", () => {
    currentSlide++;
    if (currentSlide >= totalSlides) currentSlide = 0;
    updateSlide();
  });

  prevBtn.addEventListener("click", () => {
    currentSlide--;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    updateSlide();
  });

  const agencyList = document.querySelector(".agency-list");
  const logos = document.querySelectorAll(".agency-logo");
  const prevBtn_agency = document.querySelector(".agency-pre");
  const nextBtn_agency = document.querySelector(".agency-next");

  const itemsPerView_agency = 5;
  const totalItems_agency = logos.length;
  const totalSlides_agency = Math.ceil(totalItems_agency / itemsPerView_agency);
  let currentSlide_agency = 0;

  function updateAgencySlide() {
    const shift = -(100 / itemsPerView_agency) * currentSlide_agency;
    agencyList.style.transform = `translateX(${shift}%)`;
  }

  nextBtn_agency.addEventListener("click", () => {
    currentSlide_agency++;
    if (currentSlide_agency >= totalSlides_agency) currentSlide_agency = 0;
    updateAgencySlide();
  });

  prevBtn_agency.addEventListener("click", () => {
    currentSlide_agency--;
    if (currentSlide_agency < 0) currentSlide_agency = totalSlides_agency - 1;
    updateAgencySlide();
  });
});
