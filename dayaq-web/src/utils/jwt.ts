import type { UserRole } from '../types/auth'

type JwtPayload = {
  role?: string
}

const decodeBase64Url = (input: string) => {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
  return atob(padded)
}

export const getRoleFromToken = (token: string): UserRole | null => {
  try {
    const [, payload] = token.split('.')
    if (!payload) return null
    const json = decodeBase64Url(payload)
    const data = JSON.parse(json) as JwtPayload
    const role = data.role
    if (!role) return null
    if (role === 'admin' || role === 'organization' || role === 'professional' || role === 'client') {
      return role
    }
    return null
  } catch {
    return null
  }
}
