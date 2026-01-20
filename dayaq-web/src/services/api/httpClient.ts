import { getAuthToken } from './tokenStore'

const DEFAULT_HEADERS = {
  Accept: 'application/json',
} as const

type ApiRequestOptions = RequestInit & {
  auth?: boolean
}

export async function apiFetch<TResponse>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<TResponse> {
  const { auth = true, headers, body, ...rest } = options
  const token = getAuthToken()
  const requestHeaders = new Headers(headers)

  if (!requestHeaders.has('Accept')) {
    requestHeaders.set('Accept', DEFAULT_HEADERS.Accept)
  }

  if (auth && token) {
    requestHeaders.set('Authorization', `Bearer ${token}`)
  }

  if (!requestHeaders.has('Content-Type') && !(body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json')
  }

  const response = await fetch(path, {
    ...rest,
    headers: requestHeaders,
    body,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed with status ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as TResponse
  }

  return (await response.json()) as TResponse
}
