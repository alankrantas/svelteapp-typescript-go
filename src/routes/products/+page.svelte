<script lang="ts">
  import { fade, slide } from "svelte/transition";

  import ProductItem from "$lib/components/ProductItem.svelte";
  import CategoryList from "$lib/components/CategoryList.svelte";
  import Header from "$lib/components/Header.svelte";
  
  import { type PageData } from "./$types";
  import { Order, type OrderLine } from "$lib/type/entities";
  import { orderLines } from "$lib/store/globalStates.svelte";

  let { data }: { data: PageData } = $props();

  let products = $state(data.products); // load product data returned by page.ts
  let selectedCategory = $state("All");

  let categories = $derived([
    "All",
    ...new Set(products.map((p) => p.category)),
  ]);
  let filteredProducts = $derived(
    products.filter(
      (p) => selectedCategory === "All" || selectedCategory === p.category
    )
  );

  const handleSelectCategory = (category: string) => {
    selectedCategory = category;
  };

  const handleAddToCart = (orderLine: OrderLine) => {
    const order = new Order(orderLines.current);
    order.addProduct(orderLine.product, orderLine.quantity);
    orderLines.current = order.orderLines;
  };
</script>

<div>
  <Header />
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 p-2" in:fade|global={{ duration: 500 }}>
        <CategoryList {categories} {selectedCategory} {handleSelectCategory} />
      </div>
      <div class="col-9 p-2">
        {#each filteredProducts as product}
          <div transition:slide={{ duration: 500 }}>
            <ProductItem {product} {handleAddToCart} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
