
/** Converts an object to a URL query parameter string. */
export function objToQueryParams(obj: Record<string, unknown>): string {
  const params = Object.entries(obj)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) =>
      `${encodeURIComponent(key)}=${encodeURIComponent(
        typeof value === 'object' ? JSON.stringify(value) : String(value)
      )}`
    )

  return params.length ? `?${params.join('&')}` : ''
}
