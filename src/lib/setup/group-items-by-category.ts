import { CATEGORY_ORDER } from "./categories";

type SetupItem = {
  id: string;
  setupId: string;
  name: string;
  type: string;
  category: string;
  url: string | null;
  createdAt: Date | null;
};

export const groupSetupItemsByCategory = (items: SetupItem[]) => {
  if (!items) return {};

  const grouped: any = {};

  CATEGORY_ORDER.forEach((category) => {
    grouped[category] = [];
  });

  items.forEach((item) => {
    if (CATEGORY_ORDER.includes(item.category as any)) {
      grouped[item.category].push(item);
    }
  });

  return grouped;
};
