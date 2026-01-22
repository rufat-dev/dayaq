type ResultMessage = {
  Text?: string
  TextCode?: string
}

type ResultErrorPayload = {
  Messages?: ResultMessage[]
}

export const getResultErrorMessage = (data: unknown) => {
  if (!data || typeof data !== 'object') return null
  const payload = data as ResultErrorPayload
  const message = payload.Messages?.[0]?.Text
  return message && message.length > 0 ? message : null
}
