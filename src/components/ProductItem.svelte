<script lang="ts">
	import { getOrderStore } from '../store/stores.svelte';
	import type { Product } from '../data/entities';

	const order = getOrderStore();

	let { product }: { product: Product } = $props();
	let quantity = $state('1');

	const addToCart = () => {
		if (order.value) {
			order.value.addProduct(product, Number(quantity));
			order.value = order.value;
		}
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
		<button class="btn btn-success btn-sm float-end" onclick={addToCart}> Add To Cart </button>
		<select class="form-control-inline float-end m-1" bind:value={quantity}>
			<option>1</option>
			<option>2</option>
			<option>3</option>
		</select>
	</div>
</div>
