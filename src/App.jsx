import Navbar from "./components/common/Navbar"
import Sidebar from "./components/common/Sidebar"
import Dashboard from "./pages/Dashboard"
import Analytics from "./pages/Analytics"
import Advisor from "./pages/Advisor"

import { HashRouter, Routes, Route, Navigate } from "react-router-dom"

function App() {
  return (
    <HashRouter>
      <div className="flex h-screen w-full bg-background overflow-hidden">

        {/* FIXED SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT AREA */}
        <div className="flex-grow flex flex-col min-w-0 overflow-hidden">

          {/* TOP NAVIGATION */}
          <Navbar />

          {/* SCROLLABLE ROUTE CONTAINER */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <Routes>
              {/* Default route when site loads */}
              <Route index element={<Dashboard />} />

              {/* Other pages */}
              <Route path="analytics" element={<Analytics />} />
              <Route path="advisor" element={<Advisor />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>

        </div>
      </div>
    </HashRouter>
  )
}

export default App