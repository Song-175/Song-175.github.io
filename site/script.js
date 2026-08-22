const root = document.documentElement;
const themeToggle = document.querySelector("[data-theme-toggle]");
const header = document.querySelector("[data-header]");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light" || savedTheme === "dark") {
  root.dataset.theme = savedTheme;
}

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealItems = document.querySelectorAll(".reveal");

requestAnimationFrame(() => {
  revealItems.forEach((item, index) => {
    window.setTimeout(() => item.classList.add("is-visible"), Math.min(index * 45, 360));
  });
});

const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear().toString();
}
