<script lang="ts">
	import { fade, slide } from 'svelte/transition';

	import type { OrderLine } from '../../data/entities';
	import { products, selectedCategory, order } from '../../store/stores';

	import ProductItem from '../../components/ProductItem.svelte';
	import CategoryList from '../../components/CategoryList.svelte';
	import Header from '../../components/Header.svelte';

	$: categories = ['All', ...new Set($products.map((p) => p.category))];
	$: filteredProducts = $products.filter(
		(p) => $selectedCategory === 'All' || $selectedCategory === p.category
	);

	const handleSelectCategory = (event: { detail: string }) => {
		$selectedCategory = event.detail;
		categories = categories; // force trigger rerender in CategoryList
	};

	const handelAddToCart = (event: { detail: OrderLine }) => {
		const product = event.detail.product;
		const quantity = event.detail.quantity;
		$order.addProduct(product, quantity);
		$order = $order; // force trigger rerender in Header
	};
</script>

<div>
	<Header />
	<div class="container-fluid">
		<div class="row">
			<div class="col-3 p-2" in:fade|global={{ duration: 500 }}>
				<CategoryList {categories} on:selectCategory={handleSelectCategory} />
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
