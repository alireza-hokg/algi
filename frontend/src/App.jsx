import { BrowserRouter } from "react-router-dom"

import AppRoutes from "./routes/index.jsx"
import AuthProvider from "./contexts/AuthProvider.jsx"
import { Toaster } from "react-hot-toast";
import CompareProvider from "./contexts/CompareProvider.jsx";
// import CartProvider from "./contexts/CartProvider.jsx";

function App() {
  return (
    <BrowserRouter>
      <CompareProvider>
        <AuthProvider>
          {/* <CartProvider> */}
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                  direction: 'rtl',
                },
                success: {
                  duration: 3000,
                  icon: '✅',
                },
                error: {
                  duration: 4000,
                  icon: '❌',
                },
              }}
            />
            <AppRoutes />
          {/* </CartProvider> */}
        </AuthProvider>
      </CompareProvider>
    </BrowserRouter>
  )
}

export default App;