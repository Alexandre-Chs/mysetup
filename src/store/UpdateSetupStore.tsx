import { create } from "zustand";

type TypeUpdateSetupStore = {
  description: string;
  updateDescription: (datas: { description: string }) => void;
};

export const useUpdateSetupStore = create<TypeUpdateSetupStore>()((set) => ({
  description: "",
  updateDescription: (datas: { description: string }) => {
    set((state: any) => ({
      description: datas.description,
      saveInfos: true,
    }));
  },
}));
