import { collectionGetDoc } from "../docs/collectionDoc";
import { graphqlQuery } from "../infra/graphqlActions";

export async function collectionGet(
  handle: string
): Promise<Record<string, any> | null> {
  const variables = { handle, collections: 1, products: 10 };
  const query = collectionGetDoc();

  const data = await graphqlQuery({ query, variables });

  if (data.collections.nodes.length === 0 || !data) {
    return null;
  }

  const simplifiedData = data.collections.nodes;

  return simplifiedData[0];
}
