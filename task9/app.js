document.addEventListener('DOMContentLoaded', function () {
  const logos = document.querySelectorAll('.logo');
  const numLogos = logos.length;
  const radius = 150; // The radius of the circular path

  // Loop through each logo and apply a rotation transform
  logos.forEach((logo, index) => {
    const angle = (index / numLogos) * 360; // Calculate angle for each logo
    const x = radius * Math.cos((angle * Math.PI) / 180); // X position
    const y = radius * Math.sin((angle * Math.PI) / 180); // Y position

    logo.style.transform = `translate(${x}px, ${y}px)`;
  });
});
