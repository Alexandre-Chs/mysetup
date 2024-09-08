export function groupByType(elements: any[]) {
  if (!elements || !Array.isArray(elements)) return {};
  return elements.reduce((acc, element) => {
    const { type } = element;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(element);
    return acc;
  }, {});
}
