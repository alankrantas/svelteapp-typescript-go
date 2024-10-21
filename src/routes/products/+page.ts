import type { PageLoad } from './$types';
import { loadProducts } from '../../data/services';

export const load: PageLoad = async () => {
	return {
		products: await loadProducts()
	};
};
