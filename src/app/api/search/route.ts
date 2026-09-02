import { createFromSource } from "fumadocs-core/search/server";

import { source } from "@/lib/source";

// The docs layout mounts Fumadocs' search dialog, which queries this route.
// Without it the dialog opens and every query fails, which is what shipped.
export const { GET } = createFromSource(source);
