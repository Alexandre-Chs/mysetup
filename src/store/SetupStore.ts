import { EquipmentsTable } from "@/db/schemas";
import { create } from "zustand";

type SetupStore = {
  equipments: EquipmentsTable[];
  setEquipments: (equipments: EquipmentsTable[]) => void;
}

export const useSetupStore = create<SetupStore>((set) => ({
  equipments: [],
  setEquipments: (equipments) => set({ equipments }),
}));