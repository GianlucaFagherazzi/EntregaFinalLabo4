import { AppRouter } from "./routes/AppRouter";
import { CartProvider } from "./context/cartContext";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
