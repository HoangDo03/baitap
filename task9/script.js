
// window.addEventListener("load", () => {
//   const figures = document.querySelectorAll(".home_wrapper figure");
//   figures.forEach((fig, i) => {
//     setTimeout(() => fig.classList.add("show"), i * 250);
//   });
// });
const menu = document.querySelector(".menu_header");
const btn_mobile_menu = document.querySelector(".btn_menu_mobile");
const menu_mobile = document.querySelector(".mobile-menu");
const btn_close = document.querySelector(".fa-xmark");
let lastScroll = 0;
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 0) {
        menu.classList.add("sticky");
        menu_mobile.classList.add("sticky");
      } else {
        menu.classList.remove("sticky");
        menu_mobile.classList.remove("sticky");
      }
      ticking = false;
    });
    ticking = true;
  }
});

btn_mobile_menu.addEventListener("click", () => {
  menu_mobile.classList.add("active");
});
btn_close.addEventListener("click", () => {
  menu_mobile.classList.remove("active");
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
      .from-right"
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
function logo_customer(){
      const logos = document.querySelectorAll('.logo_cus');
    const centerX = 200; // half width of logos-wrapper
    const centerY = 200; // half height of logos-wrapper

    // Layout: 3 concentric circles with increased radius to avoid overlapping the head
    const layout = [
      {count: 5, radius: 110, offsetAngle: 0},         // inner circle
      {count: 4, radius: 160, offsetAngle: 360 / 8},   // middle circle, offset for stagger
      {count: 2, radius: 210, offsetAngle: 0}          // outer circle
    ];

    let logoIndex = 0;

    for (let layer of layout) {
      const angleStep = 360 / layer.count;

      for (let i = 0; i < layer.count; i++) {
        if (logoIndex >= logos.length) break;

        const angleDeg = i * angleStep + layer.offsetAngle;
        const angleRad = angleDeg * Math.PI / 180;

        const x = centerX + layer.radius * Math.cos(angleRad);
        const y = centerY + layer.radius * Math.sin(angleRad);

        logos[logoIndex].style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        logoIndex++;
      }
    }
}
 
document.addEventListener("DOMContentLoaded", () => {
        const leftSide = document.getElementById('leftSide');
        const rightSide = document.getElementById('rightSide');

        // DANH SÁCH LOGO CỦA BẠN
        const logoUrls = [
            'imgs/logo khách hàng/4.png',
            'imgs/logo khách hàng/4.png',
            'imgs/logo khách hàng/4.png',
            'imgs/logo khách hàng/4.png',
            'imgs/logo khách hàng/4.png',
            'imgs/logo khách hàng/4.png',
            'imgs/logo khách hàng/4.png',
            'imgs/logo khách hàng/4.png',
            'imgs/logo khách hàng/4.png',
            'imgs/logo khách hàng/4.png',
            'imgs/logo khách hàng/4.png',
            'imgs/logo khách hàng/4.png',
            'imgs/logo khách hàng/4.png',
            'imgs/logo khách hàng/4.png',
            'imgs/logo khách hàng/4.png',
            
        ];

        // Hàm tạo số ngẫu nhiên trong khoảng [min, max]
        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        // Hàm đặt logo vào container
        function placeLogos(container, urls) {
            urls.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                img.className = 'logo-item';

                // --- TÍNH TOÁN VỊ TRÍ NGẪU NHIÊN ---
                // Top: Từ 5% đến 85% chiều cao container (tránh sát mép trên/dưới)
                const randomTop = randomIntFromInterval(5, 85);
                // Left: Từ 5% đến 80% chiều rộng container (tránh sát mép trái/phải)
                const randomLeft = randomIntFromInterval(5, 80);
                
                img.style.top = `${randomTop}%`;
                img.style.left = `${randomLeft}%`;

                // --- TẠO SỰ ĐA DẠNG ---
                // Kích thước ngẫu nhiên (từ 70% đến 130% kích thước gốc)
                const randomScale = randomIntFromInterval(70, 130) / 100;
                // Góc xoay ngẫu nhiên nhẹ (-10 đến 10 độ)
                const randomRotate = randomIntFromInterval(-10, 10);
                
                img.style.transform = `scale(${randomScale}) rotate(${randomRotate}deg)`;
                
                // Delay animation ngẫu nhiên để chúng không bay cùng nhịp
                img.style.animationDelay = `-${randomIntFromInterval(0, 8)}s`;
                // Thời gian animation ngẫu nhiên (từ 6s đến 12s)
                img.style.animationDuration = `${randomIntFromInterval(6, 12)}s`;

                container.appendChild(img);
            });
        }

        // --- CHIA LOGO VÀO 2 BÊN ---
        // Xáo trộn mảng logo để mỗi lần tải trang là một kiểu sắp xếp khác nhau
        logoUrls.sort(() => Math.random() - 0.5);

        const midPoint = Math.ceil(logoUrls.length / 2);
        const leftLogos = logoUrls.slice(0, midPoint);
        const rightLogos = logoUrls.slice(midPoint);

        // Đặt logo vào container tương ứng
        placeLogos(leftSide, leftLogos);
        placeLogos(rightSide, rightLogos);
    });


window.addEventListener("load", () => {
  runningText();
  runningShowcase();
  hiring_animate();
  logo_customer();
});