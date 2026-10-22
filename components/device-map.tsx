"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Map,
  MapDrawControl,
  MapDrawMarker,
  MapDrawPolyline,
  MapDrawCircle,
  MapDrawRectangle,
  MapDrawPolygon,
  MapDrawEdit,
  MapDrawDelete,
  MapTileLayer,
} from "@/components/ui/map"
import { useState, Suspense } from "react"

export function DeviceMap() {
  const [numberOfShapes, setNumberOfShapes] = useState(0)

  return (
    <Card className="mb-8 lg:ml-4">
      <CardHeader>
        <CardTitle>Device Map</CardTitle>
        <CardDescription>
          View and draw device locations on the map
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] w-full overflow-hidden rounded-lg">
          <Suspense fallback={<div className="flex h-full items-center justify-center">Loading map...</div>}>
            <Map center={[-6.2088, 106.8456]} zoom={13}>
              <MapTileLayer />
              <MapDrawControl
                onLayersChange={(layers) => {
                    setNumberOfShapes(layers.getLayers().length)
                    console.log("Total shapes:", layers.getLayers().length)
                }}>
                <MapDrawMarker />
                <MapDrawPolyline />
                <MapDrawCircle />
                <MapDrawRectangle />
                <MapDrawPolygon />
                <MapDrawEdit />
                <MapDrawDelete />
              </MapDrawControl>
            </Map>
          </Suspense>
        </div>
      </CardContent>
    </Card>
  )
}
