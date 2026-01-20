import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

import { setAuthToken } from '@services/api/tokenStore'
import type { AuthSession, UserRole } from '@types/auth'

type AuthContextValue = {
  token: string | null
  role: UserRole | null
  isAuthenticated: boolean
  login: (session: AuthSession) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

type Props = {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(null)
  const [role, setRole] = useState<UserRole | null>(null)

  const login = (session: AuthSession) => {
    setToken(session.token)
    setRole(session.role)
    setAuthToken(session.token)
  }

  const logout = () => {
    setToken(null)
    setRole(null)
    setAuthToken(null)
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      role,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [role, token],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
