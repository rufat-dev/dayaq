import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from './AuthProvider'
import { routes } from '@app/routes'
import type { UserRole } from '../../types/auth'

type Props = {
  children: ReactNode
  redirectTo?: string
  requiredRoles?: UserRole[]
}

export function ProtectedRoute({ children, redirectTo = routes.forbidden, requiredRoles }: Props) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{ from: location.pathname, requiredRoles }}
      />
    )
  }

  return children
}
