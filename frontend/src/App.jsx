import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import TravelPreference from './pages/TravelPreference'
import Itinerary from './pages/Itinerary'

function App() {

  return (
    <Router>
    <Routes>
      {/* Route for Registration Page */}
      <Route path="/register" element={<Register />} />

      {/* Route for Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Default Route (Redirect to Registration) */}
      <Route path="*" element={!localStorage.getItem('_id') ? <Login /> : <TravelPreference />} />

      <Route path="/journey-start-here" element={<TravelPreference />} />

      <Route path="/itinerary-generating" element={<Itinerary />} />
    </Routes>
  </Router>
  )
}

export default App
