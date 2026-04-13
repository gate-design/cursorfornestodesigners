/**
 * In development we use no basePath so the app lives at http://localhost:3000/
 * Production static export keeps `basePath: '/cursorfornestodesigners'` for GitHub Pages.
 */
export const BASE_PATH =
  process.env.NODE_ENV === "development" ? "" : "/cursorfornestodesigners"

/** Prefix a public asset path (e.g. `/avatar.png`) for the current environment. */
export function withBasePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${BASE_PATH}${normalized}`
}
