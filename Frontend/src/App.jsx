import { AppRouter } from "./routes/AppRouter";
import { CartProvider } from "./context/CartContext";
// import { UserProvider } from "./context/UserContext";

function App() {
  return (
    // <UserProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    // </UserProvider>
  );
}

export default App;
