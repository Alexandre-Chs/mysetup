import { create } from "zustand";

type Coordinates = {
  x: number;
  y: number;
}

type PhotoEquipmentStore = {
  newTagCoordinates: Coordinates | null;
  setNewTagCoordinates: (coordinates: Coordinates | null) => void;
  selectedPhotoId: string | null;
  setSelectedPhotoId: (id: string | null) => void;
}

export const usePhotoEquipmentStore = create<PhotoEquipmentStore>((set) => ({
  newTagCoordinates: null,
  setNewTagCoordinates: (coordinates) => set({ newTagCoordinates: coordinates }),
  selectedPhotoId: null,
  setSelectedPhotoId: (id) => set({ selectedPhotoId: id }),
}));