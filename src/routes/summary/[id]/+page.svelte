<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';

	let ready = false;
	onMount(() => (ready = true));
	
	let id: string = $page.params.id;
</script>

{#if ready}
	<div class="m-2 text-center" in:fly={{ y: 100, duration: 4000, easing: elasticOut }}>
		<h2>Thanks!</h2>
		<p>Thanks for placing your order.</p>
		<p>Your order is #{id}</p>
		<p>We'll ship your goods as soon as possible.</p>
		<a href="/products" class="btn btn-primary">OK</a>
	</div>
{/if}
