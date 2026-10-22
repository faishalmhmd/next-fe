import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function DeviceStatusTable() {
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
        <TableRow>
          <TableCell className="font-medium">DEV-001</TableCell>
          <TableCell>Temperature Sensor A1</TableCell>
          <TableCell>Sensor</TableCell>
          <TableCell>
            <Badge variant="default">Online</Badge>
          </TableCell>
          <TableCell>Excellent</TableCell>
          <TableCell>2 min ago</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">DEV-002</TableCell>
          <TableCell>Smart Door Lock B2</TableCell>
          <TableCell>Actuator</TableCell>
          <TableCell>
            <Badge variant="default">Online</Badge>
          </TableCell>
          <TableCell>Good</TableCell>
          <TableCell>5 min ago</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">DEV-003</TableCell>
          <TableCell>Lighting Controller C3</TableCell>
          <TableCell>Controller</TableCell>
          <TableCell>
            <Badge variant="destructive">Offline</Badge>
          </TableCell>
          <TableCell>No Signal</TableCell>
          <TableCell>2 hours ago</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">DEV-004</TableCell>
          <TableCell>Humidity Sensor D4</TableCell>
          <TableCell>Sensor</TableCell>
          <TableCell>
            <Badge variant="default">Online</Badge>
          </TableCell>
          <TableCell>Excellent</TableCell>
          <TableCell>1 min ago</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">DEV-005</TableCell>
          <TableCell>Security Camera E5</TableCell>
          <TableCell>Camera</TableCell>
          <TableCell>
            <Badge variant="secondary">Maintenance</Badge>
          </TableCell>
          <TableCell>Fair</TableCell>
          <TableCell>15 min ago</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
