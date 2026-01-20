export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  userCategorySelection: '/register/category',
  adminLogin: '/adminlogin',
  adminPanel: '/adminpanel',
} as const

export type AppRouteKey = keyof typeof routes

