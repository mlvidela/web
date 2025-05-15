document.addEventListener("DOMContentLoaded", function () {
AOS.init({ duration: 1000, once: true });

const toggles = document.querySelectorAll('[data-bs-toggle="collapse"]');
toggles.forEach(toggle => {
toggle.addEventListener("click", function () {
const targetId = toggle.getAttribute("data-bs-target");
const targetElement = document.querySelector(targetId);
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
});
});

const hiddenCards = document.querySelectorAll('.card[data-aos]');
hiddenCards.forEach(card => {
card.classList.add('invisible');
});

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

const aboutPhoto = document.getElementById("aboutPhoto");
const aboutCard = document.getElementById("aboutMeCard");
const allCards = document.querySelectorAll('.timeline .card');

function toggleAboutMe() {
const isHidden = aboutCard.classList.contains("d-none");

aboutCard.classList.toggle("d-none");
aboutPhoto.classList.toggle("d-none");

const footer = document.querySelector('.footer');
if (footer) {
footer.style.display = isHidden ? "none" : "";
}

allCards.forEach(card => {
if (card !== aboutCard) {
card.style.display = isHidden ? "none" : "";
}
});
}

if (aboutPhoto && aboutCard) {
aboutPhoto.addEventListener("click", toggleAboutMe);
aboutCard.addEventListener("click", toggleAboutMe);
}
});
