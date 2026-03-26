export type OgImageType = "landing" | "docs";

export interface OgImageSearchParams {
  title?: string;
  description?: string;
  type?: OgImageType;
}
