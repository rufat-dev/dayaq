import { apiFetch } from './httpClient'
import type { LoginRequest, LoginResponse, RegistrationRequest } from '../../types/auth'

const LOGIN_PATH = '/api/Login'
const REGISTRATION_PATH = '/api/Registration'

export const login = (payload: LoginRequest) =>
  apiFetch<LoginResponse>(LOGIN_PATH, {
    method: 'POST',
    auth: false,
    body: JSON.stringify(payload),
  })

export const register = (payload: RegistrationRequest) =>
  apiFetch<void>(REGISTRATION_PATH, {
    method: 'POST',
    auth: false,
    body: JSON.stringify(payload),
  })
