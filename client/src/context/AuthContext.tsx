import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { setAccessToken } from '@/lib/auth'

type AuthContextType = {
  isAuthenticated: boolean
  loading: boolean
  logout: () => void
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

        await api.get('/auth/me')

        setIsAuthenticated(true)
      } catch {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const logout = async () => {
    await api.post('/auth/logout')
    setIsAuthenticated(false)
    setAccessToken('')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)