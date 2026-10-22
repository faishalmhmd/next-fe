"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Server, Network, Settings } from "lucide-react"
import { StatsCards } from "@/components/stats-cards"
import { DeviceStatusTable } from "@/components/device-status-table"
import { DeviceMap } from "@/components/device-map"

export default function Page() {
  return (
    <div className="flex min-h-svh bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r bg-card p-4 lg:block">
        <div className="mb-8 flex items-center gap-2">
          <Server className="size-5" />
          <h2 className="text-lg font-semibold">IoT Hub</h2>
        </div>

        <nav className="space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <LayoutDashboard className="size-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Server className="size-4" />
            Devices
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Network className="size-4" />
            Connection
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="size-4" />
            Settings
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 bg-background border-l">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between lg:ml-4">
          <div>
            <h1 className="text-2xl font-semibold">IoT Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Monitor your devices and connections
            </p>
          </div>
          <Button variant="outline">Add Device</Button>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 lg:ml-4">
          <StatsCards />
        </div>

        {/* Map Section */}
        <DeviceMap />

        {/* Device Status Table */}
        <Card className="lg:ml-4">
          <CardHeader>
            <CardTitle>Device Status</CardTitle>
            <CardDescription>
              Real-time status of your connected devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DeviceStatusTable />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
