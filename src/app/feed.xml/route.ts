import { GET as getRss } from "../rss.xml/route";

export const dynamic = "force-static";

export async function GET() {
  return getRss();
}
