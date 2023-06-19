import type {
  CommonImage,
  CommonPriceRangeV2,
  CommonVariants,
} from "./commonModel";
import type { CollectionGetProducts } from "./collectionModel";

export type Product = {
  slug: string | null;
  id: string;
  variants: CommonVariants[] | null;
  featuredImage: CommonImage | null;
  images: CommonImage[] | null;
  createdAt: string;
  tags: string[];
  seo: {
    description: string | null;
    title: string | null;
  };
  price: number | null;
  show: boolean;
};

export type ProductShopify = {
  id: string;
  handle: string;
  title: string;
  priceRangeV2: CommonPriceRangeV2;
  variants: { nodes: CommonVariants[] };
  featuredImage: CommonImage;
  description: string;
  descriptionHtml: string;
  images: { nodes: CommonImage[] };
  createdAt: string;
  tags: string[];
  collections: {
    nodes: CollectionGetProducts[];
  };
  seo: {
    description: string;
    title: string;
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
