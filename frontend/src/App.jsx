import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import TopNav from './components/TopNav'
import Dashboard from './pages/Dashboard'
import TreeMap from './pages/TreeMap'
import Profile from './pages/Profile'
import Messages from './pages/Messages'
import Events from './pages/Events'
import Notifications from './pages/Notifications'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tree" element={<TreeMap />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/events" element={<Events />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
