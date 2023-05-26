import type { CommonVariants } from "./commonModel";

export type ProductGetDetails = {
  handle: string;
  title: string;
  variants: { nodes: CommonVariants[] };
  featuredImage: { url: string };
};
