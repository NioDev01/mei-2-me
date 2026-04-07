import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { setAccessToken } from '@/lib/auth'

type AuthContextType = {
  isAuthenticated: boolean
  loading: boolean
  logout: () => Promise<void>
  login: (accessToken: string) => void
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  async function loadUser() {
    try {
      const res = await api.post('/auth/refresh')

      setAccessToken(res.data.accessToken)

      setIsAuthenticated(true)
    } catch {
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  loadUser()
  }, [])

  const login = (accessToken: string) => {
  setAccessToken(accessToken)
  setIsAuthenticated(true)
  }

  const logout = async () => {
  try {
    await api.post('/auth/logout')
  } catch {}
  
  setIsAuthenticated(false)
  setAccessToken('')
}

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, logout, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)