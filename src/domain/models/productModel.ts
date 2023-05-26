import type { CommonPriceRangeV2, CommonVariants } from "./commonModel";

export type ProductGetDetails = {
  handle: string;
  title: string;
  priceRangeV2: CommonPriceRangeV2;
  variants: { nodes: CommonVariants[] };
  featuredImage: { url: string };
};
