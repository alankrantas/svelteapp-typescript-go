<script lang="ts">
  import { scale, fly } from "svelte/transition";

  import { orderLines } from "$lib/store/globalStates.svelte";
  import { Order } from "$lib/type/entities";
  import { storeOrder } from "$lib/api/services";

  const order = $derived(new Order(orderLines.current));

  const submit = async (event: MouseEvent) => {
    event.preventDefault();
    if (order.productCount === 0) return;
    const result = await storeOrder(order);
    orderLines.current = []; // empty cart
    window.location.href = `/summary/${result.id}`; // redirect to /summary/{id}
  };
</script>

<div>
  <h3 class="text-center bg-primary text-white p-2">Order Summary</h3>
  <div class="p-3" in:scale|global={{ start: 0.9, duration: 1000 }}>
    <table class="table table-sm table-striped">
      <thead>
        <tr>
          <th>Quantity</th>
          <th>Product</th>
          <th class="text-end">Price</th>
          <th class="text-end">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {#each order.orderLines as line}
          <tr>
            <td>{line.quantity}</td>
            <td>{line.product.name}</td>
            <td class="text-end">${line.product.price.toFixed(2)}</td>
            <td class="text-end">${line.total.toFixed(2)}</td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <th class="text-end" colSpan="3">Total:</th>
          <th class="text-end">
            <span
              style="display: inline-block"
              in:fly|global={{ y: 25, duration: 2000 }}
            >
              ${order.total.toFixed(2)}
            </span>
          </th>
        </tr>
      </tfoot>
    </table>
  </div>
  <div class="text-center">
    <a href="/products" class="btn btn-secondary m-1"> Back </a>
    <button class="btn btn-primary m-1" onclick={submit}>Submit Order</button>
  </div>
</div>
