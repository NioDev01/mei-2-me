import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { setAccessToken } from '@/lib/auth'

type AuthContextType = {
  isAuthenticated: boolean
  loading: boolean
  user: User | null
  logout: () => Promise<void>
  login: (accessToken: string) => void
}

type User = {
  id_user: number
  id_mei: number
  email: string
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  async function loadUser() {
  try {
    const res = await api.post('/auth/refresh')

    setAccessToken(res.data.accessToken)

    const me = await api.get('/auth/me')
    setUser(me.data)

    setIsAuthenticated(true)
  } catch {
    setIsAuthenticated(false)
    setUser(null)
  } finally {
    setLoading(false)
  }
}

  loadUser()
  }, [])

  const login = async (accessToken: string) => {
  setAccessToken(accessToken)

  try {
    const me = await api.get('/auth/me')
    setUser(me.data)
    setIsAuthenticated(true)
  } catch {
    setUser(null)
    setIsAuthenticated(false)
  }
}

  const logout = async () => {
  try {
    await api.post('/auth/logout')
  } catch {}

  setIsAuthenticated(false)
  setUser(null)
  setAccessToken('')
}

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        user,
        logout,
        login
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)