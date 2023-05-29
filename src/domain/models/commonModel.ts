export type CommonVariants = {
  title: string;
  image: CommonImage | null;
};

export type CommonImage = {
  url: string;
};

export type CommonPrice = {
  amount: number;
  currencyCode: string;
};

export type CommonPriceRangeV2 = {
  minVariantPrice: CommonPrice;
  maxVariantPrice: CommonPrice;
};
