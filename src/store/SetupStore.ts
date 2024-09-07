import { Setup } from "@/db/schemas";
import { create } from "zustand";

type SetupStore = {
  tagging: boolean;
  setTagging: (tagging: boolean) => void;
  toggleTagging: () => void;
  setup: any | null;
  setSetup: (setup: Setup | null) => void;
  isUpVoted: boolean;
  setUpVoted: (isUpVoted: boolean) => void;
}

export const useSetupStore = create<SetupStore>((set) => ({
  tagging: false,
  setTagging: (tagging) => set({ tagging }),
  toggleTagging: () => set((state) => ({ tagging: !state.tagging })),
  setup: null,
  setSetup: (setup) => set({ setup }),
  isUpVoted: false,
  setUpVoted: (isUpVoted) => set({ isUpVoted }),
}));