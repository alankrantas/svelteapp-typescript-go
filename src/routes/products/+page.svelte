<script lang="ts">
	import ProductItem from '../../components/ProductItem.svelte';
	import CategoryList from '../../components/CategoryList.svelte';
	import Header from '../../components/Header.svelte';

	import { fade, slide } from 'svelte/transition';

	import { type PageData } from './$types';
	import { type OrderLine } from '../../data/entities';
	import { products, order } from '../../store/stores.svelte';

	let { data }: { data: PageData } = $props();
	products.value = data.products; // load products data returned by page.ts

	let selectedCategory = $state('All');

	const categories = $derived(['All', ...new Set(products.value.map((p) => p.category))]);
	let filteredProducts = $derived(
		products.value.filter((p) => selectedCategory === 'All' || selectedCategory === p.category)
	);

	const handelSelectCategory = (event: CustomEvent<string>) => {
		selectedCategory = event.detail;
	};

	const handelAddToCart = (event: CustomEvent<OrderLine>) => {
		const orderLine = event.detail;
		const orderValue = order.value;
		orderValue.addProduct(orderLine.product, orderLine.quantity);
		order.value = orderValue;
	};
</script>

<div>
	<Header order={order.value} />
	<div class="container-fluid">
		<div class="row">
			<div class="col-3 p-2" in:fade|global={{ duration: 500 }}>
				<CategoryList {categories} {selectedCategory} on:selectCategory={handelSelectCategory} />
			</div>
			<div class="col-9 p-2">
				{#each filteredProducts as product}
					<div transition:slide={{ duration: 500 }}>
						<ProductItem {product} on:addToCart={handelAddToCart} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
