import { BrowserRouter } from "react-router-dom"

import AppRoutes from "./routes/index.jsx"
import AuthProvider from "./contexts/AuthProvider.jsx"
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          {/* <div className="min-h-screen flex flex-col"> */}
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
          {/* </div> */}
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;