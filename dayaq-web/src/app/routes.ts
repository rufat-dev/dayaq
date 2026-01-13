export const routes = {
  home: '/',
  login: '/login',
} as const

export type AppRouteKey = keyof typeof routes

