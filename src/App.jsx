import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PlanTrip from './pages/PlanTrip'
import Itinerary from './pages/Itinerary'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import Saved from './pages/Saved'
import ChatbotLauncher from './components/ChatbotLauncher'


function App() {
  return (
    <BrowserRouter>
    
      <div className="bg-[#0a0a0f] text-white min-h-screen flex flex-col">
        {/* Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plan" element={<PlanTrip />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
<ChatbotLauncher />
        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App