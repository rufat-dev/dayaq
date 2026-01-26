import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { refreshToken } from '@services/api/authApi'
import { setAuthToken } from '@services/api/tokenStore'
import { getRoleFromToken } from '@utils/jwt'
import type { AuthSession, UserRole } from '../../types/auth'

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

const ACCESS_TOKEN_KEY = 'dayaq.accessToken'

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(null)
  const [role, setRole] = useState<UserRole | null>(null)

  const login = (session: AuthSession) => {
    setToken(session.token)
    setRole(session.role)
    setAuthToken(session.token)
    sessionStorage.setItem(ACCESS_TOKEN_KEY, session.token)
  }

  const logout = () => {
    setToken(null)
    setRole(null)
    setAuthToken(null)
    sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  }

  useEffect(() => {
    let isMounted = true

    const hydrateSession = async () => {
      const storedToken = sessionStorage.getItem(ACCESS_TOKEN_KEY)
      if (storedToken) {
        const storedRole = getRoleFromToken(storedToken)
        if (isMounted) {
          setToken(storedToken)
          setRole(storedRole)
          setAuthToken(storedToken)
        }
        return
      }

      try {
        const response = await refreshToken()
        const nextRole = getRoleFromToken(response.accessToken)
        if (!isMounted) return
        setToken(response.accessToken)
        setRole(nextRole)
        setAuthToken(response.accessToken)
        sessionStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken)
      } catch {
        if (!isMounted) return
        setToken(null)
        setRole(null)
        setAuthToken(null)
        sessionStorage.removeItem(ACCESS_TOKEN_KEY)
      }
    }

    void hydrateSession()
    return () => {
      isMounted = false
    }
  }, [])

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
