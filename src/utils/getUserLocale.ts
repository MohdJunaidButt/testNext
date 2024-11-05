export function getUserLocale() {
  return localStorage.getItem("locale") || "en";
}
