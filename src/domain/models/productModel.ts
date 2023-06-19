import type {
  CommonImage,
  CommonPriceRangeV2,
  CommonVariants,
} from "./commonModel";

export type Product = {
  slug: string | null;
  shopifyId: string;
  title: string;
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
  shopify?: ProductShopify | null;
};

export type ProductShopify = {
  id: string;
  handle: string;
  title: string;
  variants: { nodes: CommonVariants[] };
  featuredImage: CommonImage;
  description: string;
  descriptionHtml: string;
  images: { nodes: CommonImage[] };
  createdAt: string;
  tags: string[];
  seo: {
    description: string | null;
    title: string | null;
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
