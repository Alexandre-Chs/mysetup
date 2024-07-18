import { TypeEquipment } from "@/types/types";
import { create } from "zustand";

type TypeCreateSetupStore = {
  newEquipments: TypeEquipment[];
  nameNewSetup: string;
  description: string;
  saveInfos: boolean;
  addNewDescription: (datas: { description: string }) => void;
  addNewNameSetup: (datas: { name: string }) => void;
  addNewEquipments: (datas: {
    name: String;
    type: String;
    url?: string;
  }) => void;
  deleteEquipment: (name: string) => void;
};

export const useCreateSetupStore = create<TypeCreateSetupStore>()((set) => ({
  nameNewSetup: "",
  newEquipments: [],
  description: "",
  saveInfos: false,
  addNewDescription: (datas: { description: string }) => {
    set((state: any) => ({
      description: datas.description,
      saveInfos: true,
    }));
  },
  addNewEquipments: (datas: { name: String; type: String }) => {
    set((state: any) => ({
      newEquipments: [...state.newEquipments, datas],
      saveInfos: true,
    }));
  },
  addNewNameSetup: (datas: { name: string }) => {
    set((state: any) => ({
      nameNewSetup: datas.name,
      saveInfos: true,
    }));
  },
  deleteEquipment: (name: string) => {
    set((state: any) => ({
      newEquipments: state.newEquipments.filter(
        (item: { name: string; type: string }) => item.name !== name
      ),
      saveInfos: true,
    }));
  },
}));
