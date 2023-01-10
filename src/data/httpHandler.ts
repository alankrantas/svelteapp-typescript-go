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
		name: 'Kayak (dev mode)',
		category: 'Watersports',
		description: 'A boat for one person',
		price: 275
	},
	{
		id: 2,
		name: 'Lifejacket (dev mode)',
		category: 'Watersports',
		description: 'Protective and fashionable',
		price: 48.95
	},
	{
		id: 3,
		name: 'Soccer Ball (dev mode)',
		category: 'Soccer',
		description: 'FIFA-approved size and weight',
		price: 19.5
	},
	{
		id: 4,
		name: 'Corner Flags (dev mode)',
		category: 'Soccer',
		description: 'Give your playing field a professional touch',
		price: 34.95
	},
	{
		id: 5,
		name: 'Stadium (dev mode)',
		category: 'Soccer',
		description: 'Flat-packed 35,000-seat stadium',
		price: 79500
	},
	{
		id: 6,
		name: 'Thinking Cap (dev mode)',
		category: 'Chess',
		description: 'Improve brain efficiency by 75%',
		price: 16
	},
	{
		id: 7,
		name: 'Unsteady Chair (dev mode)',
		category: 'Chess',
		description: 'Secretly give your opponent a disadvantage',
		price: 29.95
	},
	{
		id: 8,
		name: 'Human Chess Board (dev mode)',
		category: 'Chess',
		description: 'A fun game for the family',
		price: 75
	},
	{
		id: 9,
		name: 'Bling Bling King (dev mode)',
		category: 'Chess',
		description: 'Gold-plated, diamond-studded King',
		price: 1200
	}
];
