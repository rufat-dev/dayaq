import { delay, http, HttpResponse } from 'msw'

import type { LoginRequest, RegistrationRequest } from '../../types/auth'

const randomDelay = () => delay(300 + Math.floor(Math.random() * 500))

const isEmpty = (value: string | undefined | null) => !value || value.trim().length === 0

export const authHandlers = [
  http.post('/api/Login', async ({ request }) => {
    await randomDelay()
    const body = (await request.json()) as Partial<LoginRequest>

    if (isEmpty(body.Username) || isEmpty(body.Password)) {
      return HttpResponse.json(
        {
          HttpStatus: 400,
          Messages: [
            { TextCode: 'ERR00035', Text: 'Username is required.' },
            { TextCode: 'ERR00016', Text: 'Password is required.' },
          ],
        },
        { status: 400 },
      )
    }

    if (body.Username === 'forbidden@gmail.com') {
      return HttpResponse.json(
        { HttpStatus: 400, Messages: [{ TextCode: 'ERR00100', Text: 'Unexpected error contact with admin' }] },
        { status: 400 },
      )
    }

    if (body.Username === 'missing@gmail.com') {
      return HttpResponse.json(
        { HttpStatus: 404, Messages: [{ TextCode: 'ERR00024', Text: 'User does not exist' }] },
        { status: 404 },
      )
    }

    if (body.Username === 'conflict@gmail.com') {
      return HttpResponse.json(
        {
          HttpStatus: 409,
          Messages: [{ TextCode: 'ERR00026', Text: 'User found. But used another provider.' }],
        },
        { status: 409 },
      )
    }

    if (body.Username === 'server@gmail.com') {
      return HttpResponse.json(
        { HttpStatus: 500, Messages: [{ TextCode: 'ERR00100', Text: 'Unexpected error contact with admin' }] },
        { status: 500 },
      )
    }

    if (body.Password === 'wrongwrong') {
      return HttpResponse.json(
        { HttpStatus: 401, Messages: [{ TextCode: 'ERR00025', Text: 'Password is incorrect' }] },
        { status: 401 },
      )
    }

    return HttpResponse.json({ accessToken: 'mock-access-token' })
  }),
  http.post('/api/Registration', async ({ request }) => {
    await randomDelay()
    const body = (await request.json()) as Partial<RegistrationRequest>

    if (
      isEmpty(body.Name) ||
      isEmpty(body.Surname) ||
      isEmpty(body.FatherName) ||
      isEmpty(body.BirthDate) ||
      isEmpty(body.Email) ||
      isEmpty(body.PhoneNumber) ||
      isEmpty(body.Password)
    ) {
      return HttpResponse.json(
        {
          HttpStatus: 400,
          Messages: [{ TextCode: 'ERR00001', Text: 'Required fields missing.' }],
        },
        { status: 400 },
      )
    }

    if (body.Email?.includes('exists')) {
      return HttpResponse.json(
        { HttpStatus: 400, Messages: [{ TextCode: 'ERR00022', Text: 'Email Already Exist!' }] },
        { status: 400 },
      )
    }

    if (body.Email?.includes('forbidden')) {
      return HttpResponse.json(
        { HttpStatus: 403, Messages: [{ TextCode: 'ERR00100', Text: 'Forbidden.' }] },
        { status: 403 },
      )
    }

    if (body.Email?.includes('missing')) {
      return HttpResponse.json(
        { HttpStatus: 404, Messages: [{ TextCode: 'ERR00024', Text: 'User does not exist' }] },
        { status: 404 },
      )
    }

    if (body.Email?.includes('server')) {
      return HttpResponse.json(
        { HttpStatus: 500, Messages: [{ TextCode: 'ERR00100', Text: 'Unexpected error contact with admin' }] },
        { status: 500 },
      )
    }

    return HttpResponse.json({}, { status: 200 })
  }),
]
