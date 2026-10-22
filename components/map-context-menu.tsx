"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MapPin, Trash2, Move } from "lucide-react"
import { useState } from "react"

interface MapContextMenuProps {
  onEdit?: () => void
  onMove?: () => void
  onDelete?: () => void
  onAddMarker?: () => void
  children: React.ReactNode
}

export function MapContextMenu({
  onEdit,
  onMove,
  onDelete,
  onAddMarker,
  children,
}: MapContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setPosition({ x: e.clientX, y: e.clientY })
    setIsOpen(true)
  }

  return (
    <div onContextMenu={handleContextMenu}>
      {children}
      {isOpen && (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <div
              style={{
                position: "fixed",
                left: position.x,
                top: position.y,
                width: 0,
                height: 0,
              }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {onAddMarker && (
              <DropdownMenuItem onClick={onAddMarker}>
                <MapPin className="mr-2 h-4 w-4" />
                Add Marker
              </DropdownMenuItem>
            )}
            {onEdit && (
              <>
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onMove}>
                  <Move className="mr-2 h-4 w-4" />
                  Move Position
                </DropdownMenuItem>
              </>
            )}
            {onDelete && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onDelete} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
