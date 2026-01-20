import '@styles/App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'

import { AuthProvider } from './auth/AuthProvider'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { RoleGuard } from './auth/RoleGuard'
import { I18nProvider } from './i18n/I18nProvider'
import { routes } from './routes'
import LoginPage from '@features/auth/LoginPage'
import LandingPage from '@features/marketing/LandingPage'
import RegistrationPage from '@features/auth/RegistrationPage'
import UserCategorySelectionPage from '@features/auth/UserCategorySelectionPage'
import AdminLoginPage from '@features/auth/AdminLoginPage'
import AdminPanelPage from '@features/admin/AdminPanelPage'

function App() {
  useEffect(() => {
    const root = document.documentElement
    if (!root.dataset.theme) {
      root.dataset.theme = 'light'
    }
  }, [])

  return (
    <I18nProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.home} element={<LandingPage />} />
            <Route path={routes.login} element={<LoginPage />} />
            <Route path={routes.adminLogin} element={<AdminLoginPage />} />
            <Route path={routes.userCategorySelection} element={<UserCategorySelectionPage />} />
            <Route path={routes.register} element={<RegistrationPage />} />
            <Route
              path={routes.adminPanel}
              element={
                <ProtectedRoute redirectTo={routes.adminLogin}>
                  <RoleGuard allowedRoles={['admin']} redirectTo={routes.adminLogin}>
                    <AdminPanelPage />
                  </RoleGuard>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to={routes.home} replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </I18nProvider>
  )
}

export default App
