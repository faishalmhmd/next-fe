"use client"

import type { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  deviceStatuses,
  deviceTypes,
  type DeviceFormValues,
  isDeviceStatus,
  isDeviceType,
} from "@/lib/device-schema"
import { DeviceTypeDisplay } from "@/components/device-type-display"
import { MapPin } from "lucide-react"

interface DeviceFormFieldsProps {
  form: UseFormReturn<DeviceFormValues>
  onChooseLocation: () => void
}

export function DeviceFormFields({
  form,
  onChooseLocation,
}: DeviceFormFieldsProps) {
  const { register, formState } = form
  const coordinate = form.watch("coordinate")
  const type = form.watch("type")
  const status = form.watch("status")
  const tags = form.watch("tags")
  const coordinateError =
    formState.errors.coordinate?.lat?.message ??
    formState.errors.coordinate?.lng?.message

  return (
    <div className="grid gap-4 py-4">
      <label className="grid gap-2 text-sm font-medium">
        Name
        <Input {...register("name")} placeholder="Device name" />
        {formState.errors.name?.message && (
          <span className="text-xs text-destructive">
            {formState.errors.name.message}
          </span>
        )}
      </label>

      <label className="grid gap-2 text-sm font-medium">
        Type
        <Select
          value={type}
          onValueChange={(value) => {
            if (value && isDeviceType(value)) {
              form.setValue("type", value, { shouldValidate: true })
            }
          }}
        >
          <SelectTrigger>
            <SelectValue>
              <DeviceTypeDisplay type={type} />
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {deviceTypes.map((type) => (
              <SelectItem key={type} value={type}>
                <DeviceTypeDisplay type={type} />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>

      <label className="grid gap-2 text-sm font-medium">
        Status
        <Select
          value={status}
          onValueChange={(value) => {
            if (value && isDeviceStatus(value)) {
              form.setValue("status", value, { shouldValidate: true })
            }
          }}
        >
          <SelectTrigger>
            <SelectValue>{status}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {deviceStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>

      <section className="grid gap-3 rounded-md border p-3">
        <h3 className="text-sm font-medium">Attributes</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-2 text-xs font-medium">
            IP address
            <Input
              {...register("attributes.ip_address")}
              placeholder="192.168.1.10"
            />
          </label>
          <label className="grid gap-2 text-xs font-medium">
            Manufacturer
            <Input
              {...register("attributes.manufacturer")}
              placeholder="Generic"
            />
          </label>
          <label className="grid gap-2 text-xs font-medium">
            Model
            <Input {...register("attributes.model")} placeholder="GW-100" />
          </label>
          <label className="grid gap-2 text-xs font-medium">
            Firmware version
            <Input
              {...register("attributes.firmware_version")}
              placeholder="1.0.0"
            />
          </label>
        </div>
        <label className="grid gap-2 text-xs font-medium">
          Description
          <Textarea
            {...register("attributes.description")}
            placeholder="Device description"
          />
        </label>
      </section>

      <section className="grid gap-3 rounded-md border p-3">
        <h3 className="text-sm font-medium">Telemetry</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="grid gap-2 text-xs font-medium">
            Battery (%)
            <Input
              type="number"
              min="0"
              max="100"
              step="1"
              {...register("telemetry.battery_level", { valueAsNumber: true })}
            />
            {formState.errors.telemetry?.battery_level?.message && (
              <span className="text-xs text-destructive">
                {formState.errors.telemetry.battery_level.message}
              </span>
            )}
          </label>
          <label className="grid gap-2 text-xs font-medium">
            Signal (dBm)
            <Input
              type="number"
              {...register("telemetry.signal_strength", {
                valueAsNumber: true,
              })}
            />
            {formState.errors.telemetry?.signal_strength?.message && (
              <span className="text-xs text-destructive">
                {formState.errors.telemetry.signal_strength.message}
              </span>
            )}
          </label>
          <label className="grid gap-2 text-xs font-medium">
            Temperature (°C)
            <Input
              type="number"
              step="0.1"
              {...register("telemetry.temperature", { valueAsNumber: true })}
            />
            {formState.errors.telemetry?.temperature?.message && (
              <span className="text-xs text-destructive">
                {formState.errors.telemetry.temperature.message}
              </span>
            )}
          </label>
        </div>
        <label className="grid gap-2 text-xs font-medium">
          Last seen (ISO 8601)
          <Input
            {...register("telemetry.last_seen")}
            placeholder="2026-10-22T08:30:00Z"
          />
          {formState.errors.telemetry?.last_seen?.message && (
            <span className="text-xs text-destructive">
              {formState.errors.telemetry.last_seen.message}
            </span>
          )}
        </label>
      </section>

      <label className="grid gap-2 text-xs font-medium">
        Tags
        <Input
          value={tags.join(", ")}
          onChange={(event) =>
            form.setValue(
              "tags",
              event.target.value
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
              { shouldDirty: true, shouldValidate: true }
            )
          }
          placeholder="bandung, gateway"
        />
        <span className="font-normal text-muted-foreground">
          Separate tags with commas.
        </span>
      </label>

      <div className="grid gap-2">
        <span className="text-sm font-medium">Location</span>
        <Button
          type="button"
          variant="outline"
          className="justify-start"
          onClick={onChooseLocation}
        >
          <MapPin />
          {Number.isFinite(coordinate.lat) && Number.isFinite(coordinate.lng)
            ? "Choose a different location"
            : "Choose location on map"}
        </Button>
        {Number.isFinite(coordinate.lat) && Number.isFinite(coordinate.lng) && (
          <span className="text-xs text-muted-foreground">
            {coordinate.lat.toFixed(5)}, {coordinate.lng.toFixed(5)}
          </span>
        )}
        {coordinateError && (
          <span className="text-xs text-destructive">
            Choose a valid location on the map.
          </span>
        )}
      </div>
    </div>
  )
}
