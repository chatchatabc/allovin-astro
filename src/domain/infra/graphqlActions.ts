import type { AxiosError } from "axios";
import axios from "axios";

function graphqlConfig() {
  const config = {
    headers: {
      "X-Shopify-Access-Token": process.env.TOKEN,
      "Content-Type": "application/json",
    },
  };

  return config;
}

export async function graphqlQuery(data: {
  query: string;
  variables: Record<string, any>;
}) {
  try {
    const config = graphqlConfig();

    const response = await axios.post(process.env.URL ?? "", data, config);

    if (response.data.errors) {
      console.log(response.data);
      return response.data;
    }

    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error);
    return {
      errors: [],
    };
  }
}
