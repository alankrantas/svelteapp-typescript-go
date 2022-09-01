<script lang="ts">
	import { order } from '../store/stores';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	$: count = $order.productCount || 0;
	$: displayText1 = count === 0 ? '(No Selection)' : `${count} product(s), `;
	$: displayText2 = count === 0 ? '' : `$${$order.total.toFixed(2)}`;
</script>

<div class="p-1 bg-secondary text-white text-end">
	{#key displayText1}
		<span style="display: inline-block" in:fade={{ duration: 500 }}>
			{displayText1}
		</span>
	{/key}
	{#key displayText2}
		<span style="display: inline-block" in:fly={{ y: -50, duration: 500, easing: quintOut }}>
			{displayText2}
		</span>
	{/key}
	<a href="/order" class="btn btn-sm btn-primary m-1"> Submit Order </a>
</div>
