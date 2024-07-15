import { TypeEquipment } from "@/types/types";
import { create } from "zustand";

type TypeCreateSetupStore = {
  newEquipments: TypeEquipment[];
  addNewEquipments: (datas: { name: String; type: String }) => void;
};

export const useCreateSetupStore = create<TypeCreateSetupStore>()((set) => ({
  newEquipments: [],
  addNewEquipments: (datas: { name: String; type: String }) => {
    set((state: any) => ({
      newEquipments: [...state.newEquipments, datas],
    }));
  },
}));
