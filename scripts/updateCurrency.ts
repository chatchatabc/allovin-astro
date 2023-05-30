const fs = require("fs");

export default async function updateCurrency() {
  const request = await fetch("https://api.exchangerate-api.com/v4/latest/PHP");

  const data = await request.json();

  fs.writeFileSync(
    "./data/currency-rates.json",
    JSON.stringify(data.rates, null, 2),
    "utf-8"
  );

  console.log("Currency rates updated!");
}

updateCurrency();
