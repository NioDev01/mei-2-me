import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import type { JSX } from 'react/jsx-runtime'

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <div>Carregando...</div>

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return children
}