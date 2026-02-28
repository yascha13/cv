const rateMap = new Map<string, number>();

export async function compliantFetch(url: string, opts?: RequestInit) {
  const host = new URL(url).host;
  const now = Date.now();
  const last = rateMap.get(host) ?? 0;
  const intervalMs = 500;

  if (now - last < intervalMs) {
    await new Promise((resolve) => setTimeout(resolve, intervalMs - (now - last)));
  }

  rateMap.set(host, Date.now());

  // robots.txt compliance hook for future real crawling. APIs are preferred.
  if (url.includes('/private/')) {
    throw new Error('Blocked by robots policy simulation.');
  }

  return fetch(url, opts);
}
