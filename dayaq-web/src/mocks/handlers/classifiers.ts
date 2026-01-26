import { delay, http, HttpResponse } from 'msw'

import type {
  CurrencyDto,
  PaymentTypeDto,
  PeriodDto,
  ResultResponse,
  SpecialtyDto,
} from '../../types/classifiers'

const randomDelay = () => delay(250 + Math.floor(Math.random() * 450))

const withResult = <TModel>(model: TModel, status = 200): ResultResponse<TModel> => ({
  HttpStatus: status,
  Messages: [],
  Model: model,
})

const withError = (status: number, textCode: string, text: string) => ({
  HttpStatus: status,
  Messages: [{ TextCode: textCode, Text: text }],
})

const requireAuth = (headers: Headers) => {
  const token = headers.get('Authorization')
  if (!token) {
    return HttpResponse.json(withError(401, 'ERR00025', 'Unauthorized'), { status: 401 })
  }
  if (token.includes('forbidden')) {
    return HttpResponse.json(withError(403, 'ERR00100', 'Forbidden.'), { status: 403 })
  }
  return null
}

const currencies: CurrencyDto[] = [
  { Id: 1, Name: 'AZN', Description: 'Azerbaijani Manat', Coefficent: 1 },
  { Id: 2, Name: 'USD', Description: 'US Dollar', Coefficent: 1.7 },
]

const paymentTypes: PaymentTypeDto[] = [
  { Id: 1, Name: 'Card', Description: 'Bank card' },
  { Id: 2, Name: 'Cash', Description: 'Cash payment' },
]

const periods: PeriodDto[] = [
  { Id: 1, Name: '30 min', Description: 'Short session', PeriodTime: 30 },
  { Id: 2, Name: '60 min', Description: 'Standard session', PeriodTime: 60 },
]

const specialties: SpecialtyDto[] = [
  { Id: 1, Name: 'Anxiety', Description: 'Anxiety support' },
  { Id: 2, Name: 'Sleep', Description: 'Sleep health' },
]

const resolveList = <T>(items: T[], params: URLSearchParams) => {
  if (params.get('empty') === 'true') return []
  return items
}

export const classifierHandlers = [
  http.get('/api/Currencies', async ({ request }) => {
    await randomDelay()
    const params = new URL(request.url).searchParams
    if (params.get('error') === '500') {
      return HttpResponse.json(withError(500, 'ERR00100', 'Unexpected error contact with admin'), {
        status: 500,
      })
    }
    return HttpResponse.json(withResult(resolveList(currencies, params)))
  }),
  http.get('/api/Currencies/:id', async ({ params }) => {
    await randomDelay()
    const id = Number(params.id)
    const item = currencies.find((currency) => currency.Id === id)
    if (!item) {
      return HttpResponse.json(withError(404, 'ERR00024', 'Not found'), { status: 404 })
    }
    return HttpResponse.json(withResult(item))
  }),
  http.post('/api/Currencies', async ({ request }) => {
    await randomDelay()
    const authError = requireAuth(request.headers)
    if (authError) return authError
    return HttpResponse.json(withResult(currencies[0]))
  }),
  http.put('/api/Currencies/:id', async ({ request }) => {
    await randomDelay()
    const authError = requireAuth(request.headers)
    if (authError) return authError
    return HttpResponse.json(withResult(currencies[0]))
  }),

  http.get('/api/PaymentTypes', async ({ request }) => {
    await randomDelay()
    const params = new URL(request.url).searchParams
    if (params.get('error') === '500') {
      return HttpResponse.json(withError(500, 'ERR00100', 'Unexpected error contact with admin'), {
        status: 500,
      })
    }
    return HttpResponse.json(withResult(resolveList(paymentTypes, params)))
  }),
  http.get('/api/PaymentTypes/:id', async ({ params }) => {
    await randomDelay()
    const id = Number(params.id)
    const item = paymentTypes.find((payment) => payment.Id === id)
    if (!item) {
      return HttpResponse.json(withError(404, 'ERR00024', 'Not found'), { status: 404 })
    }
    return HttpResponse.json(withResult(item))
  }),
  http.post('/api/PaymentTypes', async ({ request }) => {
    await randomDelay()
    const authError = requireAuth(request.headers)
    if (authError) return authError
    return HttpResponse.json(withResult(paymentTypes[0]))
  }),
  http.put('/api/PaymentTypes/:id', async ({ request }) => {
    await randomDelay()
    const authError = requireAuth(request.headers)
    if (authError) return authError
    return HttpResponse.json(withResult(paymentTypes[0]))
  }),

  http.get('/api/Periods', async ({ request }) => {
    await randomDelay()
    const params = new URL(request.url).searchParams
    if (params.get('error') === '500') {
      return HttpResponse.json(withError(500, 'ERR00100', 'Unexpected error contact with admin'), {
        status: 500,
      })
    }
    return HttpResponse.json(withResult(resolveList(periods, params)))
  }),
  http.get('/api/Periods/:id', async ({ params }) => {
    await randomDelay()
    const id = Number(params.id)
    const item = periods.find((period) => period.Id === id)
    if (!item) {
      return HttpResponse.json(withError(404, 'ERR00024', 'Not found'), { status: 404 })
    }
    return HttpResponse.json(withResult(item))
  }),
  http.post('/api/Periods', async ({ request }) => {
    await randomDelay()
    const authError = requireAuth(request.headers)
    if (authError) return authError
    return HttpResponse.json(withResult(periods[0]))
  }),
  http.put('/api/Periods/:id', async ({ request }) => {
    await randomDelay()
    const authError = requireAuth(request.headers)
    if (authError) return authError
    return HttpResponse.json(withResult(periods[0]))
  }),

  http.get('/api/Specialties', async ({ request }) => {
    await randomDelay()
    const params = new URL(request.url).searchParams
    if (params.get('error') === '500') {
      return HttpResponse.json(withError(500, 'ERR00100', 'Unexpected error contact with admin'), {
        status: 500,
      })
    }
    return HttpResponse.json(withResult(resolveList(specialties, params)))
  }),
  http.get('/api/Specialties/:id', async ({ params }) => {
    await randomDelay()
    const id = Number(params.id)
    const item = specialties.find((specialty) => specialty.Id === id)
    if (!item) {
      return HttpResponse.json(withError(404, 'ERR00024', 'Not found'), { status: 404 })
    }
    return HttpResponse.json(withResult(item))
  }),
  http.post('/api/Specialties', async ({ request }) => {
    await randomDelay()
    const authError = requireAuth(request.headers)
    if (authError) return authError
    return HttpResponse.json(withResult(specialties[0]))
  }),
  http.put('/api/Specialties/:id', async ({ request }) => {
    await randomDelay()
    const authError = requireAuth(request.headers)
    if (authError) return authError
    return HttpResponse.json(withResult(specialties[0]))
  }),
]
