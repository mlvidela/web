// -------- Page --------
document.addEventListener("DOMContentLoaded", function () {
// Inicializa AOS (Animate On Scroll) con duración y que solo se active una vez
AOS.init({ duration: 1000, once: true });

window.addEventListener('load', () => {
AOS.refresh();       // refresca animaciones AOS
showCardsOnScroll(); // muestra las cards visibles si hay alguna que no se mostró aún
});
});

// -------- Collapse --------
const toggles = document.querySelectorAll('[data-bs-toggle="collapse"]');

toggles.forEach(toggle => {
const targetId = toggle.getAttribute("data-bs-target");
const targetElement = document.querySelector(targetId);

toggle.addEventListener("mouseenter", () => {

toggles.forEach(otherToggle => {
const otherId = otherToggle.getAttribute("data-bs-target");
const otherElement = document.querySelector(otherId);

if (otherElement !== targetElement && otherElement.classList.contains("show")) {
const collapseInstance = bootstrap.Collapse.getInstance(otherElement);
if (collapseInstance) {
  collapseInstance.hide();
} else {
  new bootstrap.Collapse(otherElement, { toggle: false }).hide();
}
}
});

if (!targetElement.classList.contains("show")) {
const collapseInstance = bootstrap.Collapse.getInstance(targetElement);
if (collapseInstance) {
collapseInstance.show();
} else {
new bootstrap.Collapse(targetElement, { toggle: false }).show();
}
}
});

const closeCollapseIfNeeded = () => {
setTimeout(() => {
if (!toggle.matches(':hover') && !targetElement.matches(':hover')) {
const collapseInstance = bootstrap.Collapse.getInstance(targetElement);
if (collapseInstance && targetElement.classList.contains("show")) {
  collapseInstance.hide();
}
}
}, 200);
};

toggle.addEventListener("mouseleave", closeCollapseIfNeeded);
targetElement.addEventListener("mouseleave", closeCollapseIfNeeded);
});

// -------- Cards --------
const hiddenCards = document.querySelectorAll('.card[data-aos]');
hiddenCards.forEach(card => card.classList.add('invisible'));

function showCardsOnScroll() {
hiddenCards.forEach(card => {
const rect = card.getBoundingClientRect();
const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
if (isVisible) {
card.classList.remove('invisible');
}
});
}

showCardsOnScroll();
window.addEventListener('scroll', showCardsOnScroll);
window.addEventListener('resize', showCardsOnScroll);

// -------- About Me --------
const aboutPhoto = document.getElementById("aboutPhoto");
const aboutCard = document.getElementById("aboutMeCard");
const allCards = document.querySelectorAll(".timeline .card, .timeline .cardv");
const footer = document.querySelector("footer");

function toggleAboutMe() {
const showingAboutMe = !aboutCard.classList.contains("d-none");

if (showingAboutMe) {
aboutCard.classList.add("d-none");
aboutPhoto.classList.remove("d-none");
allCards.forEach(card => card.style.display = "");
if (footer) footer.style.display = "";
} else {
aboutCard.classList.remove("d-none");
aboutPhoto.classList.add("d-none");
allCards.forEach(card => card.style.display = "none");
if (footer) footer.style.display = "none";
}
}

if (aboutPhoto && aboutCard) {
aboutPhoto.addEventListener("click", toggleAboutMe);
aboutCard.addEventListener("click", toggleAboutMe);
}

// -------- Experience --------
function toggleSection(id) {
document.getElementById(id).classList.toggle('d-none');
}

const experienceCard = document.querySelectorAll('.card');
experienceCard.forEach(card => {
const img = card.querySelector('img');
const details = card.querySelector('div');
if (img && details) {
img.addEventListener('click', () => {
details.classList.toggle('d-none');
});
}
});
