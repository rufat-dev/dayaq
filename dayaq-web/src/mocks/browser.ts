import { setupWorker } from 'msw/browser'

import { authHandlers } from './handlers/auth'
import { classifierHandlers } from './handlers/classifiers'

export const worker = setupWorker(...authHandlers, ...classifierHandlers)
