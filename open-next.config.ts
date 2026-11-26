import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// claireyouk.com on Cloudflare Workers (knowledge#19515). No ISR, so no cache bindings.
export default defineCloudflareConfig();
