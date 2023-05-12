import type { PageLoad } from './$types';
import { products, selectedCategory, order } from '../../store/stores';
import type { Product } from '../../data/entities';
import { Order } from '../../data/entities';
import { mock_products } from '../../data/mockData';
import { dev } from '$app/environment';

export const load = (async () => {
	products.set(dev ? mock_products : ((await (await fetch('/api/products')).json()) as Product[]));
	order.set(new Order());
	selectedCategory.set('All');
}) satisfies PageLoad;
