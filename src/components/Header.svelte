<script lang="ts">
	import { getOrderStore } from '../store/stores.svelte';

	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	const order = getOrderStore();

	const displayText1 = $derived(
		order.value && order.value.productCount != 0
			? `${order.value.productCount} product(s), `
			: '(No Selection)'
	);
	const displayText2 = $derived(
		order.value && order.value.productCount != 0 ? `$${order.value.total.toFixed(2)}` : ''
	);
</script>

<div class="p-1 bg-secondary text-white text-end">
	<span style="display: inline-block" in:fade|global={{ duration: 500 }}>
		{displayText1}
	</span>
	<span style="display: inline-block" in:fly|global={{ y: -50, duration: 500, easing: quintOut }}>
		{displayText2}
	</span>
	<!-- redirect to /order -->
	<a href="/order" class="btn btn-sm btn-primary m-1"> Submit Order </a>
</div>
