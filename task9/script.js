
window.addEventListener("load", () => {
  const figures = document.querySelectorAll(".home_wrapper figure");
  figures.forEach((fig, i) => {
    setTimeout(() => fig.classList.add("show"), i * 250);
  });
});
const btn_mobile_menu = document.querySelector(".btn_menu_mobile");
const menu_mobile = document.querySelector(".mobile-menu");
const btn_close = document.querySelector(".fa-xmark");
btn_mobile_menu.addEventListener("click", () => {
  menu_mobile.classList.add("active");
});
btn_close.addEventListener("click", () => {
  menu_mobile.classList.remove("active");
});
function runningText() {
  const tickers = document.querySelectorAll(".typical_customers_ticker");

  tickers.forEach((ticker) => {
    const parent = ticker.parentElement;
    const originalText = ticker.innerHTML.trim();
    ticker.innerHTML = "";

    for (let i = 0; i < 15; i++) {
      const span = document.createElement("span");
      span.innerHTML = originalText;
      ticker.appendChild(span);
    }

    const tickerWidth = ticker.scrollWidth / 15;
    gsap.to(ticker, {
      x: `${tickerWidth}`,
      duration: 1,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % tickerWidth),
      },
    });
  });
}
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

window.addEventListener("load", () => {
  runningText();
  runningShowcase()
});