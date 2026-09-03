import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import { ConfigTable, ConfigSchemaVersion } from "@/components/ConfigTable";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    // Renders the configuration reference from the schema the backend
    // generates, so the docs cannot describe variables the code does not have.
    ConfigTable,
    ConfigSchemaVersion,
    ...components,
  };
}
