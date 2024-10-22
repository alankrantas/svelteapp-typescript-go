import { type Product, Order } from '../data/entities';

const getProductsStore = () => {
	let _products: Product[] = $state([]);

	return {
		get value() {
			return _products;
		},
		set value(newProducts: Product[]) {
			_products = newProducts;
		}
	};
};

const getOrderStore = () => {
	let _order = $state(new Order());

	return {
		get value() {
			return _order;
		},
		set value(newOrder: Order) {
			_order = newOrder;
		}
	};
};

export const products = getProductsStore();
export const order = getOrderStore();
