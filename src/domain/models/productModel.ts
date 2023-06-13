import type {
  CommonImage,
  CommonPriceRangeV2,
  CommonVariants,
} from "./commonModel";
import type { CollectionGetProducts } from "./collectionModel";

export type ProductGetDetails = {
  handle: string;
  title: string;
  priceRangeV2: CommonPriceRangeV2;
  variants: { nodes: CommonVariants[] };
  featuredImage: CommonImage;
  descriptionHtml: string;
  images: { nodes: CommonImage[] };
  createdAt: string;
  tags: string[];
  collections: {
    nodes: CollectionGetProducts[];
  };
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
