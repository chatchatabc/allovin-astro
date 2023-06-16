<script lang="ts">
  import typesJson from "@data/types.json";
  import colorsShortJson from "@data/colorsShort.json";
  import pricesJson from "@data/prices.json";
  import type { ProductGetDetails } from "src/domain/models/productModel";
  import { onMount } from "svelte";
  import CollectionDropdown from "@components/CollectionDropdown.svelte";

  export let name: string;
  export let products: ProductGetDetails[];

  let loading = true;

  let categoryColors: string[] = [];
  let selectedColors: string[] = [];

  let categoryTypes: string[] = [];
  let selectedTypes: string[] = [];

  const priceDict: Record<string, string> = {
    "under 9$": "under ₱500",
    "9-29$": "₱500-1600",
    "29-49$": "₱1600-2700",
    "49-69$": "₱2700-3800",
    "69-99$": "₱3800-5500",
  };

  let categoryPrices: string[] = [];
  let selectedPrices: string[] = [];

  let productsPerPage = 10;
  let currentPage = 1;
  let sortBy = "date-desc";

  let filteredProducts: ProductGetDetails[] = [];
  let cardContainer: HTMLElement;
  let cardDeck: HTMLElement;
  let bodyElement: HTMLElement;

  let showFilters = false;

  $: disabledBodyScroll(showFilters);
  function disabledBodyScroll(disable: boolean) {
    if (disable) {
      bodyElement?.classList.add("overflow-hidden");
    } else {
      bodyElement?.classList.remove("overflow-hidden");
    }
  }

  function filterProducts() {
    let newProducts = products;

    if (selectedColors.length > 0) {
      newProducts = newProducts.filter((product) => {
        return selectedColors.every((color) => {
          return product.variants.nodes.some((variant) => {
            return variant.title.toLowerCase().includes(color);
          });
        });
      });
    }

    if (selectedTypes.length > 0) {
      newProducts = newProducts.filter((product) => {
        return selectedTypes.every((type) => {
          return product.tags.includes(type);
        });
      });
    }

    if (selectedPrices.length > 0) {
      newProducts = newProducts.filter((product) => {
        return selectedPrices.every((price) => {
          return product.tags.includes(price);
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
    } else if (sortBy.includes("price")) {
      filteredProducts.sort((a, b) => {
        const aPrice = a.priceRangeV2.minVariantPrice.amount;
        const bPrice = b.priceRangeV2.minVariantPrice.amount;
        return aPrice - bPrice;
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

  function generatePriceCategory() {
    const newPrices = pricesJson.contents.filter((price) => {
      return filteredProducts.some((product) => {
        return product.tags.includes(price);
      });
    });

    categoryPrices = newPrices;
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

  function handleChange() {
    loading = true;

    filterProducts();
    sortProducts();
    generateTypeCategory();
    generateColorCategory();
    generatePriceCategory();
    generateCards();

    loading = false;
  }

  onMount(() => {
    cardContainer = document.querySelector<HTMLElement>(
      "[data-card-container]"
    )!;
    cardDeck = document.querySelector<HTMLElement>("[data-card-deck]")!;
    bodyElement = document.querySelector<HTMLElement>("body")!;

    handleChange();
  });
</script>

<div>
  <!-- Header -->
  <section class="pb-2 border-t">
    <header class="container mx-auto py-4 md:py-8 lg:pb-0">
      <h1 class="text-2xl text-center text-gray-500 font-bold">
        {name}
      </h1>
    </header>

    <!-- Filters -->
    <section
      class="flex text-sm text-gray-500 bg-gray-100 p-2 container mx-auto space-x-4 px-2 items-center justify-between lg:bg-transparent lg:px-8 lg:justify-end"
    >
      <!-- Filter Button for Mobile -->
      <button
        class="border p-1 rounded-md w-10 h-10 text-p400 border-p400 lg:hidden"
        on:click={() => {
          showFilters = !showFilters;
        }}
      >
        <svg
          class="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          ><path
            fill="currentColor"
            d="M9 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2zM6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2h1.17zM15 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h7.17zM9 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h1.17z"
          /></svg
        >
      </button>

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

      <!-- Sort by -->
      <div class="flex items-center space-x-1">
        <p class="hidden md:block">Sort by</p>
        <select
          class="py-2 px-4 w-48 border rounded-full"
          value={sortBy}
          on:change={(e) => {
            sortBy = e?.currentTarget.value;

            sortProducts();
            generateCards();
          }}
        >
          <option value="date-desc">Date, New to Old</option>
          <option value="date-asc">Date, Old to New</option>
          <option value="price-asc">Price, Low to High</option>
          <option value="price-desc">Price, High to Low</option>
        </select>
      </div>
    </section>
  </section>

  <!-- Body -->
  <section class="container mx-auto border-t flex px-2 lg:px-4">
    <!-- Desktop Filters -->
    <section
      class="hidden h-fit relative py-4 space-y-4 text-gray-500 lg:block lg:w-56"
    >
      {#if loading}
        <!-- Loading -->
        <div
          class="absolute z-[1] flex items-center justify-center h-full w-full bg-black opacity-50"
        >
          <div
            class="border-p500 rounded-full relative h-8 w-8 border-x-2 border-t-2 animate-spin"
          />
        </div>
      {/if}

      {#if categoryTypes.length > 0}
        <CollectionDropdown name="Category">
          <ul class="py-2 space-y-2">
            {#each categoryTypes as categoryType (`category-type-${categoryType}`)}
              <li>
                <label class="text-sm flex items-center capitalize space-x-2">
                  <input
                    on:click={() => {
                      if (selectedTypes.includes(categoryType)) {
                        selectedTypes = selectedTypes.filter((selectedType) => {
                          return selectedType !== categoryType;
                        });
                      } else {
                        selectedTypes = [...selectedTypes, categoryType];
                      }

                      handleChange();
                    }}
                    type="checkbox"
                    checked={selectedTypes.includes(categoryType)}
                  />
                  <p class="cursor-pointer">{categoryType}</p>
                </label>
              </li>
            {/each}
          </ul>
        </CollectionDropdown>
      {/if}

      <CollectionDropdown name="Price">
        <ul class="py-2 space-y-2">
          {#each categoryPrices as categoryPrice (`category-price-${categoryPrice}`)}
            <li>
              <label class="text-sm flex items-center capitalize space-x-2">
                <input
                  on:click={() => {
                    if (selectedPrices.includes(categoryPrice)) {
                      selectedPrices = selectedPrices.filter(
                        (selectedPrice) => {
                          return selectedPrice !== categoryPrice;
                        }
                      );
                    } else {
                      selectedPrices = [...selectedPrices, categoryPrice];
                    }

                    handleChange();
                  }}
                  type="checkbox"
                  checked={selectedPrices.includes(categoryPrice)}
                />
                <p class="cursor-pointer">
                  {priceDict[categoryPrice]}
                </p>
              </label>
            </li>
          {/each}
        </ul>
      </CollectionDropdown>

      <CollectionDropdown name="Color">
        <ul class="py-2 space-y-2">
          {#each categoryColors as categoryColor (`category-color-${categoryColor}`)}
            <li>
              <label class="text-sm flex items-center capitalize space-x-2">
                <input
                  on:click={() => {
                    if (selectedColors.includes(categoryColor)) {
                      selectedColors = selectedColors.filter(
                        (selectedColor) => {
                          return selectedColor !== categoryColor;
                        }
                      );
                    } else {
                      selectedColors = [...selectedColors, categoryColor];
                    }

                    handleChange();
                  }}
                  type="checkbox"
                  checked={selectedColors.includes(categoryColor)}
                />
                <p class="cursor-pointer">{categoryColor}</p>
              </label>
            </li>
          {/each}
        </ul>
      </CollectionDropdown>
    </section>

    <!-- Mobile filter -->
    <section
      class={`fixed z-[1001] top-0 left-0 w-full h-full ${
        showFilters ? "pointer-events-auto" : "pointer-events-none"
      } lg:hidden`}
    >
      <!-- Background -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        on:click={() => {
          showFilters = false;
        }}
        class={`absolute h-full w-full bg-black duration-300 ${
          showFilters ? "opacity-50" : "opacity-0"
        }`}
      />

      <!-- Content -->
      <div
        class={`text-gray-500 absolute bg-white left-0 w-full max-w-xs ${
          showFilters ? "" : "-translate-x-full"
        } px-4 h-full duration-300`}
      >
        <button
          on:click={() => {
            showFilters = false;
          }}
          class="ml-auto text-xl px-4 pt-4 flex items-center justify-center text-p400"
        >
          X
        </button>

        {#if categoryTypes.length > 0}
          <CollectionDropdown name="Category">
            <ul class="py-2 space-y-2">
              {#each categoryTypes as categoryType (`category-type-${categoryType}`)}
                <li>
                  <label class="text-sm flex items-center capitalize space-x-2">
                    <input
                      on:click={() => {
                        if (selectedTypes.includes(categoryType)) {
                          selectedTypes = selectedTypes.filter(
                            (selectedType) => {
                              return selectedType !== categoryType;
                            }
                          );
                        } else {
                          selectedTypes = [...selectedTypes, categoryType];
                        }

                        handleChange();
                      }}
                      type="checkbox"
                      checked={selectedTypes.includes(categoryType)}
                    />
                    <p class="cursor-pointer">{categoryType}</p>
                  </label>
                </li>
              {/each}
            </ul>
          </CollectionDropdown>
        {/if}

        <CollectionDropdown name="Price">
          <ul class="py-2 space-y-2">
            {#each categoryPrices as categoryPrice (`category-price-${categoryPrice}`)}
              <li>
                <label class="text-sm flex items-center capitalize space-x-2">
                  <input
                    on:click={() => {
                      if (selectedPrices.includes(categoryPrice)) {
                        selectedPrices = selectedPrices.filter(
                          (selectedPrice) => {
                            return selectedPrice !== categoryPrice;
                          }
                        );
                      } else {
                        selectedPrices = [...selectedPrices, categoryPrice];
                      }

                      handleChange();
                    }}
                    type="checkbox"
                    checked={selectedPrices.includes(categoryPrice)}
                  />
                  <p class="cursor-pointer">{priceDict[categoryPrice]}</p>
                </label>
              </li>
            {/each}
          </ul>
        </CollectionDropdown>

        <CollectionDropdown name="Color">
          <ul class="py-2 space-y-2">
            {#each categoryColors as categoryColor (`category-color-${categoryColor}`)}
              <li>
                <label class="text-sm flex items-center capitalize space-x-2">
                  <input
                    on:click={() => {
                      if (selectedColors.includes(categoryColor)) {
                        selectedColors = selectedColors.filter(
                          (selectedColor) => {
                            return selectedColor !== categoryColor;
                          }
                        );
                      } else {
                        selectedColors = [...selectedColors, categoryColor];
                      }

                      handleChange();
                    }}
                    type="checkbox"
                    checked={selectedColors.includes(categoryColor)}
                  />
                  <p class="cursor-pointer">{categoryColor}</p>
                </label>
              </li>
            {/each}
          </ul>
        </CollectionDropdown>
      </div>
    </section>

    <!-- Products -->
    <section class="flex-1 p-2 relative">
      <slot />
      {#if loading}
        <div class="flex relative flex-wrap">
          <figure class="w-1/2 px-2 py-4 md:w-1/3 lg:w-1/4">
            <div class="pb-[100%] bg-gray-100" />
            <figcaption class="mt-2">
              <div class="w-full h-8 bg-gray-100" />
            </figcaption>
          </figure>

          <figure class="w-1/2 px-2 py-4 md:w-1/3 lg:w-1/4">
            <div class="pb-[100%] bg-gray-100" />
            <figcaption class="mt-2">
              <div class="w-full h-8 bg-gray-100" />
            </figcaption>
          </figure>

          <figure class="w-1/2 px-2 py-4 md:w-1/3 lg:w-1/4">
            <div class="pb-[100%] bg-gray-100" />
            <figcaption class="mt-2">
              <div class="w-full h-8 bg-gray-100" />
            </figcaption>
          </figure>

          <figure class="w-1/2 px-2 py-4 md:w-1/3 lg:w-1/4">
            <div class="pb-[100%] bg-gray-100" />
            <figcaption class="mt-2">
              <div class="w-full h-8 bg-gray-100" />
            </figcaption>
          </figure>

          <figure class="w-1/2 px-2 py-4 md:w-1/3 lg:w-1/4">
            <div class="pb-[100%] bg-gray-100" />
            <figcaption class="mt-2">
              <div class="w-full h-8 bg-gray-100" />
            </figcaption>
          </figure>

          <figure class="w-1/2 px-2 py-4 md:w-1/3 lg:w-1/4">
            <div class="pb-[100%] bg-gray-100" />
            <figcaption class="mt-2">
              <div class="w-full h-8 bg-gray-100" />
            </figcaption>
          </figure>

          <figure class="w-1/2 px-2 py-4 md:w-1/3 lg:w-1/4">
            <div class="pb-[100%] bg-gray-100" />
            <figcaption class="mt-2">
              <div class="w-full h-8 bg-gray-100" />
            </figcaption>
          </figure>

          <figure class="w-1/2 px-2 py-4 md:w-1/3 lg:w-1/4">
            <div class="pb-[100%] bg-gray-100" />
            <figcaption class="mt-2">
              <div class="w-full h-8 bg-gray-100" />
            </figcaption>
          </figure>

          <div
            class="w-full h-full absolute bg-black opacity-50 flex items-center justify-center"
          >
            <div
              class="border-p500 rounded-full relative h-8 w-8 border-x-2 border-t-2 animate-spin"
            />
          </div>
        </div>
      {/if}
    </section>
  </section>
</div>
