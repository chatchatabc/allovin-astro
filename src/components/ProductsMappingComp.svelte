<script lang="ts">
  import productsMappingJson from "@data/products-mapping.json";
  import { onMount } from "svelte";

  let products: {
    lazadaId: string | null;
    shopeeId: string | null;
    shopifyId: string;
  }[] = [...productsMappingJson];

  onMount(() => {
    const inputs = document.querySelectorAll<HTMLInputElement>("input");

    inputs.forEach((input) => {
      input.addEventListener("keyup", (event) => {
        const { value } = event.target as HTMLInputElement;
        const shopifyId = input.dataset.id;

        const productIndex = products.findIndex((product) => {
          return product.shopifyId === shopifyId;
        });

        if (productIndex !== -1) {
          if (input.name === "lazadaId") {
            products[productIndex].lazadaId = value;
          } else if (input.name === "shopeeId") {
            products[productIndex].shopeeId = value;
          }
        }
      });
    });
  });
</script>

<div>
  <slot />
</div>
<div>
  <textarea class="w-full" rows="20">
    {JSON.stringify(products, null, 2)}
  </textarea>
</div>
