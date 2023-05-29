import currencyRatesJson from "@data/currency-rates.json";
import colorsJson from "@data/colors.json";
import type { CommonVariants } from "../models/commonModel";

export function utilConvertToPhp(amount: number, currency: string) {
  const currencyRates = currencyRatesJson as Record<string, number>;
  const rate = currencyRates[currency];

  if (!rate) {
    return undefined;
  }

  return amount / rate;
}

export function utilOptimizeColorVariants(list: CommonVariants[]) {
  const colors = colorsJson.contents;

  const activeColors: string[] = [];
  const newList: CommonVariants[] = [];

  list.forEach((variant) => {
    const variantColor = colors.find((color) => {
      return variant.title.toLowerCase().includes(color.toLocaleLowerCase());
    });

    if (variantColor && !activeColors.includes(variantColor)) {
      newList.push({
        title: variantColor,
        image: variant.image,
      });
      activeColors.push(variantColor);
    }
  });

  return newList;
}
