<script lang="ts">
  export let name: string = "";

  let open = true;
</script>

<section>
  <button
    on:click={() => {
      open = !open;
    }}
    class="border-b w-full py-2 flex space-x-2 items-center"
  >
    <div class={`w-6 h-6 duration-300 ${open ? "rotate-180" : ""}`}>
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
    <p class="font-medium text-lg">{name}</p>
  </button>

  <div
    class={`grid ${
      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
    } transition-all duration-500`}
  >
    <div class="overflow-hidden">
      <slot />
    </div>
  </div>
</section>
