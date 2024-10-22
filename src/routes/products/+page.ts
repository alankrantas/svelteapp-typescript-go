import type { PageLoad } from './$types';
import { loadProducts } from '../../data/services';

export const load: PageLoad = async () => {
	return {
		products: await loadProducts() // load product data from backend service before mounting Product component
	};
};
