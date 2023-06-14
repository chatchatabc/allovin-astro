<script lang="ts">
  import typesJson from "@data/types.json";
  import colorsShortJson from "@data/colorsShort.json";
  import type { ProductGetDetails } from "src/domain/models/productModel";
  import { onMount } from "svelte";

  export let name: string;
  export let products: ProductGetDetails[];

  $: categoryColors = [] as string[];
  $: selectedColors = [] as string[];

  $: categoryTypes = [] as string[];
  $: selectedTypes = [] as string[];

  let productsPerPage = 10;
  let currentPage = 1;
  let sortBy = "date-desc";

  let filteredProducts: ProductGetDetails[] = [];
  let cardContainer: HTMLElement;
  let cardDeck: HTMLElement;

  function filterProducts() {
    let newProducts = products;

    if (selectedColors.length > 0) {
      newProducts = newProducts.filter((product) => {
        return selectedColors.every((color) => {
          return product.variants.nodes.some((variant) => {
            return variant.title.toLowerCase().includes(color) ? true : false;
          });
        });
      });
    }

    if (selectedTypes.length > 0) {
      newProducts = newProducts.filter((product) => {
        return selectedTypes.every((type) => {
          return product.tags.includes(type) ? true : false;
        });
      });
    }

    filteredProducts = [];
    newProducts.forEach((product) => {
      filteredProducts.push(product);
    });
  }

  function sortProducts() {
    if (sortBy.includes("date")) {
      filteredProducts.sort((a, b) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });

      if (sortBy.includes("desc")) {
        filteredProducts.reverse();
      }
    }
  }

  function generateColorCategory() {
    const newColors = colorsShortJson.contents.filter((color) => {
      return filteredProducts.some((product) => {
        return product.variants.nodes.some((variant) => {
          return variant.title.toLowerCase().includes(color) ? true : false;
        });
      });
    });

    categoryColors = newColors;
  }

  function generateTypeCategory() {
    const newTypes = typesJson.contents.filter((type) => {
      return filteredProducts.some((product) => {
        return product.tags.includes(type) ? true : false;
      });
    });

    categoryTypes = newTypes;
  }

  function generateCards() {
    cardContainer.querySelectorAll<HTMLElement>("[data-id]").forEach((card) => {
      cardDeck.appendChild(card);
    });

    filteredProducts.forEach((product) => {
      const card = document.querySelector<HTMLElement>(
        `[data-id="${product.id}"]`
      )!;
      cardContainer.appendChild(card);
    });
  }

  onMount(() => {
    cardContainer = document.querySelector<HTMLElement>(
      "[data-card-container]"
    )!;
    cardDeck = document.querySelector<HTMLElement>("[data-card-deck]")!;

    filterProducts();
    sortProducts();
    generateTypeCategory();
    generateColorCategory();
    generateCards();
  });
</script>

<div>
  <!-- Header -->
  <section class="pt-8 pb-2 border-t">
    <header class="container mx-auto px-8">
      <h1 class="text-2xl text-center text-gray-500 font-bold">
        {name}
      </h1>
    </header>

    <!-- Filters -->
    <section
      class="flex text-sm text-gray-500 container mx-auto space-x-4 px-8 items-center justify-end"
    >
      <!-- <div class="flex items-center space-x-1">
        <p>Items per page</p>
        <select
          class="py-2 px-4 w-48 border rounded-full"
          value={productsPerPage}
          on:change={(e) => {
            productsPerPage = Number(e?.currentTarget.value);
          }}
        >
          <option>10</option>
          <option>20</option>
          <option>30</option>
        </select>
      </div> -->
      <div class="flex items-center space-x-1">
        <p>Sort by</p>
        <select
          class="py-2 px-4 w-56 border rounded-full"
          value={sortBy}
          on:change={(e) => {
            sortBy = e?.currentTarget.value;

            sortProducts();
            generateCards();
          }}
        >
          <option value="date-desc">Date, Newest to Oldest</option>
          <option value="date-asc">Date, Oldest to Newest</option>
        </select>
      </div>
    </section>
  </section>

  <!-- Body -->
  <section class="container mx-auto border-t flex px-2 xl:px-0">
    <!-- Filters -->
    <aside class="hidden py-4 space-y-4 text-gray-500 lg:block lg:w-56">
      {#if categoryTypes.length > 0}
        <section>
          <button class="border-b w-full py-2 flex space-x-2 items-center">
            <div class="w-6 h-6">
              <svg
                class="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                ><path
                  fill="currentColor"
                  d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6l1.41 1.41Z"
                /></svg
              >
            </div>
            <p class="font-medium text-lg">Category</p>
          </button>
          <ul class="py-2 space-y-2">
            {#each categoryTypes as categoryType (`category-color-${categoryType}`)}
              <li>
                <label class="text-sm flex items-center capitalize space-x-2">
                  <input
                    on:change={() => {
                      if (selectedTypes.includes(categoryType)) {
                        selectedTypes = selectedTypes.filter((selectedType) => {
                          return selectedType !== categoryType;
                        });
                      } else {
                        selectedTypes = [...selectedTypes, categoryType];
                      }

                      filterProducts();
                      sortProducts();
                      generateCards();
                      generateColorCategory();
                    }}
                    type="checkbox"
                  />
                  <p class="cursor-pointer">{categoryType}</p>
                </label>
              </li>
            {/each}
          </ul>
        </section>
      {/if}

      <section>
        <button class="border-b w-full py-2 flex space-x-2 items-center">
          <div class="w-6 h-6">
            <svg
              class="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              ><path
                fill="currentColor"
                d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6l1.41 1.41Z"
              /></svg
            >
          </div>
          <p class="font-medium text-lg">Colors</p>
        </button>
        <ul class="py-2 space-y-2">
          {#each categoryColors as categoryColor (`category-color-${categoryColor}`)}
            <li>
              <label class="text-sm flex items-center capitalize space-x-2">
                <input
                  on:change={() => {
                    if (selectedColors.includes(categoryColor)) {
                      selectedColors = selectedColors.filter(
                        (selectedColor) => {
                          return selectedColor !== categoryColor;
                        }
                      );
                    } else {
                      selectedColors = [...selectedColors, categoryColor];
                    }

                    filterProducts();
                    sortProducts();
                    generateCards();
                    generateColorCategory();
                  }}
                  type="checkbox"
                />
                <p class="cursor-pointer">{categoryColor}</p>
              </label>
            </li>
          {/each}
        </ul>
      </section>
    </aside>

    <!-- Products -->
    <section class="flex-1 p-2">
      <!-- <ul class="flex flex-wrap">
        {#each products as product}
          <li class="p-2 w-1/2 md:w-1/3 lg:w-1/4">
            <CardSelectionSvelte
              images={product.images.nodes}
              name={product.title}
              variants={product.variants.nodes}
              href={`/products/${product.handle}`}
            />
          </li>
        {/each}
      </ul> -->
      <slot />
    </section>
  </section>
</div>
