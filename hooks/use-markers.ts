"use client"

import { useState } from "react"
import type { LatLng } from "leaflet"
import type {
  DeviceFormValues,
  DeviceRecord,
} from "@/lib/device-schema"

const initialDevices: DeviceRecord[] = [
  {
    id: "dev-generated-by-be",
    name: "Gateway Bandung 01",
    type: "gateway",
    coordinate: {
      lat: -6.9175,
      lng: 107.6191,
    },
    status: "active",
    attributes: {
      ip_address: "192.168.1.10",
      manufacturer: "Generic",
      model: "GW-100",
      firmware_version: "1.0.0",
      description: "Gateway area Bandung",
    },
    telemetry: {
      battery_level: 95,
      signal_strength: -65,
      temperature: 32.5,
      last_seen: "2026-10-22T08:30:00Z",
    },
    tags: ["bandung", "gateway"],
    created_at: "2026-10-22T08:00:00Z",
    updated_at: "2026-10-22T08:30:00Z",
  },
]

export function useMarkers() {
  const [markers, setMarkers] = useState<DeviceRecord[]>(initialDevices)

  const addMarker = (values: DeviceFormValues) => {
    const now = new Date().toISOString()
    setMarkers((currentMarkers) => [
      ...currentMarkers,
      {
        ...values,
        id: `dev-${crypto.randomUUID()}`,
        created_at: now,
        updated_at: now,
      },
    ])
  }

  const updateMarker = (id: string, values: DeviceFormValues) => {
    setMarkers((currentMarkers) =>
      currentMarkers.map((marker) =>
        marker.id === id
          ? { ...marker, ...values, updated_at: new Date().toISOString() }
          : marker
      )
    )
  }

  const deleteMarker = (id: string) => {
    setMarkers((currentMarkers) =>
      currentMarkers.filter((marker) => marker.id !== id)
    )
  }

  const moveMarker = (id: string, coordinate: LatLng) => {
    setMarkers((currentMarkers) =>
      currentMarkers.map((marker) =>
        marker.id === id
          ? {
              ...marker,
              coordinate: { lat: coordinate.lat, lng: coordinate.lng },
              updated_at: new Date().toISOString(),
            }
          : marker
      )
    )
  }

  return { markers, addMarker, updateMarker, deleteMarker, moveMarker }
}
