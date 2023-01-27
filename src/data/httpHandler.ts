import type { Product, Order } from './entities';
import Axios from 'axios';
import { dev } from '$app/environment';

const urls = {
	products: '/api/products',
	orders: '/api/orders'
};

export class HttpHandler {
	async loadProducts(): Promise<Product[]> {
		if (!dev) {
			const response = await Axios.get<Product[]>(urls.products);
			return response.data;
		} else {
			return mock_products;
		}
	}

	async storeOrder(order: Order): Promise<number> {
		if (!dev) {
			const orderData = {
				lines: [...order.orderLines.values()].map((ol) => ({
					productId: ol.product.id,
					productName: ol.product.name,
					quantity: ol.quantity
				}))
			};
			const response = await Axios.post<{ id: number }>(urls.orders, orderData);
			return response.data.id;
		} else {
			return 1;
		}
	}
}

const mock_products = [
	{
		id: 1,
		name: 'Product 1',
		category: 'Category 1',
		description: 'Product description 1',
		price: 10
	},
	{
		id: 2,
		name: 'Product 2',
		category: 'Category 1',
		description: 'Product description 2',
		price: 20
	},
	{
		id: 3,
		name: 'Product 3',
		category: 'Category 1',
		description: 'Product description 3',
		price: 30
	},
	{
		id: 4,
		name: 'Product 4',
		category: 'Category 2',
		description: 'Product description 4',
		price: 40
	},
	{
		id: 5,
		name: 'Product 5',
		category: 'Category 2',
		description: 'Product description 5',
		price: 50
	},
	{
		id: 6,
		name: 'Product 6',
		category: 'Category 3',
		description: 'Product description 6',
		price: 60
	},
	{
		id: 7,
		name: 'Product 7',
		category: 'Category 3',
		description: 'Product description 7',
		price: 70
	},
	{
		id: 8,
		name: 'Product 8',
		category: 'Category 3',
		description: 'Product description 8',
		price: 80
	},
	{
		id: 9,
		name: 'Product 9',
		category: 'Category 3',
		description: 'Product description 9',
		price: 90
	}
];
