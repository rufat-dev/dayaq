import { apiFetch } from './httpClient'
import type {
  CurrencyCreateDto,
  CurrencyDto,
  CurrencyUpdateDto,
  PaymentTypeCreateDto,
  PaymentTypeDto,
  PaymentTypeUpdateDto,
  PeriodCreateDto,
  PeriodDto,
  PeriodUpdateDto,
  ResultResponse,
  SpecialtyCreateDto,
  SpecialtyDto,
  SpecialtyUpdateDto,
} from '../../types/classifiers'

export const getCurrencies = () => apiFetch<ResultResponse<CurrencyDto[]>>('/api/Currencies', { auth: false })

export const getPaymentTypes = () =>
  apiFetch<ResultResponse<PaymentTypeDto[]>>('/api/PaymentTypes', { auth: false })

export const getPeriods = () => apiFetch<ResultResponse<PeriodDto[]>>('/api/Periods', { auth: false })

export const getSpecialties = () => apiFetch<ResultResponse<SpecialtyDto[]>>('/api/Specialties', { auth: false })

export const createCurrency = (payload: CurrencyCreateDto) =>
  apiFetch<ResultResponse<CurrencyDto>>('/api/Currencies', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

export const updateCurrency = (id: number, payload: CurrencyUpdateDto) =>
  apiFetch<ResultResponse<CurrencyDto>>(`/api/Currencies/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

export const createPaymentType = (payload: PaymentTypeCreateDto) =>
  apiFetch<ResultResponse<PaymentTypeDto>>('/api/PaymentTypes', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

export const updatePaymentType = (id: number, payload: PaymentTypeUpdateDto) =>
  apiFetch<ResultResponse<PaymentTypeDto>>(`/api/PaymentTypes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

export const createPeriod = (payload: PeriodCreateDto) =>
  apiFetch<ResultResponse<PeriodDto>>('/api/Periods', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

export const updatePeriod = (id: number, payload: PeriodUpdateDto) =>
  apiFetch<ResultResponse<PeriodDto>>(`/api/Periods/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

export const createSpecialty = (payload: SpecialtyCreateDto) =>
  apiFetch<ResultResponse<SpecialtyDto>>('/api/Specialties', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

export const updateSpecialty = (id: number, payload: SpecialtyUpdateDto) =>
  apiFetch<ResultResponse<SpecialtyDto>>(`/api/Specialties/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
