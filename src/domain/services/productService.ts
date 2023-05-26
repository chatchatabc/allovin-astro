import { productGetVariantsDoc } from "../docs/productDoc";
import { graphqlQuery } from "../infra/graphqlActions";

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

  return data.data.product;
}
