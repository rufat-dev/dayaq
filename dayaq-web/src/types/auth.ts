export type UserRole = 'admin' | 'organization' | 'professional' | 'client'

export type AuthSession = {
  token: string
  role: UserRole
}

export type DeviceType = 0 | 1 | 2 | 3 | 4
export type ApplicationType = 0 | 2

export type DeviceInfo = {
  Name: string
  DeviceType: DeviceType
  AppType: ApplicationType
  OSName?: string
  OSVersion?: string
  UUID: string
}

export type LoginRequest = {
  Username: string
  Password: string
  DeviceInfo: DeviceInfo
}

export type LoginResponse = {
  accessToken: string
}

export type RegistrationRequest = {
  Name: string
  Surname: string
  FatherName: string
  BirthDate: string
  Email: string
  PhoneNumber: string
  Password: string
}
