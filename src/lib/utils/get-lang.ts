export function getMainLangUser(): string {
  return navigator.languages ? navigator.languages[0] : "en-US";
}
