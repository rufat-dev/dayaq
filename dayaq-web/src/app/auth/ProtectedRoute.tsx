import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from './AuthProvider'
import { routes } from '@app/routes'

type Props = {
  children: ReactNode
  redirectTo?: string
}

export function ProtectedRoute({ children, redirectTo = routes.adminLogin }: Props) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />
  }

  return children
}
