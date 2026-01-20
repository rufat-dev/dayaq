import '@styles/App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'

import { I18nProvider } from './i18n/I18nProvider'
import { routes } from './routes'
import LoginPage from '@features/auth/LoginPage'
import LandingPage from '@features/marketing/LandingPage'
import RegistrationPage from '@features/auth/RegistrationPage'

function App() {
  useEffect(() => {
    const root = document.documentElement
    if (!root.dataset.theme) {
      root.dataset.theme = 'light'
    }
  }, [])

  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<LandingPage />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.register} element={<RegistrationPage />} />
          <Route path="*" element={<Navigate to={routes.home} replace />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  )
}

export default App
