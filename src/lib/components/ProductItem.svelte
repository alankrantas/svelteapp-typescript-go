<script lang="ts">
  import { type Product, OrderLine } from "$lib/type/entities";

  interface Props {
    product: Product;
    handleAddToCart: (orderLine: OrderLine) => void;
  }

  let { product, handleAddToCart }: Props = $props();
  let quantity = $state("1");
</script>

<div class="card m-1 p-1 bg-light">
  <h4>
    {product.name}
    <span class="badge rounded-pill bg-primary float-end">
      ${product.price.toFixed(2)}
    </span>
  </h4>
  <div class="card-text bg-white p-1">
    {product.description}
    <button
      class="btn btn-success btn-sm float-end"
      onclick={(event: MouseEvent) => {
        event.preventDefault();
        handleAddToCart(new OrderLine(product, Number(quantity)));
      }}
    >
      Add To Cart
    </button>
    <select class="form-control-inline float-end m-1" bind:value={quantity}>
      <option>1</option>
      <option>2</option>
      <option>3</option>
    </select>
  </div>
</div>
