document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".main-nav");
  const toggle = document.querySelector(".menu-toggle");
  const form = document.querySelector("#heroSearchForm");
  const input = document.querySelector("#heroSearch");
  const year = document.querySelector("#currentYear");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  if (form && input) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input.value.trim();
      if (!query) {
        input.focus();
        return;
      }
      window.location.href = `recherche.html?q=${encodeURIComponent(query)}`;
    });
  }

  if (year) year.textContent = new Date().getFullYear();
});
