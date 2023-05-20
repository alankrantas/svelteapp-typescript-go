import type { PageLoad } from './$types';

import { products, selectedCategory, order } from '../../store/stores';
import { Order } from '../../data/entities';
import { loadProducts } from '../../data/services';

export const load = (async () => {
	products.set(await loadProducts());
	order.set(new Order());
	selectedCategory.set('All');
}) satisfies PageLoad;
