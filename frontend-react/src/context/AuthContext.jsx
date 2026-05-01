import { createContext, useContext, useState, useEffect } from 'react'
import { authProvider } from '@/api/providers/authProvider'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user')
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password, rememberMe = false) => {
    try {
      const response = await authProvider.login(email, password)
      const { user, token } = response
      
      const storage = rememberMe ? localStorage : sessionStorage
      storage.setItem('token', token)
      storage.setItem('user', JSON.stringify(user))
      
      setUser(user)
      return user
    } catch (error) {
      throw error
    }
  }

  const signup = async (userData) => {
    try {
      const response = await authProvider.signup(userData)
      // Depending on API, signup might auto-login or just return user
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
