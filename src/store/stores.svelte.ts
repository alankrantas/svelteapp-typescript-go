import { type Product, Order } from '../data/entities';

let products: Product[] = $state([]);
let order: Order | null = $state(null);

export const getProductsStore = () => {
	return {
		get value() {
			return products;
		},
		set value(newProducts: Product[]) {
			products = newProducts;
		},
		set(newProducts: Product[]) {
			products = newProducts;
		}
	};
};

export const getOrderStore = () => {
	return {
		get value(): Order | null {
			return order;
		},
		set value(newOrder: Order) {
			order = newOrder;
		},
		init() {
			if (!order) order = new Order();
		}
	};
};
