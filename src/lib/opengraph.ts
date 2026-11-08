import type { ReactElement } from "react";
import { ImageResponse } from "next/og";

/**
 * In next dev, Next 16.3's image optimizer and OG renderer share a Sharp
 * allowlist. Enable the SVG buffer reader needed by the OG renderer there.
 * Keep this import inside the development branch so production builds never
 * include native Sharp through our helper. OpenNext uses its own image
 * optimizer and switches next/og to the Worker-compatible WASM renderer.
 */
export async function createOpenGraphImage(
  element: ReactElement,
  options: ConstructorParameters<typeof ImageResponse>[1],
): Promise<Response> {
  if (process.env.NODE_ENV === "development") {
    const { getSharp } = await import("next/dist/server/image-optimizer");
    getSharp(undefined, undefined).unblock({ operation: ["VipsForeignLoadSvgBuffer"] });
  }
  const image = new ImageResponse(element, options);

  // Complete rendering before sending headers, so failures produce an HTTP
  // error instead of a truncated PNG or an empty streaming response.
  const png = await image.arrayBuffer();
  return new Response(png, { status: image.status, headers: image.headers });
}
