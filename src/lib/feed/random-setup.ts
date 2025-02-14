export function randomSetup() {
  const numbers = [2, 2, 2, 2, 2, 4, 4, 4];
  const tabletNumbers = [4, 4, 4, 4, 4, 8, 8, 8];
  const mobileNumbers = [6, 6, 6, 6, 6, 12, 12, 12];
  const documentWidth = document.body.clientWidth;
  const isMobile = documentWidth < 768;
  const isTablet = documentWidth >= 768 && documentWidth < 1720;
  if (isMobile) {
    return mobileNumbers[Math.floor(Math.random() * mobileNumbers.length)];
  } else if (isTablet) {
    return tabletNumbers[Math.floor(Math.random() * tabletNumbers.length)];
  }
  return numbers[Math.floor(Math.random() * numbers.length)];
}
