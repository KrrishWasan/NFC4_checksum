import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored authentication
    const storedAuth = localStorage.getItem('tradechain_auth')
    if (storedAuth) {
      const authData = JSON.parse(storedAuth)
      setUser(authData.user)
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = async (walletAddress, signature) => {
    // Simulate wallet authentication
    const userData = {
      walletAddress,
      name: 'Trade Manager',
      role: 'Trade Administrator',
      company: 'Global Trade Corp',
      avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1`
    }
    
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('tradechain_auth', JSON.stringify({ user: userData }))
    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('tradechain_auth')
  }

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}