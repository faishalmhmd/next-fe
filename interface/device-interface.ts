export type DeviceType =
  | "gateway"
  | "sensor"
  | "router"
  | "actuator"
  | "controller"
  | "camera"

export type DeviceStatus = "active" | "warning" | "offline" | "inactive"

export interface DeviceAttributes {
  ip_address: string
  manufacturer: string
  model: string
  firmware_version: string
  description: string
}

export interface DeviceTelemetry {
  battery_level: number
  signal_strength: number
  temperature: number
  last_seen: string
}

export interface DeviceFormValues {
  name: string
  type: string
  coordinate: {
    lat: number
    lng: number
  }
  status: string
  attributes: DeviceAttributes
  telemetry: DeviceTelemetry
  tags: string[]
}

export interface DeviceRecord {
  id: string
  name: string
  type: string
  status: string
  coordinate: DeviceFormValues["coordinate"]
  attributes: Record<string, unknown>
  telemetry?: DeviceTelemetry
  tags: string[]
  created_at?: string
  updated_at?: string
}
