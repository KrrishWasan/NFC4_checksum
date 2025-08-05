import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

// Components
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import TradeManagement from './pages/TradeManagement'
import Compliance from './pages/Compliance'
import Sustainability from './pages/Sustainability'
import Documents from './pages/Documents'
import Analytics from './pages/Analytics'
import Navbar from './components/Navbar'

// Context
import { AuthProvider, useAuth } from './context/AuthContext'

function AppContent() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-green-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={isAuthenticated ? 
          <><Navbar /><Dashboard /></> : <Navigate to="/login" />} />
        <Route path="/trades" element={isAuthenticated ? 
          <><Navbar /><TradeManagement /></> : <Navigate to="/login" />} />
        <Route path="/compliance" element={isAuthenticated ? 
          <><Navbar /><Compliance /></> : <Navigate to="/login" />} />
        <Route path="/sustainability" element={isAuthenticated ? 
          <><Navbar /><Sustainability /></> : <Navigate to="/login" />} />
        <Route path="/documents" element={isAuthenticated ? 
          <><Navbar /><Documents /></> : <Navigate to="/login" />} />
        <Route path="/analytics" element={isAuthenticated ? 
          <><Navbar /><Analytics /></> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App