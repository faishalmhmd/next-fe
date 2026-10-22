import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Devices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">1,284</div>
          <p className="mt-2 text-xs text-muted-foreground">
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
          <p className="mt-2 text-xs text-muted-foreground">
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
          <p className="mt-2 text-xs text-muted-foreground">
            <span className="text-red-600">-8%</span> from last month
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
