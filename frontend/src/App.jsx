import { BrowserRouter } from "react-router-dom"

import AppRoutes from "./routes/index.jsx"
import AuthProvider from "./contexts/AuthProvider.jsx"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <div className="min-h-screen">
            <AppRoutes />
          </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
