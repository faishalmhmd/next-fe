import { z } from "zod"
import type { DeviceRecord } from "@/interface/device-interface"

export const deviceSchema = z.object({
  name: z.string().trim().min(1, "Device name is required."),
  type: z.string().trim().min(1, "Device type is required."),
  coordinate: z.object({
    lat: z.number().finite().min(-90).max(90),
    lng: z.number().finite().min(-180).max(180),
  }),
  status: z.string().trim().min(1, "Device status is required."),
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

export const deviceRecordSchema: z.ZodType<DeviceRecord> = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  status: z.string(),
  coordinate: z.object({
    lat: z.number().finite().min(-90).max(90),
    lng: z.number().finite().min(-180).max(180),
  }),
  attributes: z.record(z.string(), z.unknown()),
  telemetry: deviceSchema.shape.telemetry.optional(),
  tags: z.array(z.string()),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})
