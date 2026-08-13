import { defineCloudflareConfig } from "@opennextjs/cloudflare";
// Serves prerendered pages straight from the existing Workers Static Assets (ASSETS)
// binding — no R2/KV needed. Revalidation isn't persisted, which is fine here since
// none of our routes rely on it staying fresh beyond redeploys.
// See https://opennext.js.org/cloudflare/caching for more details
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
	incrementalCache: staticAssetsIncrementalCache,
});
