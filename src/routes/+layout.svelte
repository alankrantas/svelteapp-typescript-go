<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import '@fontsource/open-sans/400.css';
</script>

<svelte:head>
	<title>Sports Store Demo App</title>
</svelte:head>

<slot />

<style>
	:global(body) {
		font-family: 'Open Sans', sans-serif;
	}
</style>
