import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Page() {
  return (
    <div className="flex min-h-svh bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card p-4 hidden lg:block">
        <div className="mb-8">
          <h2 className="font-semibold text-lg">IoT Hub</h2>
        </div>

        <nav className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Devices
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Connection
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Settings
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold">IoT Dashboard</h1>
            <p className="text-sm text-muted-foreground">Monitor your devices and connections</p>
          </div>
          <Button variant="outline">Add Device</Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,284</div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">892</div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-green-600">+24</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Offline Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">392</div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-red-600">-8%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Device Status Table */}
        <Card>
          <CardHeader>
            <CardTitle>Device Status</CardTitle>
            <CardDescription>Real-time status of your connected devices</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
