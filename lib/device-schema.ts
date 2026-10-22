import { z } from "zod"

export const deviceTypes = [
  "gateway",
  "sensor",
  "actuator",
  "controller",
  "camera",
] as const

export const deviceStatuses = ["active", "inactive"] as const

export const deviceSchema = z.object({
  name: z.string().trim().min(1, "Device name is required."),
  type: z.enum(deviceTypes),
  coordinate: z.object({
    lat: z.number().finite().min(-90).max(90),
    lng: z.number().finite().min(-180).max(180),
  }),
  status: z.enum(deviceStatuses),
  attributes: z.object({
    ip_address: z.string(),
    manufacturer: z.string(),
    model: z.string(),
    firmware_version: z.string(),
    description: z.string(),
  }),
  telemetry: z.object({
    battery_level: z.number().finite().min(0).max(100),
    signal_strength: z.number().finite(),
    temperature: z.number().finite(),
    last_seen: z.string().datetime({ offset: true }),
  }),
  tags: z.array(z.string()),
})

export type DeviceType = (typeof deviceTypes)[number]
export type DeviceStatus = (typeof deviceStatuses)[number]
export type DeviceFormValues = z.infer<typeof deviceSchema>

export function isDeviceType(value: string): value is DeviceType {
  return deviceTypes.some((type) => type === value)
}

export function isDeviceStatus(value: string): value is DeviceStatus {
  return deviceStatuses.some((status) => status === value)
}

export interface DeviceRecord extends DeviceFormValues {
  id: string
  created_at: string
  updated_at: string
}

export function createDeviceFormDefaults(): DeviceFormValues {
  return {
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
  }
}
