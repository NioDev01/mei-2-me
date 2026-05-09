import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import type { JSX } from 'react/jsx-runtime'
import { LoginSkeleton } from '@/components/skeletons/LoginSkeleton'
import { PainelSkeleton } from '@/components/skeletons/PainelSkeleton'

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    
    if (!isAuthenticated) {
      return <LoginSkeleton />
    }

    return <PainelSkeleton />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return children
}