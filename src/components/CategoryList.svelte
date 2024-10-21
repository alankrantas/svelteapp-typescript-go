<script lang="ts">
	import type { SelectCategoryEvent } from '../data/entities';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ selectCategory: SelectCategoryEvent }>();

	interface Props {
		categories: string[];
		selectedCategory: string;
	}

	let { categories, selectedCategory }: Props = $props();

	const getButtonClasses = (category: string): string => {
		const btnClass = selectedCategory === category ? 'btn-primary' : 'btn-secondary';
		return `btn ${btnClass}`;
	};

	const handleSelectedCategory = (category: string) => {
		dispatch('selectCategory', { category: category });
	};
</script>

<div class="d-grid gap-2">
	{#each categories as category}
		<button class={getButtonClasses(category)} onclick={() => handleSelectedCategory(category)}>
			{category}
		</button>
	{/each}
</div>
