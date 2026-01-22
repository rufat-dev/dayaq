import type { ApplicationType, DeviceInfo, DeviceType } from '../types/auth'

const DEVICE_TYPE_VALUES = {
  Android: 0,
  iOS: 1,
  Windows: 2,
  Mac: 3,
  Linux: 4,
} as const

const APP_TYPE_VALUES = {
  Web: 0,
  Mobile: 2,
} as const

const getDeviceType = (userAgent: string, platform: string): DeviceType => {
  const normalizedAgent = userAgent.toLowerCase()
  const normalizedPlatform = platform.toLowerCase()

  if (normalizedAgent.includes('android')) return DEVICE_TYPE_VALUES.Android
  if (normalizedAgent.includes('iphone') || normalizedAgent.includes('ipad')) return DEVICE_TYPE_VALUES.iOS
  if (normalizedPlatform.includes('win')) return DEVICE_TYPE_VALUES.Windows
  if (normalizedPlatform.includes('mac')) return DEVICE_TYPE_VALUES.Mac
  return DEVICE_TYPE_VALUES.Linux
}

const getOsName = (deviceType: DeviceType) => {
  switch (deviceType) {
    case DEVICE_TYPE_VALUES.Android:
      return 'Android'
    case DEVICE_TYPE_VALUES.iOS:
      return 'iOS'
    case DEVICE_TYPE_VALUES.Windows:
      return 'Windows'
    case DEVICE_TYPE_VALUES.Mac:
      return 'macOS'
    default:
      return 'Linux'
  }
}

export const getDeviceInfo = (): DeviceInfo => {
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
  const platform = typeof navigator !== 'undefined' ? navigator.platform : 'unknown'
  const deviceType = getDeviceType(userAgent, platform)
  const appType: ApplicationType = APP_TYPE_VALUES.Web

  return {
    Name: 'Dayaq Web',
    DeviceType: deviceType,
    AppType: appType,
    OSName: getOsName(deviceType),
    OSVersion: userAgent,
    UUID: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}`,
  }
}
