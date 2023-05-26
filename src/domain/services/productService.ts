import {
  productGetDetailsDoc,
  productGetVariantsDoc,
} from "../docs/productDoc";
import { graphqlQuery } from "../infra/graphqlActions";
import type {
  ProductGetDetails,
  ProductGetVariants,
} from "../models/productModel";

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

export async function productGetDetails(id: string) {
  const variables = { id };
  const query = productGetDetailsDoc();

  const data = await graphqlQuery({
    query,
    variables,
  });

  if (data.errors) {
    return undefined;
  }

  return data.data.product as ProductGetDetails;
}
