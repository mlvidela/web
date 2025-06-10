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
