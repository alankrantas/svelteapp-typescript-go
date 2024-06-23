import type { Product, OrderData, Order, Result } from './entities';

import { dev } from '$app/environment';
import mock_products from './mockData.json';

const api = {
	loadProductsPath: '/api/products',
	storeOrderPath: '/api/orders'
};

export const loadProducts = async (): Promise<Product[]> => {
	return dev ? mock_products : await (await fetch(api.loadProductsPath)).json();
};

export const storeOrder = async (order: Order): Promise<Result> => {
	if (dev) return { id: 42 };
	const orderData: OrderData = {
		lines: [...order.orderLines.values()].map((ol) => ({
			productId: ol.product.id,
			productName: ol.product.name,
			quantity: ol.quantity
		}))
	};
	const result: Result = await (
		await fetch(api.storeOrderPath, {
			method: 'POST',
			headers: {
				'content-type': 'application/json; charset=UTF-8'
			},
			body: JSON.stringify(orderData)
		})
	).json();
	return result;
};
