import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'

import { useAuth } from '@app/auth/AuthProvider'
import { useI18n } from '@app/i18n/I18nProvider'
import { routes } from '@app/routes'
import { LanguageSwitcher, ThemeToggle } from '@components/HeaderControls'
import {
  createCurrency,
  createPaymentType,
  createPeriod,
  createSpecialty,
  getCurrencies,
  getPaymentTypes,
  getPeriods,
  getSpecialties,
  updateCurrency,
  updatePaymentType,
  updatePeriod,
  updateSpecialty,
} from '@services/api/classifiersApi'
import { ApiError } from '@services/api/httpClient'
import { getResultErrorMessage } from '@utils/apiErrors'
import type {
  AdminCategoryRow,
  ClassifierKind,
  CurrencyDto,
  PaymentTypeDto,
  PeriodDto,
  SpecialtyDto,
} from '../../types/classifiers'
import './AdminPanelPage.css'

type CategoryFormState = {
  name: string
  description: string
  kind: ClassifierKind
  active: boolean
  coefficient: string
  periodTime: string
}

const DEFAULT_FORM_STATE: CategoryFormState = {
  name: '',
  description: '',
  kind: 'currency',
  active: true,
  coefficient: '1',
  periodTime: '30',
}

function AdminPanelPage() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { t } = useI18n()
  const commonCopy = t.common
  const copy = t.adminPanel
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [activeSection, setActiveSection] = useState<'categories' | 'users' | 'tags' | 'settings'>(
    'categories',
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRow, setEditingRow] = useState<AdminCategoryRow | null>(null)
  const [formState, setFormState] = useState<CategoryFormState>(DEFAULT_FORM_STATE)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const currenciesQuery = useQuery({
    queryKey: ['currencies'],
    queryFn: getCurrencies,
  })

  const paymentTypesQuery = useQuery({
    queryKey: ['payment-types'],
    queryFn: getPaymentTypes,
  })

  const periodsQuery = useQuery({
    queryKey: ['periods'],
    queryFn: getPeriods,
  })

  const specialtiesQuery = useQuery({
    queryKey: ['specialties'],
    queryFn: getSpecialties,
  })

  const createMutation = useMutation({
    mutationFn: async (payload: CategoryFormState) => {
      switch (payload.kind) {
        case 'currency':
          return createCurrency({
            Name: payload.name,
            Description: payload.description,
            Coefficent: Number(payload.coefficient) || 1,
          })
        case 'paymentType':
          return createPaymentType({ Name: payload.name, Description: payload.description })
        case 'period':
          return createPeriod({
            Name: payload.name,
            Description: payload.description,
            PeriodTime: Number(payload.periodTime) || 30,
          })
        case 'specialty':
          return createSpecialty({ Name: payload.name, Description: payload.description })
      }
    },
    onSuccess: () => {
      void currenciesQuery.refetch()
      void paymentTypesQuery.refetch()
      void periodsQuery.refetch()
      void specialtiesQuery.refetch()
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: number; payload: CategoryFormState }) => {
      switch (payload.kind) {
        case 'currency':
          return updateCurrency(id, {
            Name: payload.name,
            Description: payload.description,
            Coefficent: Number(payload.coefficient) || 1,
          })
        case 'paymentType':
          return updatePaymentType(id, { Name: payload.name, Description: payload.description })
        case 'period':
          return updatePeriod(id, {
            Name: payload.name,
            Description: payload.description,
            PeriodTime: Number(payload.periodTime) || 30,
          })
        case 'specialty':
          return updateSpecialty(id, { Name: payload.name, Description: payload.description })
      }
    },
    onSuccess: () => {
      void currenciesQuery.refetch()
      void paymentTypesQuery.refetch()
      void periodsQuery.refetch()
      void specialtiesQuery.refetch()
    },
  })

  const handleRequestError = (error: unknown) => {
    if (error instanceof ApiError) {
      const message = getResultErrorMessage(error.data)
      if (message) {
        setErrorMessage(message)
        return
      }
    }
    setErrorMessage('Something went wrong. Please try again.')
  }

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const handleSignOut = () => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    logout()

    if (prefersReducedMotion) {
      navigate(routes.adminLogin)
      return
    }

    setIsExiting(true)
    setIsVisible(false)
    window.setTimeout(() => navigate(routes.adminLogin), 200)
  }

  const rows = useMemo<AdminCategoryRow[]>(() => {
    const currencies = (currenciesQuery.data?.Model ?? []) as CurrencyDto[]
    const paymentTypes = (paymentTypesQuery.data?.Model ?? []) as PaymentTypeDto[]
    const periods = (periodsQuery.data?.Model ?? []) as PeriodDto[]
    const specialties = (specialtiesQuery.data?.Model ?? []) as SpecialtyDto[]

    const mapped: AdminCategoryRow[] = [
      ...currencies.map((item) => ({
        id: item.Id,
        name: item.Name,
        type: 'Currency',
        active: true,
        kind: 'currency',
      })),
      ...paymentTypes.map((item) => ({
        id: item.Id,
        name: item.Name,
        type: 'Payment type',
        active: true,
        kind: 'paymentType',
      })),
      ...periods.map((item) => ({
        id: item.Id,
        name: item.Name,
        type: 'Period',
        active: true,
        kind: 'period',
      })),
      ...specialties.map((item) => ({
        id: item.Id,
        name: item.Name,
        type: 'Specialty',
        active: true,
        kind: 'specialty',
      })),
    ]

    const term = searchTerm.trim().toLowerCase()
    if (!term) return mapped
    return mapped.filter((item) => item.name.toLowerCase().includes(term))
  }, [
    currenciesQuery.data?.Model,
    paymentTypesQuery.data?.Model,
    periodsQuery.data?.Model,
    specialtiesQuery.data?.Model,
    searchTerm,
  ])

  const isLoading =
    currenciesQuery.isLoading ||
    paymentTypesQuery.isLoading ||
    periodsQuery.isLoading ||
    specialtiesQuery.isLoading

  const isError =
    currenciesQuery.isError ||
    paymentTypesQuery.isError ||
    periodsQuery.isError ||
    specialtiesQuery.isError

  const handleAddCategory = () => {
    setEditingRow(null)
    setFormState(DEFAULT_FORM_STATE)
    setErrorMessage(null)
    setIsModalOpen(true)
  }

  const handleEditCategory = (row: AdminCategoryRow) => {
    setEditingRow(row)
    setFormState({
      name: row.name,
      description: '',
      kind: row.kind,
      active: row.active,
      coefficient: '1',
      periodTime: '30',
    })
    setErrorMessage(null)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingRow(null)
    setErrorMessage(null)
  }

  const handleFormChange = (field: keyof CategoryFormState, value: string | boolean) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    setErrorMessage(null)
    try {
      if (editingRow) {
        await updateMutation.mutateAsync({ id: editingRow.id, payload: formState })
      } else {
        await createMutation.mutateAsync(formState)
      }
      handleModalClose()
    } catch (error) {
      handleRequestError(error)
    }
  }

  return (
    <div
      className={`page admin-panel-page ${isVisible ? 'admin-panel-page--visible' : ''} ${
        isExiting ? 'admin-panel-page--exit' : ''
      }`}
    >
      <header className="site-header">
        <div className="container header-content">
          <div className="brand">{commonCopy.brand}</div>
          <div className="header-actions">
            <button className="btn ghost" type="button" onClick={handleSignOut}>
              {copy.signOut}
            </button>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="section admin-panel-layout">
        <aside className="admin-panel-sidebar">
          <button
            type="button"
            className={`admin-panel-nav ${activeSection === 'categories' ? 'admin-panel-nav--active' : ''}`}
            onClick={() => setActiveSection('categories')}
          >
            Categories
          </button>
          <button
            type="button"
            className={`admin-panel-nav ${activeSection === 'users' ? 'admin-panel-nav--active' : ''}`}
            onClick={() => setActiveSection('users')}
          >
            Users
          </button>
          <button
            type="button"
            className={`admin-panel-nav ${activeSection === 'tags' ? 'admin-panel-nav--active' : ''}`}
            onClick={() => setActiveSection('tags')}
          >
            Tags
          </button>
          <button
            type="button"
            className={`admin-panel-nav ${activeSection === 'settings' ? 'admin-panel-nav--active' : ''}`}
            onClick={() => setActiveSection('settings')}
          >
            Settings
          </button>
        </aside>
        <section className="admin-panel-main">
          {activeSection === 'categories' ? (
            <div className="admin-panel-card">
              <div className="admin-panel-header">
                <h1>Categories</h1>
                <button className="btn primary" type="button" onClick={handleAddCategory}>
                  Add New Category
                </button>
              </div>
              <div className="admin-panel-toolbar">
                <input
                  type="search"
                  className="admin-panel-search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
              {isLoading ? <p className="admin-panel-status">Loading categories...</p> : null}
              {isError ? (
                <p className="admin-panel-status admin-panel-status--error">
                  Unable to load categories. Please try again.
                </p>
              ) : null}
              {!isLoading && !isError && rows.length === 0 ? (
                <p className="admin-panel-status">No categories found.</p>
              ) : null}
              {!isLoading && rows.length > 0 ? (
                <div className="admin-panel-table">
                  <div className="admin-panel-row admin-panel-row--header">
                    <span>ID</span>
                    <span>Name</span>
                    <span>Type</span>
                    <span>Active</span>
                    <span>Actions</span>
                  </div>
                  {rows.map((row) => (
                    <div key={`${row.kind}-${row.id}`} className="admin-panel-row">
                      <span>{row.id}</span>
                      <span>{row.name}</span>
                      <span>{row.type}</span>
                      <span>{row.active ? '✓' : '✗'}</span>
                      <span className="admin-panel-actions">
                        <button type="button" className="btn ghost" onClick={() => handleEditCategory(row)}>
                          Edit
                        </button>
                        <button type="button" className="btn ghost" disabled>
                          Delete
                        </button>
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="admin-panel-card admin-panel-card--empty">
              <h1>{copy.heading}</h1>
              <p className="lede">{copy.lede}</p>
            </div>
          )}
        </section>
      </main>

      {isModalOpen ? (
        <div className="admin-modal">
          <div className="admin-modal__panel">
            <h2>{editingRow ? 'Edit Category' : 'Add Category'}</h2>
            <label className="field">
              <span>Name</span>
              <input
                type="text"
                value={formState.name}
                onChange={(event) => handleFormChange('name', event.target.value)}
              />
            </label>
            <label className="field">
              <span>Description</span>
              <input
                type="text"
                value={formState.description}
                onChange={(event) => handleFormChange('description', event.target.value)}
              />
            </label>
            <label className="field">
              <span>Type</span>
              <select
                value={formState.kind}
                onChange={(event) => handleFormChange('kind', event.target.value as ClassifierKind)}
              >
                <option value="currency">Currency</option>
                <option value="paymentType">Payment type</option>
                <option value="period">Period</option>
                <option value="specialty">Specialty</option>
              </select>
            </label>
            {formState.kind === 'currency' ? (
              <label className="field">
                <span>Coefficient</span>
                <input
                  type="number"
                  value={formState.coefficient}
                  onChange={(event) => handleFormChange('coefficient', event.target.value)}
                />
              </label>
            ) : null}
            {formState.kind === 'period' ? (
              <label className="field">
                <span>Period time</span>
                <input
                  type="number"
                  value={formState.periodTime}
                  onChange={(event) => handleFormChange('periodTime', event.target.value)}
                />
              </label>
            ) : null}
            <label className="field admin-modal__checkbox">
              <span>Active</span>
              <input
                type="checkbox"
                checked={formState.active}
                onChange={(event) => handleFormChange('active', event.target.checked)}
              />
            </label>
            {errorMessage ? (
              <p className="form-status form-status--error" role="alert">
                {errorMessage}
              </p>
            ) : null}
            <div className="admin-modal__actions">
              <button type="button" className="btn primary" onClick={handleSave}>
                Save
              </button>
              <button type="button" className="btn ghost" onClick={handleModalClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default AdminPanelPage
