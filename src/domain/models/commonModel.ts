export type CommonVariants = {
  title: string;
  image: CommonImage | null;
};

export type CommonImage = {
  url: string;
};

export type CommonPrice = {
  amount: string;
  currencyCode: string;
};

export type CommonPriceRangeV2 = {
  minVariantPrice: CommonPrice;
  maxVariantPrice: CommonPrice;
};
