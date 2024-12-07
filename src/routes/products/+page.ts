import type { PageLoad } from './$types';
import { loadProducts } from '$lib/api/services';

export const load: PageLoad = async () => {
    // load product data from backend service before mounting Product component
    return {
        products: await loadProducts()
    };
};
