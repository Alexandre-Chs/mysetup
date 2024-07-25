export type TypeEquipment = {
  name: string;
  type: string;
  url?: string;
};

export type GetEquipment = {
  id: string;
  setupId: string;
  name: string;
  type: string;
  url: string | null;
  createdAt: Date | null;
};

export type User = {
  id: string;
  username: string;
  email: string;
};

export type EquipmentType = {
  id: string;
  setupId: string;
  name: string;
  type: string;
  url: string | null;
  createdAt: Date | null;
};
