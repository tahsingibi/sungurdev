import type { ReactElement } from "react";
import { ImageResponse } from "next/og";
import { getSharp } from "next/dist/server/image-optimizer";

/**
 * Next 16.3 initializes a process-wide Sharp loader allowlist for next/image.
 * Its bundled next/og renderer also uses Sharp, but needs SVG buffer input.
 * Initialize that allowlist first, then enable only the SVG buffer reader.
 * next/image still rejects SVG requests with dangerouslyAllowSVG disabled.
 * Remove this compatibility step when Next's renderers no longer conflict.
 */
export async function createOpenGraphImage(
  element: ReactElement,
  options: ConstructorParameters<typeof ImageResponse>[1],
): Promise<Response> {
  getSharp(undefined, undefined).unblock({ operation: ["VipsForeignLoadSvgBuffer"] });
  const image = new ImageResponse(element, options);

  // Complete rendering before sending headers, so failures produce an HTTP
  // error instead of a truncated PNG or an empty streaming response.
  const png = await image.arrayBuffer();
  return new Response(png, { status: image.status, headers: image.headers });
}
