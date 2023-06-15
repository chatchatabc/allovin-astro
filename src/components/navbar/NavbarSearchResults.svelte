<script lang="ts">
  import { onMount } from "svelte";
  import Fuse from "fuse.js";
  import productsJson from "@data/products.json";

  let navbarCardDeck: HTMLElement;
  let navbarCardContainer: HTMLElement;

  const options = {
    includeScore: true,
    keys: ["title"],
  };
  const fuse = new Fuse(productsJson, options);

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
      const id = product.item.id;
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

    console.log(navbarCardDeck);
    console.log(navbarCardContainer);

    searchInputs.forEach((searchInput) => {
      searchInput?.addEventListener("keyup", (e) => {
        const value = (e.target as HTMLInputElement).value;

        filterProducts(value);
      });
    });

    generateCards();
    console.log("onmount");
  });
</script>

<ul data-navbar-card-container class="flex flex-nowrap overflow-auto">
  {#if products.length === 0}
    <li class="p-2">No results found</li>
  {/if}
</ul>
