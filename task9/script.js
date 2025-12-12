
// window.addEventListener("load", () => {
//   const figures = document.querySelectorAll(".home_wrapper figure");
//   figures.forEach((fig, i) => {
//     setTimeout(() => fig.classList.add("show"), i * 250);
//   });
// });
window.addEventListener("load", () => {
    document.body.classList.remove("preload");
});

const menu = document.querySelector(".menu_header");
const btn_mobile_menu = document.querySelector(".btn_menu_mobile");
const home_btn_mobile_menu = document.querySelector(".home_btn_menu_mobile");
const menu_mobile = document.querySelector(".mobile-menu");
const btn_close = document.querySelector(".btn_close");
let lastScroll = 0;
let ticking = false;
// window.addEventListener("scroll", () => {
//   if (!ticking) {
//     window.requestAnimationFrame(() => {
//       const currentScroll = window.pageYOffset;
//       if (currentScroll > 0.3) {
//         menu.classList.add("sticky");
//         menu_mobile.classList.add("sticky");
//       } else {
//         menu.classList.remove("sticky");
//         menu_mobile.classList.remove("sticky");
//       }
//       ticking = false;
//     });
//     ticking = true;
//   }
// });

if (home_btn_mobile_menu) {
    home_btn_mobile_menu.addEventListener('click', () => {
        home_btn_mobile_menu.classList.toggle('active');
        menu_mobile.classList.add("active");

    });
}

if (btn_mobile_menu) {
    btn_mobile_menu.addEventListener("click", () => {
        menu_mobile.classList.add("active");
 
    });
}

if (btn_close) {
    btn_close.addEventListener("click", () => {
        menu_mobile.classList.remove("active");

    });
}
const homeHeader = document.querySelector('.home_header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        homeHeader.classList.add('scrolled');
    } else {
        homeHeader.classList.remove('scrolled');
    }
});

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(
      ".popup,\
      .popup_float-1,\
      .popup_float-2,\
      .popup_float-3,\
      .popup_shake,\
      .up,\
      .from-right,\
      .from-center"
    )
    .forEach((el) => observer.observe(el));
});
function runningText() {
  const tickers = document.querySelectorAll(".typical_customers_ticker");

  tickers.forEach((ticker) => {
    const originalText = ticker.innerHTML.trim();
    if (!originalText) return;

    ticker.innerHTML = "";

    for (let i = 0; i < 15; i++) {
      const span = document.createElement("span");
      span.innerHTML = originalText;
      ticker.appendChild(span);
    }

    const tickerWidth = ticker.scrollWidth / 15;
    if (!tickerWidth) return;

    gsap.to(ticker, {
      x: `${tickerWidth}px`,
      duration: 15, 
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % tickerWidth)
      }
    });
  });
}

window.addEventListener("load", runningText);



function runningShowcase() {
  const showcaseSliders = document.querySelectorAll(".showcase_slider");

  showcaseSliders.forEach((slider) => {
    const originalItems = Array.from(slider.children);
    const itemCount = originalItems.length;

    for (let i = 0; i < 15; i++) {
      originalItems.forEach(item => {
        slider.appendChild(item.cloneNode(true));
      });
    }

    const itemWidth = originalItems[0].offsetWidth + parseInt(getComputedStyle(originalItems[0]).marginRight);

    gsap.to(slider, {
      x: `-${itemWidth}`,
      duration: 1,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % itemWidth)
      }
    });
  });
}

const hiring_scroller = document.querySelector(".hiring_scroller");
const hiring_line = hiring_scroller.querySelector(".hiring_line");

const totalLines = 6;
for (let i = 1; i < totalLines; i++) {
    hiring_scroller.appendChild(hiring_line.cloneNode(true));
}

let hiring_lines = Array.from(hiring_scroller.querySelectorAll(".hiring_line"));
let y = 0;
const speed = 1;

function hiring_animate() {
    y -= speed;
    hiring_scroller.style.transform = `translateY(${y}px)`;

    const firstLine = hiring_lines[0];

    if (-y >= firstLine.offsetHeight) {
        y += firstLine.offsetHeight;
        hiring_scroller.appendChild(firstLine);
        hiring_lines.push(hiring_lines.shift());
    }

    requestAnimationFrame(hiring_animate);
}


window.addEventListener("load", () => {
  runningText();
  runningShowcase();
  hiring_animate();
  logo_customer();
});