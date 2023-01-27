<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { selectedCategory } from '../store/stores';

	const dispatch = createEventDispatcher<{ selectCategory: string }>();

	export let categories: string[] = [];

	const selectCategory = (category: string) => {
		dispatch('selectCategory', category);
	};

	const getButtonClasses = (category: string): string => {
		const btnClass = $selectedCategory === category ? 'btn-primary' : 'btn-secondary';
		return `btn ${btnClass}`;
	};
</script>

<div class="d-grid gap-2">
	{#each categories as c}
		<button class={getButtonClasses(c)} on:click={() => selectCategory(c)}>
			{c}
		</button>
	{/each}
</div>
