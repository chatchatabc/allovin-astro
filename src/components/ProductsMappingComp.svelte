<script lang="ts">
  import productsMappingJson from "@data/products-mapping.json";
  import { onMount } from "svelte";

  let products: {
    lazadaId: string | null;
    shopeeId: string | null;
    shopifyId: string;
  }[] = [...productsMappingJson];

  onMount(() => {
    const productsLocalStorage = localStorage.getItem("products");

    if (productsLocalStorage) {
      products = JSON.parse(productsLocalStorage);
    }

    const inputs = document.querySelectorAll<HTMLInputElement>("input");
    inputs.forEach((input) => {
      const shopifyId = input.dataset.id;
      const productIndex = products.findIndex((product) => {
        return product.shopifyId === shopifyId;
      });

      if (productIndex !== -1) {
        if (input.name === "lazadaId") {
          input.value = products[productIndex].lazadaId || "";
        } else if (input.name === "shopeeId") {
          input.value = products[productIndex].shopeeId || "";
        }
      }

      input.addEventListener("keyup", (event) => {
        const { value } = event.target as HTMLInputElement;

        if (productIndex !== -1) {
          if (input.name === "lazadaId") {
            products[productIndex].lazadaId = value;
          } else if (input.name === "shopeeId") {
            products[productIndex].shopeeId = value;
          }

          localStorage.setItem("products", JSON.stringify(products));
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
