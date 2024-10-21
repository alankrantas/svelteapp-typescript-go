import { type Product, Order } from '../data/entities';

let products: Product[] = $state([]);
let order: Order | null = $state(null);

export const getProductsStore = (newProducts?: Product[]) => {
	if (newProducts) products = newProducts;

	return {
		get value() {
			return products;
		},
		set value(newProducts: Product[]) {
			products = newProducts;
		}
	};
};

export const getOrderStore = () => {
	if (!order) order = new Order();

	return {
		get value(): Order | null {
			return order;
		},
		set value(newOrder: Order) {
			order = newOrder;
		}
	};
};
