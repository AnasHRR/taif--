/**
 * Platform health-check endpoint.
 * Kept intentionally minimal — static and dependency-free so it also works
 * when the site is exported to a purely static bundle (`output: "export"`).
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json({ ok: true, service: "taif-bookstore", mode: "static" });
}
