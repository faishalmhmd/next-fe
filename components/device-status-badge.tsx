import { Badge } from "@/components/ui/badge"

const getStatusClassName = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "border-green-600 bg-green-600 text-white"
    case "warning":
      return "border-orange-500 bg-orange-500 text-white"
    case "offline":
      return "border-slate-900 bg-slate-900 text-white dark:border-black dark:bg-black"
    default:
      return ""
  }
}

export function DeviceStatusBadge({ status }: { status: string }) {
  return <Badge className={getStatusClassName(status)}>{status}</Badge>
}
