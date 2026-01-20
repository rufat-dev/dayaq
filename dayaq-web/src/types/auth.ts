export type UserRole = 'admin' | 'organization' | 'professional' | 'client'

export type AuthSession = {
  token: string
  role: UserRole
}
