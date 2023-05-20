import type { Product, Order } from './entities';

import { dev } from '$app/environment';
import mock_products from './mockData.json';

const api = {
	loadProductsPath: '/api/products',
	storeOrderPath: '/api/orders'
};

export const loadProducts = async (): Promise<Product[]> => {
	return dev ? mock_products : await (await fetch(api.loadProductsPath)).json();
};

export const storeOrder = async (order: Order): Promise<number> => {
	if (dev) return 42;
	const orderData = {
		lines: [...order.orderLines.values()].map((ol) => ({
			productId: ol.product.id,
			productName: ol.product.name,
			quantity: ol.quantity
		}))
	};
	const response: { id: number } = await (
		await fetch(api.storeOrderPath, {
			method: 'POST',
			headers: {
				'content-type': 'application/json;charset=UTF-8'
			},
			body: JSON.stringify(orderData)
		})
	).json();
	return response.id;
};
