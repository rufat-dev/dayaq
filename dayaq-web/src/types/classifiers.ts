export type ResultMessage = {
  TextCode: string
  Text: string
}

export type ResultResponse<TModel> = {
  HttpStatus: number
  Messages: ResultMessage[]
  Model?: TModel
}

export type ClassifierBase = {
  Name: string
  Description: string
}

export type CurrencyDto = ClassifierBase & {
  Id: number
  Coefficent: number
}

export type PaymentTypeDto = ClassifierBase & {
  Id: number
}

export type PeriodDto = ClassifierBase & {
  Id: number
  PeriodTime: number
}

export type SpecialtyDto = ClassifierBase & {
  Id: number
}

export type CurrencyCreateDto = ClassifierBase & {
  Coefficent: number
}

export type CurrencyUpdateDto = ClassifierBase & {
  Coefficent: number
}

export type PaymentTypeCreateDto = ClassifierBase
export type PaymentTypeUpdateDto = ClassifierBase

export type PeriodCreateDto = ClassifierBase & {
  PeriodTime: number
}

export type PeriodUpdateDto = ClassifierBase & {
  PeriodTime: number
}

export type SpecialtyCreateDto = ClassifierBase
export type SpecialtyUpdateDto = ClassifierBase

export type ClassifierKind = 'currency' | 'paymentType' | 'period' | 'specialty'

export type AdminCategoryRow = {
  id: number
  name: string
  type: string
  active: boolean
  kind: ClassifierKind
}
