import {
  collectionGetDoc,
  collectionGetProductsDoc,
} from "../docs/collectionDoc";
import { graphqlQuery } from "../infra/graphqlActions";

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

  return data.data.collection.products.nodes;
}
