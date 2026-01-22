import { getAuthToken } from './tokenStore'

const DEFAULT_HEADERS = {
  Accept: 'application/json',
} as const

type ApiRequestOptions = RequestInit & {
  auth?: boolean
}

export class ApiError extends Error {
  status: number
  data: unknown

  constructor(message: string, status: number, data: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

const parseErrorBody = async (response: Response) => {
  const contentType = response.headers.get('Content-Type') ?? ''
  if (contentType.includes('application/json')) {
    return (await response.json()) as unknown
  }
  return await response.text()
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
    const data = await parseErrorBody(response)
    const message =
      typeof data === 'string' && data.length > 0
        ? data
        : `Request failed with status ${response.status}`
    throw new ApiError(message, response.status, data)
  }

  if (response.status === 204) {
    return undefined as TResponse
  }

  return (await response.json()) as TResponse
}
