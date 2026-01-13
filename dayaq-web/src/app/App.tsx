import '@styles/App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { I18nProvider } from './i18n/I18nProvider'
import { routes } from './routes'
import LoginPage from '@features/auth/LoginPage'
import LandingPage from '@features/marketing/LandingPage'

function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<LandingPage />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path="*" element={<Navigate to={routes.home} replace />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  )
}

export default App
