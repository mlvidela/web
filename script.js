// -------- MODO OSCURO / CLARO --------
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.createElement("button");
  toggleButton.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
  toggleButton.setAttribute("aria-label", "Toggle dark mode");
  toggleButton.style.position = "fixed";
  toggleButton.style.bottom = "20px";
  toggleButton.style.right = "20px";
  toggleButton.style.zIndex = "1000";
  toggleButton.style.padding = "10px";
  toggleButton.style.border = "none";
  toggleButton.style.borderRadius = "50%";
  toggleButton.style.backgroundColor = "#7c3aed";
  toggleButton.style.color = "#fff";
  toggleButton.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
  toggleButton.style.fontSize = "1.2rem";

  toggleButton.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    toggleButton.innerHTML = isLight
      ? '<i class="bi bi-brightness-high-fill"></i>'
      : '<i class="bi bi-moon-stars-fill"></i>';
  });

  document.body.appendChild(toggleButton);
});

// -------- ABOUT ME CARD TOGGLE --------
function toggleAboutMe() {
  const img = document.querySelector('.about-clickable');
  const card = document.getElementById('aboutMeCard');
  const isShowing = !card.classList.contains('d-none');

  if (isShowing) {
    card.classList.add('d-none');
    img.style.display = 'block';
  } else {
    card.classList.remove('d-none');
    img.style.display = 'none';
  }
}

// -------- MENU (hover para mostrar submenú) --------
const toggles = document.querySelectorAll('[data-bs-toggle="collapse"]');

toggles.forEach(toggle => {
  const targetId = toggle.getAttribute("data-bs-target");
  const targetElement = document.querySelector(targetId);

  let closeTimeout;

  toggle.addEventListener("mouseenter", () => {
    toggles.forEach(otherToggle => {
      const otherId = otherToggle.getAttribute("data-bs-target");
      const otherElement = document.querySelector(otherId);
      if (otherElement !== targetElement && otherElement.classList.contains("show")) {
        const instance = bootstrap.Collapse.getInstance(otherElement) || new bootstrap.Collapse(otherElement, { toggle: false });
        instance.hide();
      }
    });

    const collapseInstance = bootstrap.Collapse.getInstance(targetElement) || new bootstrap.Collapse(targetElement, { toggle: false });
    collapseInstance.show();

    clearTimeout(closeTimeout);
  });

  toggle.addEventListener("mouseleave", () => closeCollapseIfNeeded(toggle, targetElement));
  targetElement.addEventListener("mouseleave", () => closeCollapseIfNeeded(toggle, targetElement));
});

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

// -------- AOS y scroll --------
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({ duration: 1000, once: true });

  window.addEventListener('load', () => {
    AOS.refresh();
    // Aquí podés agregar función para mostrar cards visibles si la usás
  });
});