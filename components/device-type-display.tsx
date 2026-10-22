import {
  Camera,
  Cpu,
  Network,
  Radio,
  Zap,
} from "lucide-react"
import type { DeviceType } from "@/lib/device-schema"

export function DeviceTypeIcon({
  type,
  className = "size-6 text-primary",
}: {
  type: DeviceType
  className?: string
}) {
  switch (type) {
    case "gateway":
      return <Network className={className} />
    case "sensor":
      return <Radio className={className} />
    case "actuator":
      return <Zap className={className} />
    case "controller":
      return <Cpu className={className} />
    case "camera":
      return <Camera className={className} />
  }
}

export function DeviceTypeDisplay({ type }: { type: DeviceType }) {
  return (
    <span className="flex items-center gap-2">
      <DeviceTypeIcon type={type} className="size-4 text-primary" />
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  )
}
