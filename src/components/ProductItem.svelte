<script lang="ts">
	import type { Product } from '../data/entities';
	import { createOrderStore } from '../store/stores.svelte';

	const order = createOrderStore();

	let { product }: { product: Product } = $props();
	let quantity = $state('1');

	const handleAddToCart = () => {
		order.addProduct(product, Number(quantity));
	};
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
		<button class="btn btn-success btn-sm float-end" onclick={handleAddToCart}>
			Add To Cart
		</button>
		<select class="form-control-inline float-end m-1" bind:value={quantity}>
			<option>1</option>
			<option>2</option>
			<option>3</option>
		</select>
	</div>
</div>
