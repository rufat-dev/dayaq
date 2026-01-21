export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  userCategorySelection: '/register/category',
  adminLogin: '/adminlogin',
  adminPanel: '/adminpanel',
  forbidden: '/forbidden',
} as const

export type AppRouteKey = keyof typeof routes

