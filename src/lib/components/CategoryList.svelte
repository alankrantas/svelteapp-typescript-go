<script lang="ts">
  interface Props {
    categories: string[];
    selectedCategory: string;
    handleSelectCategory: (category: string) => void;
  }

  let { categories, selectedCategory, handleSelectCategory }: Props = $props();

  const getButtonClasses = (category: string): string => {
    const btnClass =
      selectedCategory === category ? "btn-primary" : "btn-secondary";
    return `btn ${btnClass}`;
  };
</script>

<div class="d-grid gap-2">
  {#each categories as category}
    <button
      class={getButtonClasses(category)}
      onclick={(event: MouseEvent) => {
        event.preventDefault();
        handleSelectCategory(category);
      }}
    >
      {category}
    </button>
  {/each}
</div>
