export const CATEGORY_ORDER = ["Main Hardware", "Audio", "Desk Setup", "Lighting", "Accessories", "Decoration"] as const;

export type CategoryItems = {
  [key: string]: string[];
};

export const SETUP_CATEGORIES: CategoryItems = {
  "Main Hardware": ["Desktop PC", "Laptop", "Monitor", "Keyboard", "Mouse", "Other Hardware"],
  Audio: ["Headphones", "Speakers", "Microphone", "Other Audio"],
  "Desk Setup": ["Desk", "Chair", "Monitor Arm", "Mousepad", "Other Desk Item"],
  Lighting: ["Desk Lamp", "LED Strips", "RGB Lights", "Other Lighting"],
  Accessories: ["Webcam", "Stream Deck", "USB Hub", "Other Accessory"],
  Decoration: ["Wallpaper", "Posters/Wall Art", "Plants", "Other Decoration"],
};

export const getItemCategory = (item: string): string => {
  for (const category of CATEGORY_ORDER) {
    if (SETUP_CATEGORIES[category].includes(item)) {
      return category;
    }
  }
  return "";
};
