let authToken: string | null = null

export const getAuthToken = () => authToken

export const setAuthToken = (token: string | null) => {
  authToken = token
}
