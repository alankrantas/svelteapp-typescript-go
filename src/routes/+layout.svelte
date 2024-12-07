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

{@render children?.()}

<style>
  :global(body) {
    font-family: "Open Sans", sans-serif;
  }
</style>
