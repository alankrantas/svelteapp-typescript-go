<script lang="ts">
	import ProductItem from '../../components/ProductItem.svelte';
	import CategoryList from '../../components/CategoryList.svelte';
	import Header from '../../components/Header.svelte';

	import { fade, slide } from 'svelte/transition';

	import { type PageData } from './$types';
	import { Order, type OrderLine } from '../../data/entities';
	import { products, orderLines } from '../../store/stores.svelte';

	let { data }: { data: PageData } = $props();
	products.value = data.products; // load product data returned by page.ts

	let selectedCategory = $state('All');

	const categories = $derived(['All', ...new Set(products.value.map((p) => p.category))]);
	let filteredProducts = $derived(
		products.value.filter((p) => selectedCategory === 'All' || selectedCategory === p.category)
	);

	const handleSelectCategory = (category: string) => {
		selectedCategory = category;
	};

	const handleAddToCart = (orderLine: OrderLine) => {
		const order = new Order(orderLines.value);
		order.addProduct(orderLine.product, orderLine.quantity);
		orderLines.value = order.orderLines;
	};
</script>

<div>
	<Header />
	<div class="container-fluid">
		<div class="row">
			<div class="col-3 p-2" in:fade|global={{ duration: 500 }}>
				<CategoryList {categories} {selectedCategory} {handleSelectCategory} />
			</div>
			<div class="col-9 p-2">
				{#each filteredProducts as product}
					<div transition:slide={{ duration: 500 }}>
						<ProductItem {product} {handleAddToCart} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
