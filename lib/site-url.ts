const fallbackSiteUrl = "https://www.benaaconstruction.org";

export function resolveSiteUrl(rawSiteUrl: string | undefined) {
  const normalized = rawSiteUrl?.trim();

  if (!normalized) {
    return new URL(fallbackSiteUrl);
  }

  try {
    return new URL(normalized);
  } catch {
    try {
      return new URL(`https://${normalized}`);
    } catch {
      return new URL(fallbackSiteUrl);
    }
  }
}

export function getSiteUrl() {
  return resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
}
