import {
  productGetAllDoc,
  productGetDetailsDoc,
  productGetVariantsDoc,
} from "../docs/productDoc";
import { graphqlQuery } from "../infra/graphqlActions";
import type {
  Product,
  ProductGetAll,
  ProductGetVariants,
  ProductShopify,
} from "../models/productModel";
import productsShopify from "../../../data/shopify/products.json";
import products from "../../../data/products.json";

export function productGetDetails(params: { shopifyId: string }) {
  const oldData = products.find(
    (product) => product.shopifyId === params.shopifyId
  );

  if (!oldData) {
    return undefined;
  }

  const newData: Product = {
    ...oldData,
    shopify: productGetShopifyDetails({ shopifyId: params.shopifyId }),
  };

  return newData;
}

export function productGetShopifyDetails(params: { shopifyId: string }) {
  const data = productsShopify.find(
    (product) => product.id === params.shopifyId
  ) as ProductShopify | undefined;

  return data;
}

export async function productGetVariants(id: string, amount?: number) {
  const variables = { id, amount };
  const query = productGetVariantsDoc();

  const data = await graphqlQuery({
    query,
    variables,
  });

  if (data.errors) {
    return undefined;
  }

  return data.data.product as ProductGetVariants;
}

export async function productGetDetailsOnline(id: string) {
  const variables = { id };
  const query = productGetDetailsDoc();

  const data = await graphqlQuery({
    query,
    variables,
  });

  if (data.errors) {
    return undefined;
  }

  return data.data.product as ProductShopify;
}

export async function productGetAll(amount?: number) {
  const variables = { amount };
  const query = productGetAllDoc();

  const data = await graphqlQuery({
    query,
    variables,
  });

  if (data.errors) {
    return undefined;
  }

  return data.data.products.nodes as ProductGetAll;
}
