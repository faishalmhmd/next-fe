import { Badge } from "@/components/ui/badge"
import type { DeviceRecord } from "@/interface/device-interface"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const statusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "default" as const
    case "warning":
      return "secondary" as const
    case "offline":
      return "destructive" as const
    default:
      return "outline" as const
  }
}

interface DeviceStatusTableProps {
  devices: DeviceRecord[]
  isLoading: boolean
}

export function DeviceStatusTable({ devices, isLoading }: DeviceStatusTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Device ID</TableHead>
          <TableHead>Device Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Connection</TableHead>
          <TableHead>Last Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
              Loading devices...
            </TableCell>
          </TableRow>
        ) : devices.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
              No devices found.
            </TableCell>
          </TableRow>
        ) : (
          devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell className="font-medium">{device.id}</TableCell>
              <TableCell>{device.name}</TableCell>
              <TableCell className="capitalize">{device.type}</TableCell>
              <TableCell>
                <Badge variant={statusVariant(device.status)}>{device.status}</Badge>
              </TableCell>
              <TableCell>{device.telemetry ? `${device.telemetry.signal_strength} dBm` : "Unavailable"}</TableCell>
              <TableCell>{device.telemetry?.last_seen ?? device.updated_at ?? "—"}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
