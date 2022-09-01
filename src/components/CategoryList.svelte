<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ selectCategory: string }>();

	export let categories: string[] = [];
	let selected: string = 'All';

	const selectCategory = (category: string) => {
		selected = category;
		dispatch('selectCategory', selected);
	};

	const getButtonClasses = (category: string): string => {
		const btnClass = selected === category ? 'btn-primary' : 'btn-secondary';
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
