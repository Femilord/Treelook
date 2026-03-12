import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import TopNav from './components/TopNav'
import Dashboard from './pages/Dashboard'
import TreeMap from './pages/TreeMap'
import Profile from './pages/Profile'
import Messages from './pages/Messages'
import Events from './pages/Events'
import Notifications from './pages/Notifications'
import AddFamilyMember from './pages/AddFamilyMember'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tree"
          element={
            <ProtectedRoute>
              <TreeMap />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-family-member"
          element={
            <ProtectedRoute>
              <AddFamilyMember />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
