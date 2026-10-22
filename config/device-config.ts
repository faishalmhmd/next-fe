import type {
  DeviceFormValues,
  DeviceStatus,
  DeviceType,
} from "@/interface/device-interface"

export const deviceTypes = [
  "gateway",
  "sensor",
  "router",
  "actuator",
  "controller",
  "camera",
] as const satisfies readonly DeviceType[]

export const deviceStatuses = [
  "active",
  "warning",
  "offline",
  "inactive",
] as const satisfies readonly DeviceStatus[]

export const isDeviceType = (value: string): value is DeviceType => deviceTypes.some((type) => type === value)
export const isDeviceStatus = (value: string): value is DeviceStatus => deviceStatuses.some((status) => status === value)
export const createDeviceFormDefaults = (): DeviceFormValues => ({
  name: "",
  type: "gateway",
  coordinate: {
    lat: Number.NaN,
    lng: Number.NaN,
  },
  status: "active",
  attributes: {
    ip_address: "",
    manufacturer: "",
    model: "",
    firmware_version: "",
    description: "",
  },
  telemetry: {
    battery_level: 95,
    signal_strength: -65,
    temperature: 32.5,
    last_seen: new Date().toISOString(),
  },
  tags: [],
})
