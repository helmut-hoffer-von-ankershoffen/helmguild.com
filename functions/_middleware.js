// Cloudflare Pages middleware — collapse consecutive `/` in any request
// path and 308-redirect to the canonical URL.
//
// Why: Google sometimes links to URLs with trailing `//` (a referrer
// artefact). Without normalization Google treats `/blog/foo/` and
// `/blog/foo//` as two distinct URLs — link equity splits + duplicate
// content. Permanent (308) redirect consolidates to canonical.
//
// Runs on every request (Cloudflare Pages picks up
// `functions/_middleware.js` automatically). Cheap: only inspects the
// path, falls through to the static asset on no-change.

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const original = url.pathname;
  // Collapse 2+ consecutive `/` into a single `/`. Trailing `/` stays
  // as-is so `/blog/foo/` keeps its trailing slash; only `//+` mutations
  // are normalised.
  const collapsed = original.replace(/\/{2,}/g, "/");
  if (collapsed !== original) {
    url.pathname = collapsed;
    return Response.redirect(url.toString(), 308);
  }
  return context.next();
}
