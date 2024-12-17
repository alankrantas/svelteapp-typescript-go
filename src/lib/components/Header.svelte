<script lang="ts">
  import { fade } from "svelte/transition";

  import { orderLines } from "$lib/store/globalStates.svelte";
  import { Order } from "$lib/type/entities";

  const order = $derived(new Order(orderLines.current));

  const displayText = $derived(
    (order.productCount != 0
      ? `${order.productCount} product(s), `
      : "(No Selection)") +
      (order.productCount != 0 ? `$${order.total.toFixed(2)}` : "")
  );
</script>

<div class="p-1 bg-secondary text-white text-end">
  <span style="display: inline-block" in:fade|global={{ duration: 500 }}>
    {displayText}
  </span>
  <!-- redirect to /order -->
  <a href="/order" class="btn btn-sm btn-primary m-1"> Submit Order </a>
</div>
