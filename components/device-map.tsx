"use client"

import { useState, Suspense } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { LeafletMouseEvent } from "leaflet"
import { useMapEvents } from "react-leaflet"
import { Edit, Move, Plus, Trash2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Map,
  MapMarker,
  MapTileLayer,
  MapTooltip,
} from "@/components/ui/map"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DeviceFormFields } from "@/components/device-form-fields"
import { DeviceTypeIcon } from "@/components/device-type-display"
import {
  createDeviceFormDefaults,
  deviceSchema,
  type DeviceFormValues,
} from "@/lib/device-schema"
import { useDeviceStore } from "@/stores/device-store"
import { useMarkers } from "@/hooks/use-markers"

function MapClickHandler({
  onMapClick,
}: {
  onMapClick: (event: LeafletMouseEvent) => void
}) {
  useMapEvents({ click: onMapClick })
  return null
}

export function DeviceMap() {
  const { markers, addMarker, updateMarker, deleteMarker, moveMarker } =
    useMarkers()
  const selectedDeviceId = useDeviceStore((state) => state.selectedDeviceId)
  const setSelectedMarkerId = useDeviceStore(
    (state) => state.setSelectedDeviceId
  )
  const [movingMarkerId, setMovingMarkerId] = useState<string | null>(null)
  const [formMode, setFormMode] = useState<"add" | "edit" | null>(null)
  const [editingMarkerId, setEditingMarkerId] = useState<string | null>(null)
  const [isPickingLocationFor, setIsPickingLocationFor] = useState<
    "add" | "edit" | null
  >(null)
  const form = useForm<DeviceFormValues>({
    resolver: zodResolver(deviceSchema),
    defaultValues: createDeviceFormDefaults(),
  })

  const handleMapClick = (event: LeafletMouseEvent) => {
    const target = event.originalEvent.target
    if (target instanceof Element && target.closest(".leaflet-marker-icon")) {
      return
    }

    if (isPickingLocationFor) {
      form.setValue(
        "coordinate",
        { lat: event.latlng.lat, lng: event.latlng.lng },
        { shouldDirty: true, shouldValidate: true }
      )
      setFormMode(isPickingLocationFor)
      setIsPickingLocationFor(null)
      return
    }

    if (movingMarkerId) {
      moveMarker(movingMarkerId, event.latlng)
      setMovingMarkerId(null)
    }
  }

  const handleOpenAddForm = () => {
    form.reset(createDeviceFormDefaults())
    setEditingMarkerId(null)
    setFormMode("add")
  }

  const handleOpenEditForm = () => {
    const marker = markers.find((item) => item.id === selectedDeviceId)
    if (!marker) {
      return
    }

    form.reset({
      name: marker.name,
      type: marker.type,
      coordinate: marker.coordinate,
      status: marker.status,
      attributes: marker.attributes,
      telemetry: marker.telemetry,
      tags: marker.tags,
    })
    setEditingMarkerId(marker.id)
    setSelectedMarkerId(null)
    setFormMode("edit")
  }

  const handleSubmit = (values: DeviceFormValues) => {
    if (formMode === "edit" && editingMarkerId) {
      updateMarker(editingMarkerId, values)
    } else if (formMode === "add") {
      addMarker(values)
    }
    setFormMode(null)
    setEditingMarkerId(null)
  }

  const selectedMarker = markers.find(
    (marker) => marker.id === selectedDeviceId
  )

  return (
    <Card className="mb-8 lg:ml-4">
      <CardHeader>
        <CardTitle>Device Map</CardTitle>
        <CardDescription>
          Add a device by choosing its location on the map. Click a device to edit,
          move, or delete it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button onClick={handleOpenAddForm}>
            <Plus className="mr-2 h-4 w-4" />
            Add Device
          </Button>
        </div>

        <Dialog
          open={formMode !== null}
          onOpenChange={(open) => {
            if (!open) {
              setFormMode(null)
              setEditingMarkerId(null)
              setIsPickingLocationFor(null)
            }
          }}
        >
          <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-lg">
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <DialogHeader>
                <DialogTitle>
                  {formMode === "edit" ? "Edit Device" : "Add New Device"}
                </DialogTitle>
                <DialogDescription>
                  Update the device payload and choose its location on the map.
                  Device ID and timestamps are managed automatically.
                </DialogDescription>
              </DialogHeader>
              <DeviceFormFields
                form={form}
                onChooseLocation={() => {
                  if (formMode) {
                    setIsPickingLocationFor(formMode)
                    setFormMode(null)
                  }
                }}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormMode(null)
                    setEditingMarkerId(null)
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {formMode === "edit" ? "Save Changes" : "Add Device"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog
          open={selectedDeviceId !== null}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedMarkerId(null)
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Device Actions</DialogTitle>
              <DialogDescription>
                Choose an action for {selectedMarker?.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2">
              <Button
                variant="outline"
                className="justify-start"
                onClick={handleOpenEditForm}
              >
                <Edit />
                Edit Device
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => {
                  if (selectedDeviceId) {
                    setMovingMarkerId(selectedDeviceId)
                    setSelectedMarkerId(null)
                  }
                }}
              >
                <Move />
                Move Position
              </Button>
              <Button
                variant="destructive"
                className="justify-start"
                onClick={() => {
                  if (selectedDeviceId) {
                    deleteMarker(selectedDeviceId)
                    setSelectedMarkerId(null)
                  }
                }}
              >
                <Trash2 />
                Delete Device
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
          {(movingMarkerId || isPickingLocationFor) && (
            <div className="absolute left-1/2 top-4 z-[1000] flex -translate-x-1/2 items-center gap-3 rounded-lg bg-background px-4 py-2 shadow-lg">
              <span className="text-sm">
                {isPickingLocationFor
                  ? "Click the map to choose the device location"
                  : "Click the map to set the new position"}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (isPickingLocationFor) {
                    setFormMode(isPickingLocationFor)
                    setIsPickingLocationFor(null)
                  } else {
                    setMovingMarkerId(null)
                  }
                }}
              >
                Cancel
              </Button>
            </div>
          )}
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                Loading map...
              </div>
            }
          >
            <Map center={[-6.9175, 107.6191]} zoom={13}>
              <MapTileLayer />
              <MapClickHandler onMapClick={handleMapClick} />
              {markers.map((marker) => (
                <MapMarker
                  key={marker.id}
                  position={marker.coordinate}
                  icon={<DeviceTypeIcon type={marker.type} />}
                  eventHandlers={{
                    click: () => setSelectedMarkerId(marker.id),
                  }}
                >
                  <MapTooltip className="min-w-48">
                    <div className="grid gap-2">
                      <div>
                        <div className="font-semibold">{marker.name}</div>
                        <div className="text-muted-foreground">
                          {marker.type} · {marker.status}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 border-t pt-2">
                        <span className="text-muted-foreground">Battery</span>
                        <span>{marker.telemetry.battery_level}%</span>
                        <span className="text-muted-foreground">Signal</span>
                        <span>{marker.telemetry.signal_strength} dBm</span>
                        <span className="text-muted-foreground">
                          Temperature
                        </span>
                        <span>{marker.telemetry.temperature} °C</span>
                        <span className="text-muted-foreground">Last seen</span>
                        <span>
                          {new Date(
                            marker.telemetry.last_seen
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </MapTooltip>
                </MapMarker>
              ))}
            </Map>
          </Suspense>
        </div>
      </CardContent>
    </Card>
  )
}
