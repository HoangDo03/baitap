window.addEventListener("load", () => {
  document.body.classList.remove("preload");
});
const toggle = document.getElementById("btnMenu");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
  
  toggle.classList.toggle("active");
  menu.classList.toggle("active");
});