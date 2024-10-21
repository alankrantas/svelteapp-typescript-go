<script lang="ts">
	import ProductItem from '../../components/ProductItem.svelte';
	import CategoryList from '../../components/CategoryList.svelte';
	import Header from '../../components/Header.svelte';

	import { fade, slide } from 'svelte/transition';

	import type { PageData } from './$types';
	import type { SelectCategoryEvent } from '../../data/entities';
	import { getProductsStore, getOrderStore } from '../../store/stores.svelte';

	let { data }: { data: PageData } = $props();

	const products = getProductsStore();
	products.set(data.products);
	const order = getOrderStore();
	order.init();

	let selectedCategory = $state('All');
	let categories = $derived(['All', ...new Set(products.value.map((p) => p.category))]);
	let filteredProducts = $derived(
		products.value.filter((p) => selectedCategory === 'All' || selectedCategory === p.category)
	);

	const handelSelectCategory = (event: CustomEvent<SelectCategoryEvent>) => {
		selectedCategory = event.detail.category;
	};
</script>

<div>
	<Header />
	<div class="container-fluid">
		<div class="row">
			<div class="col-3 p-2" in:fade|global={{ duration: 500 }}>
				<CategoryList {categories} {selectedCategory} on:selectCategory={handelSelectCategory} />
			</div>
			<div class="col-9 p-2">
				{#each filteredProducts as product}
					<div transition:slide={{ duration: 500 }}>
						<ProductItem {product} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
