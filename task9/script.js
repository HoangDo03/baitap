

function runningText() {
  const tickers = document.querySelector(".typical_customers_ticker");

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
      x: `-${tickerWidth}`,
      duration: 1,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % tickerWidth),
      },
    });
  });
}
window.addEventListener("load", () => {
  runningText();
  
});