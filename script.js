function scrollToProjects() {
  document.getElementById("projects").scrollIntoView({
    behavior: "smooth"
  });
}

/* Typing effect */
const text = ["Computer Engineering Student", "Future Software Engineer", "Problem Solver"];
let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {
  if (index >= text.length) index = 0;

  currentText = text[index];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  document.getElementById("typing").textContent =
    currentText.substring(0, charIndex);

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1200);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index++;
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();
