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
  currentPhotoId: string | null;
  setCurrentPhotoId: (currentPhotoId: string | null) => void;
}

export const useSetupStore = create<SetupStore>((set) => ({
  tagging: false,
  setTagging: (tagging) => set({ tagging }),
  toggleTagging: () => set((state) => ({ tagging: !state.tagging })),
  setup: null,
  setSetup: (setup) => set({ setup }),
  isUpVoted: false,
  setUpVoted: (isUpVoted) => set({ isUpVoted }),
  currentPhotoId: null,
  setCurrentPhotoId: (currentPhotoId) => set({ currentPhotoId }),
}));