export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function clearTheme() {
  document.documentElement.removeAttribute("data-theme");
}
