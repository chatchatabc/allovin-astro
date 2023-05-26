import currencyRatesJson from "@data/currency-rates.json";

export function utilConvertToPhp(amount: number, currency: string) {
  const currencyRates = currencyRatesJson as Record<string, number>;
  const rate = currencyRates[currency];

  if (!rate) {
    return undefined;
  }

  return amount / rate;
}
