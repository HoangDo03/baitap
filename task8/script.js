const btn_mobile_menu = document.querySelector(".menu-btn");
const menu_mobile = document.querySelector(".mobile-menu");
const btn_close = document.querySelector(".fa-xmark");
btn_mobile_menu.addEventListener("click", () => {
  menu_mobile.classList.add("active");
});
btn_close.addEventListener("click", () => {
  menu_mobile.classList.remove("active");
});
gsap.registerPlugin(ScrollTrigger);
window.addEventListener("load", () => {
  const figures = document.querySelectorAll(".hero-wrapper figure");
  figures.forEach((fig, i) => {
    setTimeout(() => fig.classList.add("show"), i * 250);
  });
});
function waveAnimation(){
  gsap.to("#wave-svg", {
  x: 30,
  duration: 2,
  ease: "sine.inOut",
  repeat: -1,
  yoyo: true,
});

}

const switchBtn = document.querySelector('.switch');
        const body = document.body;

        switchBtn.addEventListener('click', () => {
            const isOn = body.classList.toggle('on');
            switchBtn.classList.toggle('active', isOn);

            const light = document.querySelector('.text-yl');
            const dark = document.querySelector('.text-wt');

         
            [light, dark].forEach(el => {
                el.style.animation = 'none';
                void el.offsetWidth; 
            });

            if (isOn) {
                
                light.style.animation = 'flicker-on 1.3s ease forwards';
                dark.style.animation = 'flicker-off 1.3s ease forwards';
            } else {
                
                light.style.opacity = 0;
                dark.style.opacity = 1;
            }
        });

function handRoseAnimation(){
  gsap.to(".hand",{
    x: -5,
    ease: "power2.inOut",
    scrollTrigger:{
      trigger: ".hand",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
}
function baconophoneAnimation(){
  const allImages = ".collage-baconophone_media";

            gsap.fromTo(allImages,
                {
                    xPercent: -100, 
                    yPercent: 100,  
                    opacity: 0
                },
                {
                    xPercent: 0,
                    yPercent: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    stagger: 0.2, 
                    scrollTrigger: {
                        trigger: ".collage-baconophone",
                        start: "top center", 
                        toggleActions: "play none none reverse",
                    }
                }
            );
}
function diveAnimation(){
gsap.fromTo(".diver img",
  {
    yPercent: -160,  
    rotate: -15,
    opacity: 1,
    scale: 1
  },
  {
    yPercent: 130,   
    rotate: 5,
    scale: 0.9,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: ".collage-driver",
      start: "top 80%",
      end: "bottom top",
      scrub: true
    }
  }
)
 }
function runningText() {
  const tickers = document.querySelectorAll(".work-slider-ticker");

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
      duration: 2,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % tickerWidth)
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(Draggable);

    const skyImage = document.querySelector(".backround-sky img");
    const dial = document.querySelector(".control-daynight img");

    if (!skyImage || !dial) {
        console.error("Không tìm thấy skyImage hoặc dial.");
        return;
    }

    const skyTl = gsap.timeline({ paused: true });
    skyTl.fromTo(skyImage, 
        { x: 0 }, 
        { 
            x: "-200vw", 
            ease: "none"
        }
    );

    skyTl.progress(0.5); 
    
    gsap.set(dial, { rotation: 180 }); 

    Draggable.create(dial, {
        type: "rotation", 
        bounds: { minRotation: 0, maxRotation: 360 }, 
        
        onDrag: function() {
            let progress = this.rotation / this.maxRotation;
            skyTl.progress(progress);
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
            
            function setupAnimation(containerSelector, linesSelector, movingSelector) {
                const container = document.querySelector(containerSelector);
                
                if (!container) return;
                
                const lines = container.querySelectorAll(linesSelector);
                const mainText = container.querySelector(movingSelector);
                const totalLines = lines.length;

                if (totalLines === 0 || !mainText) return;

                const totalSlideDuration = 1500;
                const pauseAtEndDuration = 1000;

                const finalTarget = lines[totalLines - 1];
                const finalTop = finalTarget.offsetTop;

                const revealDelays = [];
                lines.forEach(line => {
                    const lineTop = line.offsetTop;
                    const revealTime = (lineTop / finalTop) * totalSlideDuration;
                    revealDelays.push(revealTime);
                });

                async function startFullSlide() {
                    lines.forEach(line => line.classList.remove('revealed'));
                    mainText.classList.remove('is-moving');
                    mainText.style.transform = `translateY(0px)`;

                    await new Promise(r => setTimeout(r, 50));

                    mainText.classList.add('is-moving');

                    revealDelays.forEach((delay, index) => {
                        setTimeout(() => {
                            lines[index].classList.add('revealed');
                        }, delay);
                    });

                    mainText.style.transform = `translateY(${finalTop}px)`;

                    setTimeout(startFullSlide, totalSlideDuration + pauseAtEndDuration);
                }

                startFullSlide();
            }

            setupAnimation(
                ".animated-text_container", 
                ".animated-text a", 
                ".animated-text-moving"
            );

            setupAnimation(
                ".animated-text-container-work", 
                ".animated-text-work a", 
                ".animated-text-moving-work"
            );
        });
document.addEventListener("DOMContentLoaded", () => {
  const workSlider = new Swiper(".work-slider", {
    slidesPerView: 3,         
    spaceBetween: 20,         
    loop: true,              
    speed: 4000,             
    autoplay: {
      delay: 0,              
      disableOnInteraction: false, 
    },
    allowTouchMove: false,   
    grabCursor: false,        
    breakpoints: {           
      768: { slidesPerView: 2 },
      576: { slidesPerView: 1.5 },
      400: { slidesPerView: 1 },
    },
  });
});

window.addEventListener("load", ()=> {
  waveAnimation();
  handRoseAnimation();
   runningText();
   baconophoneAnimation();
   diveAnimation();
})
