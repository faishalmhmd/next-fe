"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DeviceStatusTable } from "@/components/device-status-table"
import { DeviceMap } from "@/components/device-map"
import { useMarkers } from "@/hooks/use-markers"

export default function Page() {
  const deviceState = useMarkers()

  return (
    <div className="flex min-h-svh bg-muted/30">
      <main className="flex-1 bg-background p-6 lg:p-8">
        <div className="mb-8 flex items-center justify-between lg:ml-4">
          <div>
            <h1 className="text-2xl font-semibold">IoT Dashboard</h1>
            <p className="text-sm text-muted-foreground">Monitor your devices and connections</p>
          </div>
        </div>
        <DeviceMap {...deviceState} />
        <Card className="lg:ml-4">
          <CardHeader>
            <CardTitle>Device Status</CardTitle>
            <CardDescription>Real-time status of your connected devices</CardDescription>
          </CardHeader>
          <CardContent>
            <DeviceStatusTable devices={deviceState.markers} isLoading={deviceState.isLoading} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
