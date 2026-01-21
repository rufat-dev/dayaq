import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { routes } from '@app/routes'
import { useAuth } from './AuthProvider'
import type { UserRole } from 'types/auth'

type Props = {
  children: ReactNode
  allowedRoles: UserRole[]
  redirectTo?: string
}

export function RoleGuard({ children, allowedRoles, redirectTo = routes.forbidden }: Props) {
  const { role } = useAuth()
  const location = useLocation()

  if (!role || !allowedRoles.includes(role)) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{
          from: location.pathname,
          requiredRoles: allowedRoles,
        }}
      />
    )
  }

  return children
}
