import "../styles/themeSelector.css";

export default function ThemeSelector() {
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  return (
    <div className="theme-selector">
      <button className="btn" onClick={() => setTheme("clean")}>Clean</button>
      <button className="btn" onClick={() => setTheme("dark")}>Dark</button>
      <button className="btn" onClick={() => setTheme("green")}>Green</button>
    </div>
  );
}
