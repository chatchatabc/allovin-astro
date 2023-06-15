import {
  collectionGetDoc,
  collectionGetProductsDoc,
} from "../docs/collectionDoc";
import { graphqlQuery } from "../infra/graphqlActions";
import type { CollectionGetProducts } from "../models/collectionModel";
import products from "@data/products.json";

export async function collectionGet(
  variables: Record<string, any>
): Promise<Record<string, any> | null> {
  const query = collectionGetDoc();

  const data = await graphqlQuery({
    query,
    variables: { collections: 1, products: 1, ...variables },
  });

  if (!data || data.collections.nodes.length === 0) {
    return null;
  }

  const simplifiedData = data.collections.nodes;

  return simplifiedData[0];
}

export async function collectionGetProducts(id: string, amount?: number) {
  const query = collectionGetProductsDoc();

  const data = await graphqlQuery({
    query,
    variables: { id, amount },
  });

  if (data.errors) {
    return undefined;
  }

  return data.data.collection.products.nodes as CollectionGetProducts;
}

export function collectionGetProductsOffline(id: string, amount?: number) {
  const data = products.filter((product) => {
    const collection = product.collections.nodes.find(
      (collection) => collection.id === id
    );

    if (collection) {
      return true;
    }

    return false;
  });

  if (amount) {
    return data.slice(0, amount);
  }

  return data;
}
