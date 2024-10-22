<script lang="ts">
	import { type Order } from '../data/entities';

	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let { order }: { order: Order } = $props();

	const displayText1 = $derived(
		order.productCount != 0 ? `${order.productCount} product(s), ` : '(No Selection)'
	);
	const displayText2 = $derived(order.productCount != 0 ? `$${order.total.toFixed(2)}` : '');
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
