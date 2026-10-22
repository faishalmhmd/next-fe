import axios, { type AxiosResponse } from "axios"
import type { DeviceFormValues, DeviceRecord } from "@/interface/device-interface"
import { deviceRecordSchema } from "@/lib/device-schema"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
const DEVICES_ENDPOINT = "/devices"

export type DeviceOperation = "add" | "update" | "remove"
export type DeviceOperationResult =
  | {
      success: true
      operation: DeviceOperation
      status: number
      code: string | number | null
      message: string
    }
  | {
      success: false
      operation: DeviceOperation
      status: number | null
      code: string | number | null
      message: string
    }

const getPayloadValue = (data: unknown, key: string): unknown => {
  if (typeof data !== "object" || data === null || !(key in data)) {
    return undefined
  }

  return (data as Record<string, unknown>)[key]
}

const getPayloadCode = (data: unknown): string | number | null => {
  const code = getPayloadValue(data, "code")
  return typeof code === "string" || typeof code === "number" ? code : null
}

const getPayloadMessage = (data: unknown): string | undefined => {
  for (const key of ["message", "error", "err"]) {
    const value = getPayloadValue(data, key)
    if (typeof value === "string") {
      return value
    }
  }

  return undefined
}

class DeviceService {
  private readonly apiClient = axios.create({
    baseURL: API_BASE_URL,
  })
  private devicesRequest: Promise<DeviceRecord[]> | null = null

  private ensureApiUrl() {
    if (!API_BASE_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not configured.")
    }
  }

  fetchDevices(): Promise<DeviceRecord[]> {
    this.ensureApiUrl()
    if (this.devicesRequest) {
      return this.devicesRequest
    }

    const request = this.apiClient
      .get<unknown>(DEVICES_ENDPOINT)
      .then(({ data }) => {
        const result = deviceRecordSchema.array().safeParse(data)
        if (!result.success) {
          throw new Error("The devices API returned an invalid response.")
        }

        return result.data
      })
      .finally(() => {
        this.devicesRequest = null
      })

    this.devicesRequest = request
    return request
  }

  private async runOperation(
    operation: DeviceOperation,
    request: () => Promise<AxiosResponse<unknown>>,
    successMessage: string
  ): Promise<DeviceOperationResult> {
    try {
      this.ensureApiUrl()
      const response = await request()
      return {
        success: true,
        operation,
        status: response.status,
        code: getPayloadCode(response.data),
        message: getPayloadMessage(response.data) ?? successMessage,
      }
    } catch (error) {
      const responseData = axios.isAxiosError(error) ? error.response?.data : undefined
      return {
        success: false,
        operation,
        status: axios.isAxiosError(error) ? (error.response?.status ?? null) : null,
        code: getPayloadCode(responseData) ?? (axios.isAxiosError(error) ? (error.code ?? null) : null),
        message:
          getPayloadMessage(responseData) ??
          (error instanceof Error ? error.message : `Unable to ${operation} device.`),
      }
    }
  }

  addDevices(data: DeviceFormValues): Promise<DeviceOperationResult> {
    return this.runOperation("add", () => this.apiClient.post(DEVICES_ENDPOINT, data), "Device added successfully.")
  }

  updateDevices(id: string, data: DeviceFormValues | DeviceRecord): Promise<DeviceOperationResult> {
    return this.runOperation(
      "update",
      () => this.apiClient.put(`${DEVICES_ENDPOINT}/${encodeURIComponent(id)}`, data),
      "Device updated successfully."
    )
  }

  removeDevice(id: string): Promise<DeviceOperationResult> {
    return this.runOperation(
      "remove",
      () => this.apiClient.delete(`${DEVICES_ENDPOINT}/${encodeURIComponent(id)}`),
      "Device removed successfully."
    )
  }
}

export const deviceService = new DeviceService()
