export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
} as const

export type AppRouteKey = keyof typeof routes

