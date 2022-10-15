import type { PageLoad } from './$types';
import { HttpHandler } from '../../data/httpHandler';
import { products } from '../../store/stores';

export const load: PageLoad = async () => {
	products.set(await new HttpHandler().loadProducts());
};
