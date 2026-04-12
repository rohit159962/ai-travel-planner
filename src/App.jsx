import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PlanTrip from './pages/PlanTrip'
import Itinerary from './pages/Itinerary'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SavedTrips from './pages/SavedTrips'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plan" element={<PlanTrip />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/saved" element={<SavedTrips />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App