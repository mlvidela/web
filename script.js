// -------- PAGE --------
document.addEventListener("DOMContentLoaded", function () {
  // Inicializa animaciones de scroll
  AOS.init({ duration: 1000, once: true });

  window.addEventListener('load', () => {
    AOS.refresh();       // Refresca AOS por si hubo elementos cargados luego
    showCardsOnScroll(); // Muestra las cards que estén visibles
  });
});

// -------- MENU (hover para mostrar submenú) --------
const toggles = document.querySelectorAll('[data-bs-toggle="collapse"]');

toggles.forEach(toggle => {
  const targetId = toggle.getAttribute("data-bs-target");
  const targetElement = document.querySelector(targetId);
  let closeTimeout;

  // Mostrar submenú al pasar el mouse
  toggle.addEventListener("mouseenter", () => {
    // Cierra otros submenús abiertos
    toggles.forEach(otherToggle => {
      const otherId = otherToggle.getAttribute("data-bs-target");
      const otherElement = document.querySelector(otherId);
      if (otherElement !== targetElement && otherElement.classList.contains("show")) {
        const instance = bootstrap.Collapse.getInstance(otherElement) || new bootstrap.Collapse(otherElement, { toggle: false });
        instance.hide();
      }
    });

    // Muestra el submenú actual
    const collapseInstance = bootstrap.Collapse.getInstance(targetElement) || new bootstrap.Collapse(targetElement, { toggle: false });
    collapseInstance.show();

    clearTimeout(closeTimeout); // Por si saliste y volviste rápido
  });

  // Oculta si el mouse sale
  toggle.addEventListener("mouseleave", () => closeCollapseIfNeeded(toggle, targetElement));
  targetElement.addEventListener("mouseleave", () => closeCollapseIfNeeded(toggle, targetElement));
});

// Función auxiliar para ocultar submenús con un pequeño delay
function closeCollapseIfNeeded(toggle, targetElement) {
  setTimeout(() => {
    if (!toggle.matches(':hover') && !targetElement.matches(':hover')) {
      const collapseInstance = bootstrap.Collapse.getInstance(targetElement);
      if (collapseInstance && targetElement.classList.contains("show")) {
        collapseInstance.hide();
      }
    }
  }, 300);
}

// -------- ABOUT ME (imagen y tarjeta) --------
function toggleAboutMe() {
  const img = document.querySelector('.about-clickable');
  const card = document.getElementById('aboutMeCard');

  const showingCard = !card.classList.contains('d-none');
  card.classList.toggle('d-none', showingCard);
  img.style.display = showingCard ? 'block' : 'none';
}