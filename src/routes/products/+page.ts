import type { PageLoad } from './$types';
import { HttpHandler } from '../../data/httpHandler';
import { products, selectedCategory, order } from '../../store/stores';
import { Order } from '../../data/entities';

export const load = (async () => {
	products.set(await new HttpHandler().loadProducts());
	order.set(new Order());
	selectedCategory.set('All');
}) satisfies PageLoad;
