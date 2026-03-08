import Navbar from "./components/common/Navbar"
import Sidebar from "./components/common/Sidebar"
import Dashboard from "./pages/Dashboard"
import Analytics from "./pages/Analytics"
import Advisor from "./pages/Advisor"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      {/* We use a flex container that spans the full viewport height.
        The overflow-hidden on the parent prevents the whole page from bouncing.
      */}
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
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/advisor" element={<Advisor />} />
            </Routes>
          </main>
          
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App