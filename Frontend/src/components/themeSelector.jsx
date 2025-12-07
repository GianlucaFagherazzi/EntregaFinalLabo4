// components/ThemeSelector.jsx
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function ThemeSelector() {
  const { user, updateUser } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div>
      <button onClick={() => updateUser({ theme: "clean" })}>Clean</button>
      <button onClick={() => updateUser({ theme: "dark" })}>Dark</button>
      <button onClick={() => updateUser({ theme: "green" })}>Green</button>
    </div>
  );
}
