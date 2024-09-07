import { create } from "zustand";

type SetupStore = {
  tagging: boolean;
  setTagging: (tagging: boolean) => void;
  toggleTagging: () => void;
}

export const useSetupStore = create<SetupStore>((set) => ({
  tagging: false,
  setTagging: (tagging) => set({ tagging }),
  toggleTagging: () => set((state) => ({ tagging: !state.tagging }))
}));