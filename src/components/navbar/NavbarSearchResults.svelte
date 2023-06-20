<script lang="ts">
  import { onMount } from "svelte";
  import Fuse from "fuse.js";
  import productsJson from "@data/products.json";

  let searchInputValue = "";
  let navbarCardDeck: HTMLElement;
  let navbarCardContainer: HTMLElement;

  const options = {
    includeScore: true,
    keys: ["title"],
  };
  const fuse = new Fuse(
    productsJson.filter((product) => product.show),
    options
  );

  let products = fuse.search("");
  function filterProducts(keyword: string) {
    products = fuse.search(keyword);

    generateCards();
  }

  function generateCards() {
    const oldCards = navbarCardContainer.querySelectorAll("[data-navbar-card]");
    oldCards.forEach((card) => {
      navbarCardDeck?.appendChild(card);
    });

    [...products].splice(0, 3).forEach((product) => {
      const id = product.item.shopifyId;
      const card = navbarCardDeck.querySelector(
        `[data-navbar-card="${id}"]`
      ) as HTMLElement;

      navbarCardContainer.appendChild(card);
    });
  }

  onMount(() => {
    const searchInputs = document.querySelectorAll("[data-search-input]");
    navbarCardContainer = document.querySelector(
      "[data-navbar-card-container]"
    )!;
    navbarCardDeck = document.querySelector("[data-navbar-card-deck]")!;

    searchInputs.forEach((searchInput) => {
      searchInput?.addEventListener("keyup", (e) => {
        const value = (e.target as HTMLInputElement).value;
        searchInputValue = value;

        filterProducts(value);
      });
    });

    generateCards();
  });
</script>

<section class="p-4">
  <header>
    <h2>SEARCH RESULTS</h2>
  </header>

  <ul
    data-navbar-card-container
    class="flex py-2 mb-4 border-y flex-nowrap overflow-auto"
  >
    {#if products.length === 0}
      <li class="p-2">No results found</li>
    {/if}
  </ul>

  <footer>
    <a
      href={`/shop-all?keyword=${searchInputValue}`}
      class="text-center block mx-auto w-fit hover:text-blue-500"
    >
      See all results ({products.length})
    </a>
  </footer>
</section>
