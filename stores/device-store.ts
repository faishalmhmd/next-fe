import { create } from "zustand"

interface DeviceStore {
  selectedDeviceId: string | null
  setSelectedDeviceId: (id: string | null) => void
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  selectedDeviceId: null,
  setSelectedDeviceId: (selectedDeviceId) => set({ selectedDeviceId }),
}))
