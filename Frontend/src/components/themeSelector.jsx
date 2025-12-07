// components/ThemeSelector.jsx
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function ThemeSelector() {
  const { user, updateUser } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div>
      <button className="btn" onClick={() => updateUser({ theme: "clean" })}>Clean</button>
      <button className="btn" onClick={() => updateUser({ theme: "dark" })}>Dark</button>
      <button className="btn" onClick={() => updateUser({ theme: "green" })}>Green</button>
    </div>
  );
}
