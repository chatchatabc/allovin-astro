export async function fetchData(query: string, variables: Record<string, any>) {
  try {
    const request = await fetch(process.env.URL ?? "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Shopify-Access-Token": process.env.TOKEN ?? "",
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await request.json();

    if (data.errors) {
      console.error(data.errors);
      return null;
    }

    return data;
  } catch (error) {
    console.log(error);
  }

  return null;
}
