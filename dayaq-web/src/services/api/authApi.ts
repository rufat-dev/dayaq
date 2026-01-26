import { apiFetch } from './httpClient'
import type { LoginRequest, LoginResponse, RefreshTokenResponse, RegistrationRequest } from '../../types/auth'

const LOGIN_PATH = '/api/Login'
const REFRESH_PATH = '/api/Login/refresh'
const REGISTRATION_PATH = '/api/Registration'

const normalizeAccessToken = (response: LoginResponse) => {
  const token = response.accessToken ?? response.AccessToken
  if (!token) {
    throw new Error('Access token missing from response')
  }
  return { accessToken: token }
}

export const login = async (payload: LoginRequest) => {
  const response = await apiFetch<LoginResponse>(LOGIN_PATH, {
    method: 'POST',
    auth: false,
    body: JSON.stringify(payload),
    credentials: 'include',
  })
  return normalizeAccessToken(response)
}

export const refreshToken = async () => {
  const response = await apiFetch<RefreshTokenResponse>(REFRESH_PATH, {
    method: 'POST',
    auth: false,
    credentials: 'include',
  })
  return normalizeAccessToken(response)
}

export const register = (payload: RegistrationRequest) =>
  apiFetch<void>(REGISTRATION_PATH, {
    method: 'POST',
    auth: false,
    body: JSON.stringify(payload),
  })
