import type {
  CommonImage,
  CommonPriceRangeV2,
  CommonVariants,
} from "./commonModel";

export type ProductGetDetails = {
  handle: string;
  title: string;
  priceRangeV2: CommonPriceRangeV2;
  variants: { nodes: CommonVariants[] };
  featuredImage: CommonImage;
  descriptionHtml: string;
};

export type ProductGetVariants = {
  handle: string;
  title: string;
  priceRangeV2: CommonPriceRangeV2;
  variants: { nodes: CommonVariants[] };
  featuredImage: CommonImage;
  images: { nodes: CommonImage[] };
};

export type ProductGetAll = {
  handle: string;
  id: string;
  title: string;
}[];
