import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { routes } from '@app/routes'
import { useAuth } from './AuthProvider'
import type { UserRole } from '@types/auth'

type Props = {
  children: ReactNode
  allowedRoles: UserRole[]
  redirectTo?: string
}

export function RoleGuard({ children, allowedRoles, redirectTo = routes.adminLogin }: Props) {
  const { role } = useAuth()

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to={redirectTo} replace />
  }

  return children
}
