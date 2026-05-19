// Fade-in scroll animation
const sections = document.querySelectorAll("section");

const reveal = () => {
  const trigger = window.innerHeight * 0.85;

  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;

    if (top < trigger) {
      section.classList.add("show");
    }
  });
};

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

// Smooth scrolling
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});
