"use client"

import { useEffect, useState } from "react"
import type { LatLng } from "leaflet"
import type { DeviceFormValues, DeviceRecord } from "@/interface/device-interface"
import { deviceService, type DeviceOperationResult } from "@/services/device-service"

export function useMarkers() {
  const [markers, setMarkers] = useState<DeviceRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [operationResult, setOperationResult] = useState<DeviceOperationResult | null>(null)

  // fetching data
  useEffect(() => {
    let isCurrent = true
    void deviceService
      .fetchDevices()
      .then((devices) => isCurrent && setMarkers(devices))
      .catch((requestError: unknown) => {
        if (isCurrent) {
          setError(requestError instanceof Error ? requestError.message : "Unable to load devices.")
          console.error("Failed to load devices:", requestError)
        }
      })
      .finally(() => isCurrent && setIsLoading(false))

    return () => {
      isCurrent = false
    }
  }, [])

  // adding data
  const addMarker = async (values: DeviceFormValues) => {
    const result = await deviceService.addDevices(values)
    setOperationResult(result)
    if (!result.success) return result

    const now = new Date().toISOString()
    setMarkers((currentMarkers) => [
      ...currentMarkers,
      {
        ...values,
        attributes: { ...values.attributes } as Record<string, unknown>,
        id: `dev-${crypto.randomUUID()}`,
        created_at: now,
        updated_at: now,
      },
    ])
    return result
  }

  const updateMarker = async (id: string, values: DeviceFormValues) => {
    const result = await deviceService.updateDevices(id, values)
    setOperationResult(result)
    if (!result.success) return result

    setMarkers((currentMarkers) =>
      currentMarkers.map((marker) =>
        marker.id === id
          ? {
              ...marker,
              ...values,
              attributes: { ...marker.attributes, ...values.attributes },
              telemetry: marker.telemetry ? values.telemetry : undefined,
              updated_at: new Date().toISOString(),
            }
          : marker
      )
    )
    return result
  }

  const deleteMarker = async (id: string) => {
    const result = await deviceService.removeDevice(id)
    setOperationResult(result)
    if (!result.success) return result

    setMarkers((currentMarkers) => currentMarkers.filter((marker) => marker.id !== id))
    return result
  }

  // update marker
  const moveMarker = async (id: string, coordinate: LatLng) => {
    const marker = markers.find((item) => item.id === id)
    if (!marker) {
      const result = {
        success: false as const,
        operation: "update" as const,
        status: null,
        code: null,
        message: "Device not found.",
      }
      setOperationResult(result)
      return result
    }

    const updatedMarker: DeviceRecord = {
      ...marker,
      coordinate: { lat: coordinate.lat, lng: coordinate.lng },
      updated_at: new Date().toISOString(),
    }
    const result = await deviceService.updateDevices(id, updatedMarker)
    setOperationResult(result)
    if (!result.success) return result

    setMarkers((currentMarkers) => currentMarkers.map((marker) => (marker.id === id ? updatedMarker : marker)))
    return result
  }

  return {
    markers,
    isLoading,
    error,
    operationResult,
    clearOperationResult: () => setOperationResult(null),
    addMarker,
    updateMarker,
    deleteMarker,
    moveMarker,
  }
}
