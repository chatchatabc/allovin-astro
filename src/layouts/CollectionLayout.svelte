<script lang="ts">
  import colorsJson from "@data/colors.json";

  export let name: string;
  export let products: any[] | undefined;

  const colors = colorsJson.contents;

  let productsPerPage = 10;
  let currentPage = 1;
  let sortBy = "price-ascending";

  console.log(products);
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
      <div class="flex items-center space-x-1">
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
      </div>
      <div class="flex items-center space-x-1">
        <p>Sort by</p>
        <select
          class="py-2 px-4 w-48 border rounded-full"
          value={sortBy}
          on:change={(e) => {
            sortBy = e?.currentTarget.value;
          }}
        >
          <option value="price-descending">Price, high to low</option>
          <option value="price-ascending">Price, low to high</option>
        </select>
      </div>
    </section>
  </section>

  <!-- Body -->
  <section class="container mx-auto border-t flex px-2 xl:px-0">
    <!-- Filters -->
    <aside class="py-4 space-y-4 text-gray-500 lg:w-56">
      <section>
        <button class="border-b w-full py-2 flex space-x-2 items-center">
          <div class="w-6 h-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
          {#each colors as color}
            <li>
              <label class="text-sm flex items-center space-x-2">
                <input type="checkbox" />
                <p class="cursor-pointer">{color}</p>
              </label>
            </li>
          {/each}
        </ul>
      </section>
    </aside>

    <!-- Products -->
    <section class="flex-1 p-2">
      <slot />
    </section>
  </section>
</div>
