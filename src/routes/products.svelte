<script context="module" lang="ts">
	import { OrderLine, Order } from '../data/entities';
	import { HttpHandler } from '../data/httpHandler';
	import { products, selectedCategory, order } from '../store/stores';
	import type { LoadEvent, LoadOutput } from '@sveltejs/kit';

	/** @type {import('./__types/[slug]').Load} */
	export async function load(params: LoadEvent): Promise<LoadOutput<Record<string, any>>> {
		new HttpHandler().loadProducts().then((p) => {
			products.set(p);
		});

		selectedCategory.set('All');
		order.set(new Order());

		return {
			status: 200
		};
	}
</script>

<script lang="ts">
	import ProductItem from '../components/ProductItem.svelte';
	import CategoryList from '../components/CategoryList.svelte';
	import Header from '../components/Header.svelte';
	import { fade, slide } from 'svelte/transition';

	$: categories = ['All', ...new Set($products.map((p) => p.category))];
	$: filteredProducts = $products.filter(
		(p) => $selectedCategory === 'All' || $selectedCategory === p.category
	);

	const handleSelectCategory = (event: { detail: string }) => {
		$selectedCategory = event.detail;
		categories = categories;
	};

	const handelAddToCart = (event: { detail: OrderLine }) => {
		const product = event.detail.product;
		const quantity = event.detail.quantity;
		$order.addProduct(product, quantity);
		$order = $order;
	};
</script>

<div>
	<Header />
	<div class="container-fluid">
		<div class="row">
			<div class="col-3 p-2" in:fade={{ duration: 500 }}>
				<CategoryList {categories} on:selectCategory={handleSelectCategory} />
			</div>
			<div class="col-9 p-2">
				{#each filteredProducts as product}
					<div transition:slide|local={{ duration: 500 }}>
						<ProductItem {product} on:addToCart={handelAddToCart} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
