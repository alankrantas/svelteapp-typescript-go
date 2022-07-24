import type { Product, Order } from './entities';
import Axios from 'axios';

const urls = {
	products: "/api/products",
	orders: "/api/orders"
};

export class HttpHandler {
	async loadProducts(): Promise<Product[]> {
		const response = await Axios.get<Product[]>(urls.products);
		return response.data;
	}

	async storeOrder(order: Order): Promise<number> {
		const orderData = {
			lines: [...order.orderLines.values()].map((ol) => ({
				productId: ol.product.id,
				productName: ol.product.name,
				quantity: ol.quantity
			}))
		};
		const response = await Axios.post<{ id: number; }>(urls.orders, orderData);
		return response.data.id;
	}
}
