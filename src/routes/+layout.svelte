<script lang="ts">
  import "bootstrap/dist/css/bootstrap.min.css";
  import "@fontsource/open-sans/400.css";

  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();
</script>

<svelte:head>
  <title>Sports Store Demo App</title>
</svelte:head>

<svelte:boundary>
  {@render children?.()}

  {#snippet failed(error: any, reset)}
    <h1>Svelte app rendering error</h1>
    <h4>{error?.message}</h4>
  {/snippet}
</svelte:boundary>

<style>
  :global(body) {
    font-family: "Open Sans", sans-serif;
  }
</style>
