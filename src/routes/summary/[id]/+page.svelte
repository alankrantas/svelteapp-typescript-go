<script lang="ts">
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";
  import { elasticOut } from "svelte/easing";

  let ready = $state(false);

  $effect(() => {
    ready = true;
  });
</script>

{#if ready}
  <div
    class="m-2 text-center"
    in:fly|global={{ y: 100, duration: 4000, easing: elasticOut }}
  >
    <h2>Thanks!</h2>
    <p>Thanks for placing your order.</p>
    <p>Your order is #{$page.params.id}</p>
    <p>We'll ship your goods as soon as possible.</p>
    <a href="/products" class="btn btn-primary">OK</a>
  </div>
{/if}
