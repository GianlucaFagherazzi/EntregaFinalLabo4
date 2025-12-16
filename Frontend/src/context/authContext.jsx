import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Al recargar la página, se mantiene la sesión
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Aplicar tema si existe
      if (parsedUser.theme) {
        applyTheme(parsedUser.theme);
      }
    }
    // Si no hay un usuario logeado o no tiene theme se usa la preferencia del sistema
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const defaultTheme = prefersDark ? "dark" : "clean";
    applyTheme(defaultTheme);
  }, []);

  function login(userData) {
    setUser(userData.user);
    localStorage.setItem("user", JSON.stringify(userData.user));
    localStorage.setItem("token", userData.token);  
    console.log(localStorage.getItem("token"));

    // aplicar el tema del user al entrar
    if (userData.user.theme) {
      applyTheme(userData.user.theme);
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    applyTheme("clean"); // tema por defecto al salir
  }

  function updateUser(fields) {
    if (!user) return;

    const updated = { ...user, ...fields };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));

    if (fields.theme) {
      applyTheme(fields.theme);
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }


  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}