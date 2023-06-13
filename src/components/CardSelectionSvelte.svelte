<script lang="ts">
  import type {
    CommonImage,
    CommonVariants,
  } from "../domain/models/commonModel";
  import { utilOptimizeColorVariants } from "../domain/services/utilService";

  export let name: string;
  export let images: CommonImage[];
  export let href: string;
  export let variants: CommonVariants[];

  let activeIndex = 0;

  const secondaryImage = images[images.length - 1]?.url;
  variants = utilOptimizeColorVariants(variants);
</script>

<figure>
  <a {href} class="relative block group pb-[125%]">
    <!-- Secondary Image -->
    <div
      class="top-0 absolute left-0 h-full w-full duration-500 z-1 opacity-0 group-hover:opacity-100"
    >
      <img src={secondaryImage ?? "/images/placeholder.png"} alt={name} />
    </div>

    <!-- Different Variant Image -->
    {#each variants as variant, index}
      {#if variant.image}
        <div
          class={`absolute h-full left-0 top-0 w-full duration-500 ${
            activeIndex === index ? "" : "hidden opacity-0"
          } group-hover:opacity-0`}
        >
          <img
            src={variant.image?.url ?? "/images/placeholder.png"}
            alt={name}
          />
        </div>
      {/if}
    {/each}
  </a>

  <figcaption class="mt-8">
    <p class="text-sm font-gray-500 font-light line-clamp-1 text-center">
      {name}
    </p>

    <ul class="flex justify-center mt-2">
      {#each [...variants].splice(0, 4) as variant, index}
        <li class="relative z-[10]">
          <button
            on:click={() => {
              activeIndex = index;
            }}
            class={`relative block border-c2 z-[1] overflow-hidden ${
              activeIndex === index ? "border" : ""
            } rounded-full w-9 h-9 p-1 peer`}
          >
            <img
              src={variant.image?.url ?? "/images/placeholder.png"}
              alt={name}
            />
          </button>
          <div
            class="absolute bottom-0 translate-y-full left-1/2 -translate-x-1/2 text-white transition opacity-0 peer-hover:opacity-100"
          >
            <div class="mx-auto -rotate-45 h-4 w-4 bg-c2" />
            <p class="w-min capitalize text-xs p-2 bg-c2 -mt-4 relative">
              {variant.title}
            </p>
          </div>
        </li>
      {/each}
      {#if variants.length > 4}
        <li>
          <a {href} class="block overflow-hidden rounded-full w-8 h-8 p-1">
            <span class="text-c2">+{variants.length - 4}</span>
          </a>
        </li>
      {/if}
    </ul>
  </figcaption>
</figure>
