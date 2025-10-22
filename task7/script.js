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

const breadcrumb = document.querySelector(".breadcrumb");
const breadcrumbSub = document.getElementById("breadcrumb-sub");
const submenuLinks = document.querySelectorAll(".submenu a");
const default_p = document.querySelector(".default");

document.addEventListener("DOMContentLoaded", () => {
  submenuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      breadcrumb.classList.add("show");
      default_p.style.display = "none";
      e.preventDefault();
      const sub = link.dataset.sub;
      breadcrumbSub.textContent = sub;
    });
  });

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
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  document
    .querySelectorAll(
      ".hero-slide,\
                  .agency-logo,\
                  .candidate,\
                  .filter-wrapper,\
                  .recruit,\
.newest-recruit,\
.box"
    )
    .forEach((el) => {
      observer.observe(el);
    });
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
const myChart = new Chart(ctx, config);

document.addEventListener("DOMContentLoaded", () => {
  const agencyList = document.querySelector(".agency-list");
  const logos = document.querySelectorAll(".agency-logo");
  const prevBtn_agency = document.querySelector(".agency-pre");
  const nextBtn_agency = document.querySelector(".agency-next");
  let currentSlide_agency = 0;

  function getItemsPerView() {
    if (window.innerWidth < 576) return 2;
    if (window.innerWidth < 992) return 3;
    return 7;
  }

  function updateSlide() {
    const perView = getItemsPerView();
    const logoWidth = logos[0].offsetWidth + 16;
    const shiftX = -(logoWidth * perView) * currentSlide_agency;
    agencyList.style.transform = `translateX(${shiftX}px)`;
  }

  function nextSlide() {
    const perView = getItemsPerView();
    const totalSlides = Math.ceil(logos.length / perView);
    currentSlide_agency = (currentSlide_agency + 1) % totalSlides;
    updateSlide();
  }

  function prevSlide() {
    const perView = getItemsPerView();
    const totalSlides = Math.ceil(logos.length / perView);
    currentSlide_agency = (currentSlide_agency - 1 + totalSlides) % totalSlides;
    updateSlide();
  }

  nextBtn_agency.addEventListener("click", nextSlide);
  prevBtn_agency.addEventListener("click", prevSlide);

  window.addEventListener("resize", () => {
    currentSlide_agency = 0;
    agencyList.style.transition = "none";
    updateSlide();
    setTimeout(
      () => (agencyList.style.transition = "transform 0.4s ease"),
      100
    );
    myChart.resize();
    myChart.update();
  });

  updateSlide();

  const loginBox = document.querySelector(".login-box");
  const candidateRoles = document.querySelectorAll(".candidate-role");
  const recruiterRoles = document.querySelectorAll(".recruiter-role");
  const heroSlideshow = document.querySelector(".hero-slideshow");
  const newestRecruit = document.querySelector(".newest-recruit");

  candidateRoles.forEach((el) => (el.style.display = "none"));
  recruiterRoles.forEach((el) => (el.style.display = "none"));
  default_p.style.display = "block";

  const loginBtn = loginBox.querySelector("button");
  loginBtn.addEventListener("click", () => {
    let role = prompt("Nhập role (candidate hoặc recruiter):");
    if (role === "candidate") {
      heroSlideshow.style.display = "none";
      loginBox.style.display = "none";
      candidateRoles.forEach((el) => (el.style.display = "block"));
      recruiterRoles.forEach((el) => (el.style.display = "none"));
      newestRecruit.style.display = "block";
      breadcrumb.classList.add("show");
      breadcrumbSub.textContent = "Người tìm việc";
      default_p.style.display = "none";
    } else if (role === "recruiter") {
      heroSlideshow.style.display = "none";
      loginBox.style.display = "none";
      candidateRoles.forEach((el) => (el.style.display = "none"));
      recruiterRoles.forEach((el) => (el.style.display = "block"));
      newestRecruit.style.display = "none";
      breadcrumb.classList.add("show");
      breadcrumbSub.textContent = "Nhà tuyển dụng";
      default_p.style.display = "none";
    } else {
      alert("Role không hợp lệ!");
    }
  });

  document.querySelectorAll(".auth .content button").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.innerText.includes("Thoát")) {
        loginBox.style.display = "block";
        heroSlideshow.style.display = "block";
        candidateRoles.forEach((el) => (el.style.display = "none"));
        recruiterRoles.forEach((el) => (el.style.display = "none"));
        newestRecruit.style.display = "block";
        breadcrumb.classList.remove("show");
        breadcrumbSub.textContent = "";
      }
    });
  });
});
